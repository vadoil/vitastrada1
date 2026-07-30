import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3";

const BodySchema = z.object({
  name: z.string().trim().min(1).max(100),
  brand: z.string().trim().max(120).optional().default(""),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().default(""),
  volume: z.string().trim().max(40).optional().default(""),
  message: z.string().trim().max(2000).optional().default(""),
  source: z.string().trim().max(40).optional().default("site"),
});

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.flatten().fieldErrors }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const token = Deno.env.get("TELEGRAM_BOT_TOKEN");
    const chatId = Deno.env.get("TELEGRAM_CHAT_ID");
    if (!token || !chatId) {
      console.error("Telegram env not configured", { hasToken: !!token, hasChat: !!chatId });
      return new Response(JSON.stringify({ error: "telegram_not_configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const d = parsed.data;
    const title =
      d.source === "designer" ? "🎓 Заявка молодого дизайнера" : "🧵 Новая заявка с сайта";

    const lines = [
      `<b>${title}</b>`,
      "",
      `<b>Имя:</b> ${esc(d.name)}`,
      d.brand ? `<b>Бренд:</b> ${esc(d.brand)}` : "",
      `<b>E-mail:</b> ${esc(d.email)}`,
      d.phone ? `<b>Телефон:</b> ${esc(d.phone)}` : "",
      d.volume ? `<b>Объём:</b> ${esc(d.volume)}` : "",
      d.message ? `\n<b>Сообщение:</b>\n${esc(d.message)}` : "",
    ].filter(Boolean);

    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.join("\n"),
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    const result = await tg.json();
    if (!tg.ok || result?.ok === false) {
      console.error(`Telegram sendMessage failed [${tg.status}]:`, JSON.stringify(result));
      return new Response(
        JSON.stringify({ error: "telegram_failed", details: result }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("notify-lead error:", e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
