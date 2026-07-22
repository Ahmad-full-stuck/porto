"use client";

import BalanceCard from "./BalanceCard";
import Reveal from "./Reveal";
import { useSound } from "./SoundProvider";

export default function Hero() {
  const { play } = useSound();

  return (
    <section className="relative overflow-hidden pb-24 pt-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 380px at 80% -5%, rgba(201,169,106,0.09), transparent 65%), radial-gradient(900px 500px at 10% 110%, rgba(30,90,74,0.10), transparent 60%)",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
        <Reveal>
          <p className="text-sm tracking-[0.3em] text-gold">VAULTLY · إدارة ثروة بالذكاء الاصطناعي</p>
          <h1 className="mt-5 font-display text-4xl leading-[1.3] text-mist md:text-6xl md:leading-[1.25]">
            ثروتك تعمل ليلًا ونهارًا،
            <span className="text-gold"> بهدوء تام.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-fog">
            Vaultly يراقب أسواق العالم، يوازن محفظتك، ويقتنص الفرص نيابة عنك —
            بينما تعيش حياتك. لا لوحات معقدة، لا قرارات متسرعة، فقط نموّ منضبط.
          </p>
          <div className="mt-10">
            <a href="#waitlist" onClick={() => play("click")} className="btn-gold">
              انضم إلى قائمة الانتظار
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.15} className="flex justify-center lg:justify-start">
          <BalanceCard />
        </Reveal>
      </div>
    </section>
  );
}
