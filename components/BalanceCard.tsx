"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useSound } from "./SoundProvider";
import { useCountUp } from "@/lib/useCountUp";

const money = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const HOLDINGS = [
  { label: "أسهم عالمية", value: "41,180.20", share: "49%" },
  { label: "صكوك ودخل ثابت", value: "27,560.00", share: "33%" },
  { label: "نقد وسيولة", value: "15,510.55", share: "18%" },
];

export default function BalanceCard() {
  const reduced = useReducedMotion();
  const { play } = useSound();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // رنين زجاجي خفيف عند انتهاء العدّ التصاعدي.
  const balance = useCountUp(84250.75, 2400, inView, () => play("chime"));
  const growth = useCountUp(12.4, 2400, inView);

  // Parallax خفيف يتبع الماوس (معطّل عند تفضيل تقليل الحركة).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 120, damping: 16 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 120, damping: 16 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      animate={reduced ? undefined : { y: [0, -10, 0] }}
      transition={reduced ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="glass w-full max-w-md p-8"
      role="region"
      aria-label="بطاقة معاينة محفظة Vaultly: إجمالي الأصول ونسبة النمو السنوية"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-fog">المحفظة الرئيسية</p>
        <span className="font-display text-lg text-gold" aria-hidden="true">V</span>
      </div>

      <p className="mt-6 text-sm text-fog">إجمالي الأصول</p>
      <p className="mt-1 font-mono text-4xl tracking-tight text-mist md:text-5xl" dir="ltr">
        ${money.format(balance)}
      </p>

      <div className="mt-4 flex items-center gap-3">
        <span className="chip-growth" dir="ltr">
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            <path d="M5 1 9 7H1L5 1Z" fill="#C9A96A" />
          </svg>
          +{growth.toFixed(1)}%
        </span>
        <span className="text-xs text-fog">النمو منذ بداية العام</span>
      </div>

      <div className="mt-8 space-y-3 border-t border-mist/10 pt-6">
        {HOLDINGS.map((h) => (
          <div key={h.label} className="flex items-center justify-between text-sm">
            <span className="text-fog">{h.label}</span>
            <span className="flex items-center gap-3">
              <span className="font-mono text-mist" dir="ltr">${h.value}</span>
              <span className="w-10 text-left font-mono text-xs text-fog" dir="ltr">{h.share}</span>
            </span>
          </div>
        ))}
      </div>

      <p className="mt-6 text-[11px] text-fog/70">أرقام توضيحية لأغراض العرض فقط.</p>
    </motion.div>
  );
}
