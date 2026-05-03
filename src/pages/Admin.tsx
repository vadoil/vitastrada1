import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Session } from "@supabase/supabase-js";

type Lead = {
  id: string;
  name: string;
  brand: string | null;
  email: string;
  phone: string | null;
  volume: string | null;
  message: string | null;
  created_at: string;
};

const Admin = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const navigate = useNavigate();

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) {
      setIsAdmin(null);
      return;
    }
    (async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (error) {
        setIsAdmin(false);
        return;
      }
      setIsAdmin(!!data);
    })();
  }, [session]);

  useEffect(() => {
    if (!isAdmin) return;
    setLoading(true);
    supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        setLoading(false);
        if (error) {
          toast.error("Не удалось загрузить заявки");
          return;
        }
        setLeads((data as Lead[]) ?? []);
      });
  }, [isAdmin]);

  const submitAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      if (error) return toast.error(error.message);
      toast.success("Аккаунт создан. Запросите права администратора.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return toast.error(error.message);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  // ---- AUTH SCREEN ----
  if (!session) {
    return (
      <main className="min-h-screen bg-ink text-bone flex items-center justify-center px-4">
        <form onSubmit={submitAuth} className="w-full max-w-md border border-hairline bg-ink-soft p-8 md:p-10 space-y-6">
          <Link to="/" className="text-overline text-bone-dim link-underline">← На сайт</Link>
          <h1 className="font-display text-3xl text-bone">
            Админ <span className="italic text-gold">панель</span>
          </h1>
          <div className="space-y-4">
            <div>
              <label className="text-overline text-bone-dim block mb-2">E-mail</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-hairline text-bone py-2 outline-none focus:border-gold transition-colors"
              />
            </div>
            <div>
              <label className="text-overline text-bone-dim block mb-2">Пароль</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-hairline text-bone py-2 outline-none focus:border-gold transition-colors"
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-bone text-ink py-4 text-overline hover:bg-gold transition-colors duration-500">
            {mode === "signin" ? "Войти" : "Создать аккаунт"}
          </button>
          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="block w-full text-center text-overline text-bone-dim link-underline"
          >
            {mode === "signin" ? "Создать аккаунт" : "У меня уже есть аккаунт"}
          </button>
        </form>
      </main>
    );
  }

  // ---- NOT ADMIN ----
  if (isAdmin === false) {
    return (
      <main className="min-h-screen bg-ink text-bone flex items-center justify-center px-4">
        <div className="max-w-md text-center space-y-6">
          <h1 className="font-display text-3xl">Нет доступа</h1>
          <p className="text-bone-dim">
            Вы вошли как <span className="text-bone">{session.user.email}</span>, но не имеете прав администратора.
            <br />
            Попросите владельца проекта добавить вашу запись в таблицу ролей.
          </p>
          <button onClick={signOut} className="text-overline text-gold link-underline">Выйти</button>
        </div>
      </main>
    );
  }

  if (isAdmin === null) {
    return <main className="min-h-screen bg-ink text-bone flex items-center justify-center">Загрузка…</main>;
  }

  // ---- ADMIN DASHBOARD ----
  return (
    <main className="min-h-screen bg-ink text-bone py-12 md:py-20">
      <div className="container-editorial">
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="text-overline text-gold">Заявки</div>
            <h1 className="font-display text-4xl md:text-5xl">{leads.length}</h1>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-overline text-bone-dim">{session.user.email}</span>
            <button onClick={signOut} className="text-overline text-bone link-underline">Выйти</button>
          </div>
        </div>

        {loading ? (
          <div className="text-bone-dim">Загрузка…</div>
        ) : leads.length === 0 ? (
          <div className="border border-hairline p-10 text-center text-bone-dim">Пока нет заявок.</div>
        ) : (
          <div className="space-y-3">
            {leads.map((l) => (
              <details key={l.id} className="border border-hairline bg-ink-soft group">
                <summary className="cursor-pointer p-5 grid grid-cols-12 gap-4 items-center list-none">
                  <span className="col-span-12 md:col-span-3 font-display text-bone text-lg">{l.name}</span>
                  <span className="col-span-6 md:col-span-3 text-bone-dim text-sm">{l.brand}</span>
                  <span className="col-span-6 md:col-span-3 text-bone-dim text-sm font-mono">{l.email}</span>
                  <span className="col-span-12 md:col-span-3 text-overline text-bone-dim md:text-right">
                    {new Date(l.created_at).toLocaleString("ru-RU")}
                  </span>
                </summary>
                <div className="px-5 pb-5 grid grid-cols-12 gap-4 text-sm border-t border-hairline pt-4">
                  <div className="col-span-6 md:col-span-3"><div className="text-overline text-bone-dim mb-1">Телефон</div><div className="text-bone">{l.phone || "—"}</div></div>
                  <div className="col-span-6 md:col-span-3"><div className="text-overline text-bone-dim mb-1">Объём</div><div className="text-bone">{l.volume || "—"}</div></div>
                  <div className="col-span-12 md:col-span-6"><div className="text-overline text-bone-dim mb-1">Сообщение</div><div className="text-bone whitespace-pre-wrap">{l.message || "—"}</div></div>
                </div>
              </details>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Admin;
