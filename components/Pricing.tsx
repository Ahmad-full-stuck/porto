"use client";

import Reveal from "./Reveal";
import { useSound } from "./SoundProvider";

const PLANS = [
  {
    name: "الأساسية",
    price: "0$",
    period: "للأبد",
    features: ["تتبع المحفظة الموحّد", "تنبيهات ذكية أسبوعية", "تقرير شهري مبسّط"],
    highlighted: false,
    cta: "ابدأ مجانًا",
  },
  {
    name: "Vaultly Pro",
    price: "12$",
    period: "شهريًا",
    features: [
      "إدارة آلية كاملة بالذكاء الاصطناعي",
      "إعادة توازن تلقائية للمحفظة",
      "تحصين ضريبي للمكاسب",
      "تقارير أداء تفصيلية",
    ],
    highlighted: true,
    cta: "انضم لقائمة الانتظار",
  },
  {
    name: "Vaultly Private",
    price: "خاص",
    period: "تسعير فردي",
    features: ["مدير علاقة مخصص", "محافظ مصممة بالكامل", "أولوية وصول للفرص"],
    highlighted: false,
    cta: "تواصل معنا",
  },
];

export default function Pricing() {
  const { play } = useSound();

  return (
    <section aria-labelledby="pricing-title" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <h2 id="pricing-title" className="font-display text-3xl text-mist md:text-4xl">
          أسعار بسيطة. <span className="text-gold">بلا مفاجآت.</span>
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-3" role="list">
        {PLANS.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.1}>
            <article
              className={`flex h-full flex-col p-8 ${
                p.highlighted ? "glass border-gold/40" : "glass-soft"
              }`}
              style={p.highlighted ? { borderColor: "rgba(201,169,106,0.45)" } : undefined}
              role="listitem"
            >
              {p.highlighted && (
                <span className="mb-4 inline-block w-fit rounded-full bg-gold px-3 py-1 text-[11px] font-medium text-abyss">
                  الأكثر اختيارًا
                </span>
              )}
              <h3 className="font-display text-xl text-mist">{p.name}</h3>
              <p className="mt-4">
                <span className="font-mono text-4xl text-gold" dir="ltr">{p.price}</span>
                <span className="mr-2 text-sm text-fog">/ {p.period}</span>
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-fog">
                    <span aria-hidden="true" className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#waitlist"
                onClick={() => play("click")}
                className={`mt-8 w-full text-center ${p.highlighted ? "btn-gold" : "btn-ghost"}`}
                role="button"
              >
                {p.cta}
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
