export default function Footer() {
  return (
    <footer className="border-t border-mist/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-xl text-mist">Vaultly</span>
          <span className="text-xs tracking-widest text-gold">WEALTH · AI</span>
        </div>
        <nav aria-label="روابط التذييل" className="flex gap-6 text-sm text-fog">
          <a href="#how-title" className="transition hover:text-gold">كيف يعمل</a>
          <a href="#demo-title" className="transition hover:text-gold">المحاكاة</a>
          <a href="#pricing-title" className="transition hover:text-gold">الأسعار</a>
          <a href="#waitlist" className="transition hover:text-gold">قائمة الانتظار</a>
        </nav>
        <div className="flex items-center gap-4">
          <p className="text-xs text-fog/70">© {new Date().getFullYear()} Vaultly — منتج تجريبي. ليست نصيحة استثمارية.</p>
          <a
            href="#"
            aria-label="العودة إلى أعلى الصفحة"
            className="flex items-center justify-center rounded-full border border-mist/15 p-2 text-fog transition hover:border-gold/50 hover:text-gold"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
