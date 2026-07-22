"use client";

import { useState, useRef, useEffect } from "react";
import { useSound } from "./SoundProvider";

export default function Navbar() {
  const { muted, toggleMute, play } = useSound();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        btnRef.current?.focus();
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const navLinks = [
    { href: "#how-title", label: "كيف يعمل" },
    { href: "#pricing-title", label: "الأسعار" },
    { href: "#waitlist", label: "قائمة الانتظار" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full px-6 py-3 glass-soft">
        <a href="#main" className="flex items-baseline gap-2" onClick={() => play("click")}>
          <span className="font-display text-2xl text-mist">Vaultly</span>
          <span className="hidden text-xs tracking-widest text-gold sm:inline">WEALTH · AI</span>
        </a>

        <nav className="hidden items-center gap-6 text-sm text-fog md:flex" aria-label="التنقل الرئيسي">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => play("click")} className="transition hover:text-gold">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleMute}
            aria-pressed={muted}
            aria-label={muted ? "تشغيل المؤثرات الصوتية" : "كتم المؤثرات الصوتية"}
            className="flex items-center gap-2 rounded-full border border-mist/15 px-4 py-2 text-sm text-fog transition hover:border-gold/50 hover:text-gold"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M11 5 6 9H3v6h3l5 4V5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              {muted ? (
                <path d="m16 9 5 6m0-6-5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              ) : (
                <path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              )}
            </svg>
            <span className="hidden sm:inline">{muted ? "الصوت مكتوم" : "الصوت مفعّل"}</span>
          </button>

          <a href="#waitlist" onClick={() => play("click")} className="hidden rounded-full bg-gold px-5 py-2 text-sm font-medium text-abyss transition hover:brightness-110 sm:inline-flex">
            قائمة الانتظار
          </a>

          <button
            ref={btnRef}
            type="button"
            onClick={() => { setMenuOpen(!menuOpen); play("click"); }}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-controls="mobile-menu"
            className="flex items-center justify-center rounded-full border border-mist/15 p-2 text-fog transition hover:border-gold/50 hover:text-gold md:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {menuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          ref={menuRef}
          id="mobile-menu"
          role="dialog"
          aria-label="قائمة التنقل"
          className="mx-auto mt-2 max-w-6xl rounded-2xl px-6 py-4 glass md:hidden"
        >
          <nav className="flex flex-col gap-4 text-sm text-fog" aria-label="التنقل على الجوال">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => { play("click"); setMenuOpen(false); }}
                className="rounded-lg px-4 py-3 transition hover:bg-mist/5 hover:text-gold"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#waitlist"
              onClick={() => { play("click"); setMenuOpen(false); }}
              className="mt-2 rounded-full bg-gold px-5 py-3 text-center text-sm font-medium text-abyss transition hover:brightness-110"
            >
              قائمة الانتظار
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
