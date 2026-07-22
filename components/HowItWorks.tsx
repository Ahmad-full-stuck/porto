import Reveal from "./Reveal";

const STEPS = [
  {
    num: "01",
    title: "اربط حساباتك",
    text: "اربط حساباتك البنكية والاستثمارية في دقائق عبر اتصال مشفّر للقراءة فقط — Vaultly لا يستطيع تحريك أموالك دون إذنك.",
  },
  {
    num: "02",
    title: "حدّد ملامح هدفك",
    text: "تقاعد مبكر؟ دفعة منزل؟ تعليم الأبناء؟ حدّد الهدف والأفق الزمني ومستوى المخاطرة الذي يريحك.",
  },
  {
    num: "03",
    title: "دع Vaultly يعمل",
    text: "محرك الذكاء الاصطناعي يعيد توازن محفظتك، يحصّن مكاسبك الضريبية، وينبهك فقط عندما يستحق الأمر انتباهك.",
  },
];

export default function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <h2 id="how-title" className="font-display text-3xl text-mist md:text-4xl">
          كيف يعمل؟ <span className="text-gold">ثلاث خطوات فقط.</span>
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <Reveal key={s.num} delay={i * 0.12}>
            <article className="glass-soft h-full p-8">
              <span className="font-mono text-sm text-gold" dir="ltr">{s.num}</span>
              <h3 className="mt-4 font-display text-xl text-mist">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-fog">{s.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
