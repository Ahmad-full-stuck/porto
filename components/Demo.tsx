"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { useSound } from "./SoundProvider";

const RATES = [0.04, 0.055, 0.07, 0.09, 0.11];
const RISK_LABELS = ["متحفّظ جدًا", "متحفّظ", "متوازن", "نموّ", "نموّ جريء"];
const money = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

export default function Demo() {
  const { play } = useSound();
  const [monthly, setMonthly] = useState(2000);
  const [years, setYears] = useState(10);
  const [risk, setRisk] = useState(3);

  const rate = RATES[risk - 1];
  const r = rate / 12;
  const n = years * 12;
  const fv = r > 0 ? monthly * ((Math.pow(1 + r, n) - 1) / r) : monthly * n;
  const contributed = monthly * n;
  const growthPct = contributed > 0 ? (fv / contributed - 1) * 100 : 0;

  const tick = () => play("click");

  return (
    <section aria-labelledby="demo-title" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <h2 id="demo-title" className="font-display text-3xl text-mist md:text-4xl">
          جرّب محرّك Vaultly <span className="text-gold">بنفسك.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-fog">
          حرّك المؤشرات وشاهد كيف تنمو مساهمتك الشهرية عبر الزمن حسب مستوى المخاطرة.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="glass mt-12 grid gap-10 p-8 md:grid-cols-2 md:p-10">
          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="demo-monthly" className="text-sm text-fog">المساهمة الشهرية</label>
                <span className="font-mono text-gold" dir="ltr">${money.format(monthly)}</span>
              </div>
              <input
                id="demo-monthly"
                type="range"
                min={500}
                max={10000}
                step={250}
                value={monthly}
                onChange={(e) => setMonthly(Number(e.target.value))}
                onPointerUp={tick}
                onKeyUp={tick}
                aria-valuetext={`${money.format(monthly)} دولار شهريًا`}
                className="mt-3"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="demo-years" className="text-sm text-fog">الأفق الزمني</label>
                <span className="font-mono text-gold" dir="ltr">{years} سنة</span>
              </div>
              <input
                id="demo-years"
                type="range"
                min={1}
                max={30}
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                onPointerUp={tick}
                onKeyUp={tick}
                aria-valuetext={`${years} سنة`}
                className="mt-3"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="demo-risk" className="text-sm text-fog">مستوى المخاطرة</label>
                <span className="text-sm text-mist">{RISK_LABELS[risk - 1]}</span>
              </div>
              <input
                id="demo-risk"
                type="range"
                min={1}
                max={5}
                value={risk}
                onChange={(e) => setRisk(Number(e.target.value))}
                onPointerUp={tick}
                onKeyUp={tick}
                aria-valuetext={RISK_LABELS[risk - 1]}
                className="mt-3"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center border-t border-mist/10 pt-8 md:border-r md:border-t-0 md:pr-10 md:pt-0">
            <p className="text-sm text-fog">القيمة المتوقعة للمحفظة</p>
            <p aria-live="polite" className="mt-2 font-mono text-4xl text-gold md:text-5xl" dir="ltr">
              ${money.format(fv)}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="chip-growth" dir="ltr">+{growthPct.toFixed(0)}%</span>
              <span className="text-xs text-fog">فوق إجمالي مساهماتك (${money.format(contributed)})</span>
            </div>
            <p className="mt-6 text-[11px] leading-relaxed text-fog/70">
              محاكاة توضيحية بعوائد افتراضية ثابتة، وليست وعدًا بعائد ولا نصيحة استثمارية.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
