"use client";

import { FormEvent, useState } from "react";
import Reveal from "./Reveal";
import { useSound } from "./SoundProvider";

type Status = "idle" | "loading" | "done" | "error";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getStoredWaitlist(): Array<{ name: string; email: string; createdAt: string }> {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("vaultly_waitlist") || "[]");
  } catch {
    return [];
  }
}

export default function Waitlist() {
  const { play } = useSound();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string) || "";
    const email = (data.get("email") as string) || "";

    if (!isValidEmail(email)) {
      setStatus("error");
      setMessage("البريد الإلكتروني غير صحيح. تأكد من الصيغة.");
      return;
    }

    play("click");
    setStatus("loading");
    setMessage("");

    const stored = getStoredWaitlist();
    const exists = stored.findIndex((e) => e.email === email);

    setTimeout(() => {
      if (exists !== -1) {
        setStatus("done");
        play("success");
        setMessage(`أنت مسجّل لدينا مسبقًا — مكانك محفوظ (رقم ${exists + 1}).`);
        return;
      }

      stored.push({ name, email, createdAt: new Date().toISOString() });
      localStorage.setItem("vaultly_waitlist", JSON.stringify(stored));

      setStatus("done");
      play("success");
      setMessage(`تم تسجيلك بنجاح! ترتيبك في قائمة الانتظار: ${stored.length}`);
      form.reset();
    }, 800);
  }

  return (
    <section id="waitlist" aria-labelledby="waitlist-title" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <div className="glass mx-auto max-w-2xl p-8 text-center md:p-12">
          <h2 id="waitlist-title" className="font-display text-3xl text-mist md:text-4xl">
            كن من <span className="text-gold">أوائل من يدخل الخزنة.</span>
          </h2>
          <p className="mt-4 text-fog">
            سجّل في قائمة الانتظار وسنرسل لك دعوة مبكرة فور فتح الأبواب.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4 text-right" noValidate>
            <div>
              <label htmlFor="wl-name" className="mb-1.5 block text-sm text-fog">الاسم (اختياري)</label>
              <input id="wl-name" name="name" type="text" autoComplete="name" className="field" placeholder="اسمك الكريم" />
            </div>
            <div>
              <label htmlFor="wl-email" className="mb-1.5 block text-sm text-fog">البريد الإلكتروني</label>
              <input
                id="wl-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="field"
                placeholder="you@example.com"
                dir="ltr"
                aria-describedby="wl-email-hint"
              />
              <p id="wl-email-hint" className="mt-1 text-xs text-fog/60">لن نشارك بريدك مع أي طرف ثالث.</p>
            </div>
            <button type="submit" disabled={status === "loading"} className="btn-gold w-full disabled:opacity-60">
              {status === "loading" ? "جارٍ التسجيل…" : "احجز مكانك الآن"}
            </button>
          </form>

          <p
            role="status"
            aria-live="polite"
            className={`mt-4 min-h-6 text-sm ${status === "error" ? "text-red-400" : "text-mist"}`}
          >
            {message}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
