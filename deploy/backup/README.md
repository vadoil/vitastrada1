# Бэкап VPS на Яндекс.Диск (WebDAV)

Бэкапит `/var/www` + `/etc/nginx` + `/etc/letsencrypt` в один `tar.gz`,
заливает на Я.Диск в папку `www-backup/`, удаляет архивы старше 30 дней.
Запускается systemd-таймером раз в сутки в 04:00 (с рандомным джиттером 15 мин).

---

## Установка (один раз, под root на VPS)

### 1. Пакеты
```bash
apt update && apt install -y curl python3
```

### 2. Креды Я.Диска
```bash
cat > /root/.yandex-webdav <<'EOF'
vadoil76@gmail.com:smwtcbsrycqkppir
EOF
chmod 600 /root/.yandex-webdav
```

Формат: `LOGIN:APP_PASSWORD` одной строкой.
Это **пароль приложения WebDAV**, не основной пароль Яндекса.

### 3. Скопируй файлы из репо на сервер

С локальной машины (где склонирован репо):
```bash
scp deploy/backup/vps-backup.sh root@159.194.222.73:/usr/local/bin/vps-backup.sh
scp deploy/backup/vps-backup.service root@159.194.222.73:/etc/systemd/system/
scp deploy/backup/vps-backup.timer   root@159.194.222.73:/etc/systemd/system/
```

На сервере:
```bash
chmod +x /usr/local/bin/vps-backup.sh
systemctl daemon-reload
systemctl enable --now vps-backup.timer
```

### 4. Прогон вручную (проверка)
```bash
systemctl start vps-backup.service
journalctl -u vps-backup.service -n 50 --no-pager
tail -n 50 /var/log/vps-backup.log
```

В выводе должны быть строки `upload ok` и `done`. Зайди на disk.yandex.ru →
папка `www-backup/` → должен лежать `lcgzjfofbw_<дата>.tar.gz`.

---

## Управление

```bash
# когда следующий запуск
systemctl list-timers vps-backup.timer

# логи последнего прогона
journalctl -u vps-backup.service -n 100 --no-pager

# полный лог
tail -f /var/log/vps-backup.log

# прогон сейчас
systemctl start vps-backup.service

# выключить таймер
systemctl disable --now vps-backup.timer
```

---

## Восстановление

Скачай архив с Я.Диска и распакуй:
```bash
mkdir -p /tmp/restore && cd /tmp/restore
tar -xzf <архив>.tar.gz
# дальше копируешь нужные пути обратно, например:
# cp -a var/www/novastrada /var/www/
# cp -a etc/nginx/sites-available/novastrada-frontend.conf /etc/nginx/sites-available/
```

---

## Настройки в скрипте `vps-backup.sh`

| Переменная | По умолчанию | Что меняет |
|---|---|---|
| `REMOTE_DIR` | `www-backup` | папка на Я.Диске |
| `RETENTION_DAYS` | `30` | сколько дней хранить |
| `SOURCES` | `/var/www /etc/nginx /etc/letsencrypt` | что бэкапить |

Поменял — пересохрани скрипт на сервере (`scp` ещё раз).

---

## Безопасность

- `/root/.yandex-webdav` — права `600`, доступен только root.
- Пароль приложения можно отозвать на https://id.yandex.ru/security/app-passwords — старые архивы при этом останутся, но новые перестанут заливаться, пока не обновишь файл.
- Архив не шифруется. Если бэкап критичен — можно добавить `gpg --symmetric` после `tar`.
