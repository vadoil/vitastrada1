# Деплой novastrada.ru на VPS 159.194.222.73

DNS уже стоит — отлично. Дальше по шагам. Все блоки можно копировать целиком.

---

## Шаг 0. Проверь, что DNS долетел

С локальной машины:
```bash
dig +short novastrada.ru
dig +short www.novastrada.ru
```
Должно вернуть `159.194.222.73`. Если ещё нет — подожди 5–30 минут, не начинай дальше.

---

## Шаг 1. Зайди на сервер

```bash
ssh root@159.194.222.73
```

### 1.1. Сверь флаги listen 443 у соседних сайтов — КРИТИЧНО

```bash
grep -RE "listen 443" /etc/nginx/sites-enabled/
```

Посмотри что вернёт:
- Если **везде** `listen 443 ssl http2;` → ничего не меняем, конфиг из репо подходит как есть.
- Если у соседей `listen 443 ssl;` (без `http2`) → перед копированием конфига убери `http2` из `deploy/nginx/novastrada-frontend.conf` (строки 9-10), иначе соседи отвалятся с `ERR_SSL_VERSION_OR_CIPHER_MISMATCH`.

Скажи мне результат `grep` — если надо поправить, я переделаю файл в репо.

### 1.2. Проверь что домен ещё не используется

```bash
grep -RIl "novastrada" /etc/nginx/sites-enabled/ || echo "чисто"
```
Должно быть `чисто`. Если что-то нашлось — присылай вывод, разберёмся.

---

## Шаг 2. Папка под сайт

На сервере, под root:
```bash
mkdir -p /var/www/novastrada/dist
chown -R www-data:www-data /var/www/novastrada
```

---

## Шаг 3. SSH-ключ для GitHub Actions

Тоже на сервере:
```bash
ssh-keygen -t ed25519 -f ~/.ssh/novastrada_deploy -N ""
cat ~/.ssh/novastrada_deploy.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
cat ~/.ssh/novastrada_deploy
```

Последняя команда выведет приватный ключ — скопируй его **целиком** (вместе со строками `-----BEGIN OPENSSH PRIVATE KEY-----` и `-----END OPENSSH PRIVATE KEY-----`). Понадобится в шаге 4.

---

## Шаг 4. GitHub Secrets

Открой https://github.com/vadoil/vitastrada1/settings/secrets/actions
и добавь три секрета (`New repository secret`):

| Name | Value |
|---|---|
| `SSH_HOST` | `159.194.222.73` |
| `SSH_USER` | `root` |
| `SSH_KEY`  | приватный ключ из шага 3 (целиком) |

---

## Шаг 5. Залей nginx-конфиг

С локальной машины (там, где склонирован репо `vitastrada1`):
```bash
scp deploy/nginx/novastrada-frontend.conf \
    root@159.194.222.73:/etc/nginx/sites-available/novastrada-frontend.conf
```

Обратно на сервер:
```bash
ln -sf /etc/nginx/sites-available/novastrada-frontend.conf /etc/nginx/sites-enabled/
nginx -t
```

Если `nginx -t` ругается «protocol options redefined» или «conflicting server name» — **не делай reload**, пришли вывод.

Если всё ок:
```bash
systemctl reload nginx
```

---

## Шаг 6. SSL через certbot

На сервере:
```bash
certbot --nginx -d novastrada.ru -d www.novastrada.ru
nginx -t
```

В диалоге certbot — обычно выбираем `2` (redirect HTTP → HTTPS), но у нас редирект уже в конфиге, так что можно `1` (no redirect), оба варианта рабочие.

После — **обязательно** проверь, что соседние сайты не отвалились:
```bash
curl -I https://<один-из-соседних-доменов>.ru
```
Должно отвечать `200` или `301`, **не** ошибка SSL.

---

## Шаг 7. Первый деплой

Я уже подготовил GitHub Actions workflow (`.github/workflows/deploy.yml`).
Триггерится на push в `main`. Запусти руками первый раз:

https://github.com/vadoil/vitastrada1/actions → `Deploy to VPS` → `Run workflow` → ветка `main` → `Run workflow`.

Через ~2 минуты должно стать зелёным. Если красным — присылай лог, разберёмся (обычно это `SSH_KEY` неправильно вставлен, либо файл оборван).

---

## Шаг 8. Проверка

Открой https://novastrada.ru — должен быть сайт.
Жёсткий refresh (Ctrl+F5), проверь что роуты работают (например `/` → переход куда-нибудь → F5 → не 404).

---

## Если что-то сломалось

Опиши, на каком шаге, и приложи вывод команды (особенно `nginx -t` и `grep listen 443`). Дальше точечно починим — конфиг в репо, поправить недолго.
