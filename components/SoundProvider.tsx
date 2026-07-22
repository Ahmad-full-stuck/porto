"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Howl } from "howler";
import { clickUri, successUri, chimeUri } from "@/lib/synth";

export type SoundName = "click" | "success" | "chime";

interface SoundContextValue {
  muted: boolean;
  toggleMute: () => void;
  play: (name: SoundName) => void;
}

const SoundContext = createContext<SoundContextValue>({
  muted: false,
  toggleMute: () => {},
  play: () => {},
});

export const useSound = () => useContext(SoundContext);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [muted, setMuted] = useState(false);
  const soundsRef = useRef<Record<SoundName, Howl> | null>(null);
  const unlockedRef = useRef(false);
  const mutedRef = useRef(false);

  mutedRef.current = muted;

  useEffect(() => {
    try {
      setMuted(window.localStorage.getItem("vaultly-muted") === "1");
    } catch {}

    const unlock = () => {
      unlockedRef.current = true;
    };
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (soundsRef.current) {
        Object.values(soundsRef.current).forEach((howl) => howl.unload());
        soundsRef.current = null;
      }
    };
  }, []);

  const ensureSounds = useCallback(() => {
    if (!soundsRef.current) {
      soundsRef.current = {
        click: new Howl({ src: [clickUri()], format: ["wav"], volume: 0.12 }),
        success: new Howl({ src: [successUri()], format: ["wav"], volume: 0.16 }),
        chime: new Howl({ src: [chimeUri()], format: ["wav"], volume: 0.18 }),
      };
    }
    return soundsRef.current;
  }, []);

  const play = useCallback(
    (name: SoundName) => {
      if (mutedRef.current || !unlockedRef.current) return;
      try {
        ensureSounds()[name].play();
      } catch {}
    },
    [ensureSounds]
  );

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      try {
        window.localStorage.setItem("vaultly-muted", m ? "0" : "1");
      } catch {}
      return !m;
    });
  }, []);

  return (
    <SoundContext.Provider value={{ muted, toggleMute, play }}>
      {children}
    </SoundContext.Provider>
  );
}
