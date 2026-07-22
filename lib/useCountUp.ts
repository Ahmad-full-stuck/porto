"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * عدّ تصاعدي حي بمنحنى تباطؤ رباعي.
 * عند تفعيل prefers-reduced-motion يظهر الرقم النهائي فورًا.
 */
export function useCountUp(
  target: number,
  duration = 2400,
  start = false,
  onDone?: () => void
): number {
  const [value, setValue] = useState(0);
  const reduced = useReducedMotion();
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    if (!start) return;
    if (reduced) {
      setValue(target);
      doneRef.current?.();
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      setValue(target * eased);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        doneRef.current?.();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration, reduced]);

  return value;
}
