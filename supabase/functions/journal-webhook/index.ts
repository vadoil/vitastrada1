import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN")!;
const API = `https://api.telegram.org/bot${TOKEN}`;
const TEN_YEARS = 60 * 60 * 24 * 365 * 10;

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

async function send(chatId: number | string, text: string) {
  await fetch(`${API}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  });
}

async function download(fileId: string): Promise<{ bytes: ArrayBuffer; ext: string }> {
  const r = await fetch(`${API}/getFile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ file_id: fileId }),
  });
  const j = await r.json();
  if (!j.ok) throw new Error(`getFile failed: ${JSON.stringify(j)}`);
  const path: string = j.result.file_path;
  const ext = path.includes(".") ? path.split(".").pop()! : "bin";
  const f = await fetch(`https://api.telegram.org/file/bot${TOKEN}/${path}`);
  if (!f.ok) throw new Error(`file download failed: ${f.status}`);
  return { bytes: await f.arrayBuffer(), ext };
}

async function upload(prefix: string, bytes: ArrayBuffer, ext: string, contentType: string) {
  const key = `${prefix}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("journal").upload(key, bytes, {
    contentType,
    upsert: false,
  });
  if (error) throw new Error(error.message);
  const { data, error: sErr } = await supabase.storage
    .from("journal")
    .createSignedUrl(key, TEN_YEARS);
  if (sErr) throw new Error(sErr.message);
  return data.signedUrl;
}

function fmtDuration(sec?: number) {
  if (!sec) return null;
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

Deno.serve(async (req) => {
  const url = new URL(req.url);

  // One-time setup: register webhook with Telegram
  if (url.searchParams.get("setup") === "1") {
    const hook = `https://${url.host}${url.pathname}`;
    const r = await fetch(`${API}/setWebhook`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: hook, allowed_updates: ["message", "channel_post"] }),
    });
    return new Response(await r.text(), { headers: { "Content-Type": "application/json" } });
  }

  if (req.method !== "POST") return new Response("ok");

  try {
    const update = await req.json();
    const msg = update.message ?? update.channel_post ?? update.edited_message;
    if (!msg) return new Response(JSON.stringify({ ok: true }));
    const chatId = msg.chat?.id;

    const video = msg.video ?? msg.animation ??
      (msg.document?.mime_type?.startsWith("video/") ? msg.document : null);
    const photo = Array.isArray(msg.photo) ? msg.photo[msg.photo.length - 1] : null;
    const caption: string | null = (msg.caption ?? "").trim() || null;

    if (video) {
      const { bytes, ext } = await download(video.file_id);
      const videoUrl = await upload("videos", bytes, ext === "bin" ? "mp4" : ext, "video/mp4");

      let coverUrl: string | null = null;
      const thumb = video.thumbnail ?? video.thumb;
      if (thumb?.file_id) {
        try {
          const t = await download(thumb.file_id);
          coverUrl = await upload("covers", t.bytes, "jpg", "image/jpeg");
        } catch (_) { /* ignore */ }
      }

      const { count } = await supabase
        .from("journal_media")
        .select("id", { count: "exact", head: true });

      const { error } = await supabase.from("journal_media").insert({
        title: caption ?? "Из цеха",
        chapter: `Эпизод ${String((count ?? 0) + 1).padStart(2, "0")}`,
        duration: fmtDuration(video.duration),
        video_url: videoUrl,
        cover_url: coverUrl,
      });
      if (error) throw new Error(error.message);

      await send(
        chatId,
        "✅ Видео добавлено в «Журнал производства».\nОтправь следующим сообщением фото — оно станет обложкой этого видео.",
      );
      return new Response(JSON.stringify({ ok: true }));
    }

    if (photo) {
      const { data: rows } = await supabase
        .from("journal_media")
        .select("id")
        .order("created_at", { ascending: false })
        .limit(1);
      if (!rows?.length) {
        await send(chatId, "Сначала пришли видео, потом обложку.");
        return new Response(JSON.stringify({ ok: true }));
      }
      const { bytes } = await download(photo.file_id);
      const coverUrl = await upload("covers", bytes, "jpg", "image/jpeg");
      const patch: Record<string, unknown> = { cover_url: coverUrl };
      if (caption) patch.title = caption;
      const { error } = await supabase
        .from("journal_media")
        .update(patch)
        .eq("id", rows[0].id);
      if (error) throw new Error(error.message);
      await send(chatId, "🖼 Обложка обновлена для последнего видео.");
      return new Response(JSON.stringify({ ok: true }));
    }

    if (msg.text && chatId) {
      const t = msg.text.trim().toLowerCase();
      if (t.startsWith("/start") || t.startsWith("/help") || t === "привет") {
        await send(
          chatId,
          "Пришли <b>видео</b> с производства — оно появится в разделе «Журнал производства» на сайте. Подпись к видео станет заголовком. Следующим сообщением можно прислать <b>фото-обложку</b>.",
        );
      }
    }

    return new Response(JSON.stringify({ ok: true }));
  } catch (e) {
    console.error("journal-webhook error:", e);
    return new Response(JSON.stringify({ error: String(e) }), { status: 200 });
  }
});
