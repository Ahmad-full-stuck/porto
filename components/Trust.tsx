import Reveal from "./Reveal";

const ITEMS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "تشفير من الدرجة المصرفية",
    text: "جميع بياناتك مشفّرة أثناء النقل والتخزين بمعيار AES-256، مع مفاتيح تُدار في وحدات أمان مادية.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="11" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="12" cy="16" r="1.5" fill="currentColor" />
      </svg>
    ),
    title: "أموالك معزولة دائمًا",
    text: "الأصول تُحفظ لدى وسيط حفظ مرخّص ومنفصل تمامًا عن Vaultly — لا يمكننا سحب أموالك، فقط إدارتها بتفويض منك.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "تحقق ثنائي إلزامي",
    text: "كل عملية حساسة تتطلب تحققًا ثنائيًا، مع تنبيه فوري لأي نشاط غير معتاد على حسابك.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "شفافية كاملة في الرسوم",
    text: "رسم إداري واحد واضح. لا عمولات خفية، لا رسوم على السحب، ولا مفاجآت في نهاية الشهر.",
  },
];

export default function Trust() {
  return (
    <section aria-labelledby="trust-title" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <h2 id="trust-title" className="font-display text-3xl text-mist md:text-4xl">
          الثقة قبل النمو. <span className="text-gold">دائمًا.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-fog">
          بنينا Vaultly بعقلية خزنة: كل طبقة من المنتج مصممة لحماية أصولك وبياناتك قبل أي شيء آخر.
        </p>
      </Reveal>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {ITEMS.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.08}>
            <article className="glass-soft h-full p-7">
              <div className="flex items-start gap-4">
                <span className="mt-1 inline-block shrink-0 text-gold">{item.icon}</span>
                <div>
                  <h3 className="font-display text-lg text-mist">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-fog">{item.text}</p>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
