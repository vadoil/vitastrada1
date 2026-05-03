# Деплой novastrada.ru на VPS 159.194.222.73

Сайт собирается GitHub Actions и заливается по SSH в `/var/www/novastrada/dist`.
Nginx отдаёт SPA с SSL от Let's Encrypt.

---

## 1. DNS (у регистратора novastrada.ru)

| Тип | Имя | Значение |
|---|---|---|
| A | @   | 159.194.222.73 |
| A | www | 159.194.222.73 |

Проверка: `dig +short novastrada.ru` → должен вернуть `159.194.222.73`.

---

## 2. Подготовка на сервере (один раз, под root)

```bash
ssh root@159.194.222.73

# папка под сайт
mkdir -p /var/www/novastrada/dist
chown -R www-data:www-data /var/www/novastrada

# проверим, какие флаги listen 443 у соседей — должны совпадать!
grep -RE "listen 443" /etc/nginx/sites-enabled/
```

Если у соседей `listen 443 ssl http2;` — оставляем конфиг как есть.
Если просто `listen 443 ssl;` — убери `http2` из `deploy/nginx/novastrada-frontend.conf`,
иначе соседние сайты сломаются (`ERR_SSL_VERSION_OR_CIPHER_MISMATCH`).

---

## 3. Деплой-юзер и SSH-ключ для GitHub Actions

На сервере:
```bash
# сгенерим ключ для CI (без пароля)
ssh-keygen -t ed25519 -f ~/.ssh/novastrada_deploy -N ""

# разрешим вход этим ключом
cat ~/.ssh/novastrada_deploy.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# приватный ключ — целиком скопировать (он пойдёт в GitHub Secret SSH_KEY)
cat ~/.ssh/novastrada_deploy
```

В GitHub репо `vadoil/vitastrada1` → **Settings → Secrets and variables → Actions → New repository secret**:

| Имя | Значение |
|---|---|
| `SSH_HOST` | `159.194.222.73` |
| `SSH_USER` | `root` |
| `SSH_KEY`  | приватный ключ целиком (включая `-----BEGIN/END OPENSSH PRIVATE KEY-----`) |

---

## 4. Nginx-конфиг

Скопируй файл из репо на сервер:
```bash
scp deploy/nginx/novastrada-frontend.conf \
    root@159.194.222.73:/etc/nginx/sites-available/novastrada-frontend.conf

# на сервере:
ln -sf /etc/nginx/sites-available/novastrada-frontend.conf /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

---

## 5. SSL через certbot

```bash
certbot --nginx -d novastrada.ru -d www.novastrada.ru
nginx -t
```

Проверь, что **нет** warning'а `protocol options redefined` — иначе соседи сломаются
(см. раздел 6 в `HOWTO.md`, фикс `sed`-ом).

---

## 6. Первый деплой

В GitHub Actions:
- либо запушь в `main` —
- либо вручную: **Actions → Deploy to VPS → Run workflow**.

После успешного билда дист попадёт в `/var/www/novastrada/dist` и сайт будет жить
на https://novastrada.ru.

---

## 7. Проверка соседних сайтов

```bash
curl -I https://<соседний-домен>.ru
ss -tlnp | grep -E ':80|:443'
grep -RIE "server_name" /etc/nginx/sites-enabled/
```

Если соседи отвечают 200/301 и в `nginx -t` нет warning'ов — всё ок.
