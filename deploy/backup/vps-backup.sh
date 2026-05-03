#!/usr/bin/env bash
# VPS backup → Yandex.Disk (WebDAV)
# Кладёт tar.gz с /var/www + /etc/nginx + /etc/letsencrypt на Я.Диск,
# удаляет архивы старше RETENTION_DAYS.

set -euo pipefail

# --- конфиг -------------------------------------------------------------------
CREDS_FILE="/root/.yandex-webdav"          # формат: LOGIN:APP_PASSWORD (одна строка)
REMOTE_DIR="www-backup"                    # папка на Я.Диске (создастся автоматом)
RETENTION_DAYS=30
LOCAL_TMP="/var/backups/vps"
HOST="$(hostname -s)"
STAMP="$(date +%Y-%m-%d_%H-%M)"
ARCHIVE="${LOCAL_TMP}/${HOST}_${STAMP}.tar.gz"
LOG="/var/log/vps-backup.log"

WEBDAV="https://webdav.yandex.ru"

# что бэкапим
SOURCES=(
  /var/www
  /etc/nginx
  /etc/letsencrypt
)

# --- подготовка ---------------------------------------------------------------
mkdir -p "$LOCAL_TMP"
exec >>"$LOG" 2>&1
echo "===== $(date -Is) start ====="

if [[ ! -r "$CREDS_FILE" ]]; then
  echo "ERROR: $CREDS_FILE not found or unreadable" >&2
  exit 1
fi
CREDS="$(tr -d '\r\n' < "$CREDS_FILE")"

curl_dav() {
  curl -sS --fail-with-body -u "$CREDS" "$@"
}

# --- архив --------------------------------------------------------------------
echo "[+] creating archive: $ARCHIVE"
tar --warning=no-file-changed -czf "$ARCHIVE" "${SOURCES[@]}" || {
  rc=$?
  # tar возвращает 1 если файл изменился во время чтения — это ок
  if [[ $rc -ne 1 ]]; then
    echo "ERROR: tar failed with code $rc" >&2
    exit $rc
  fi
}
SIZE="$(du -h "$ARCHIVE" | cut -f1)"
echo "[+] archive size: $SIZE"

# --- mkdir на Я.Диске (идемпотентно) -----------------------------------------
echo "[+] ensure remote dir: /$REMOTE_DIR"
curl_dav -X MKCOL "$WEBDAV/$REMOTE_DIR/" -o /dev/null -w "%{http_code}\n" || true
# 201 (создано) и 405 (уже есть) — оба ок

# --- upload -------------------------------------------------------------------
REMOTE_NAME="$(basename "$ARCHIVE")"
echo "[+] uploading -> $WEBDAV/$REMOTE_DIR/$REMOTE_NAME"
curl_dav -T "$ARCHIVE" "$WEBDAV/$REMOTE_DIR/$REMOTE_NAME"
echo "[+] upload ok"

# --- ротация на Я.Диске -------------------------------------------------------
echo "[+] cleaning up remote files older than $RETENTION_DAYS days"
LIST_XML="$(curl_dav -X PROPFIND -H "Depth: 1" "$WEBDAV/$REMOTE_DIR/")"

# вытащим имена файлов и даты модификации из PROPFIND-ответа
python3 - "$LIST_XML" "$RETENTION_DAYS" "$WEBDAV" "$REMOTE_DIR" <<'PY' | while read -r url; do
import sys, re, datetime, xml.etree.ElementTree as ET
xml_text, retention, webdav, remote_dir = sys.argv[1], int(sys.argv[2]), sys.argv[3], sys.argv[4]
ns = {'d': 'DAV:'}
root = ET.fromstring(xml_text)
cutoff = datetime.datetime.utcnow() - datetime.timedelta(days=retention)
for resp in root.findall('d:response', ns):
    href = resp.find('d:href', ns).text or ''
    # пропускаем саму папку
    if href.rstrip('/').endswith(remote_dir):
        continue
    lm_el = resp.find('.//d:getlastmodified', ns)
    if lm_el is None or not lm_el.text:
        continue
    try:
        lm = datetime.datetime.strptime(lm_el.text, '%a, %d %b %Y %H:%M:%S %Z')
    except ValueError:
        continue
    if lm < cutoff:
        # href относительный, начинается с /
        print(f"{webdav}{href}")
PY
  echo "    delete: $url"
  curl_dav -X DELETE "$url" -o /dev/null -w "    http=%{http_code}\n" || true
done

# --- локальная чистка ---------------------------------------------------------
echo "[+] removing local archive"
rm -f "$ARCHIVE"
# на всякий — чистим старые локальные если что-то осталось
find "$LOCAL_TMP" -type f -name '*.tar.gz' -mtime +1 -delete

echo "===== $(date -Is) done ====="
