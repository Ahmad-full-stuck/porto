import Reveal from "./Reveal";

const ITEMS = [
  {
    quote: "أول تطبيق مالي لا يجعلني أشعر بالذنب لأنني لا أتابع السوق يوميًا. أفتحه مرة فيسبوع وأجد كل شيء تحت السيطرة.",
    name: "سارة الحربي",
    role: "مهندسة برمجيات",
    initials: "سح",
  },
  {
    quote: "إعادة التوازن التلقائية وفّرت عليّ قرارات كنت أؤجلها لأشهر. الأرقام واضحة والرسوم أوضح.",
    name: "خالد المنصور",
    role: "استشاري طبي",
    initials: "خم",
  },
  {
    quote: "جرّبت ثلاث منصات قبل Vaultly. هذا الوحيد الذي شعرت أنه مصمم لثروتي أنا، لا لمتوسط المستخدمين.",
    name: "نورة العتيبي",
    role: "مؤسِّسة شركة ناشئة",
    initials: "نع",
  },
];

export default function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <h2 id="testimonials-title" className="font-display text-3xl text-mist md:text-4xl">
          ماذا سيقول عملاؤنا؟
        </h2>
        <p className="mt-3 text-sm text-fog">
          شهادات تجريبية مكتوبة لأغراض العرض — المنتج لم يُطلق بعد.
        </p>
      </Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {ITEMS.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1}>
            <figure className="glass-soft flex h-full flex-col p-7">
              <span className="mb-4 inline-block w-fit rounded-full border border-mist/10 px-3 py-1 text-[11px] text-fog">
                شهادة تجريبية
              </span>
              <blockquote className="flex-1 leading-relaxed text-mist">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-6 border-t border-mist/10 pt-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/15 text-xs font-medium text-gold">
                    {t.initials}
                  </span>
                  <div>
                    <p className="font-medium text-mist">{t.name}</p>
                    <p className="text-sm text-fog">{t.role}</p>
                  </div>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
