const SR = 44100;

function wavDataUri(samples: Float32Array): string {
  const buf = new ArrayBuffer(44 + samples.length * 2);
  const v = new DataView(buf);
  const writeStr = (o: number, s: string) => {
    for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i));
  };
  writeStr(0, "RIFF");
  v.setUint32(4, 36 + samples.length * 2, true);
  writeStr(8, "WAVE");
  writeStr(12, "fmt ");
  v.setUint32(16, 16, true);
  v.setUint16(20, 1, true);
  v.setUint16(22, 1, true);
  v.setUint32(24, SR, true);
  v.setUint32(28, SR * 2, true);
  v.setUint16(32, 2, true);
  v.setUint16(34, 16, true);
  writeStr(36, "data");
  v.setUint32(40, samples.length * 2, true);
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    v.setInt16(44 + i * 2, s * 0x7fff, true);
  }
  const bytes = new Uint8Array(buf);
  let bin = "";
  const chunkSize = 512;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const end = Math.min(i + chunkSize, bytes.length);
    let chunk = "";
    for (let j = i; j < end; j++) {
      chunk += String.fromCharCode(bytes[j]);
    }
    bin += chunk;
  }
  return "data:audio/wav;base64," + btoa(bin);
}

export function clickUri(): string {
  const dur = 0.05;
  const n = Math.floor(SR * dur);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    s[i] = Math.sin(2 * Math.PI * 2400 * t) * Math.pow(1 - t / dur, 4) * 0.6;
  }
  return wavDataUri(s);
}

export function successUri(): string {
  const dur = 0.55;
  const n = Math.floor(SR * dur);
  const s = new Float32Array(n);
  const notes: Array<[number, number]> = [
    [523.25, 0],
    [783.99, 0.16],
  ];
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    let acc = 0;
    for (const [freq, start] of notes) {
      if (t >= start) {
        const lt = t - start;
        acc += Math.sin(2 * Math.PI * freq * lt) * Math.exp(-lt * 9) * 0.4;
      }
    }
    s[i] = acc;
  }
  return wavDataUri(s);
}

export function chimeUri(): string {
  const dur = 1.2;
  const n = Math.floor(SR * dur);
  const s = new Float32Array(n);
  const partials: Array<[number, number]> = [
    [1318.51, 0.5],
    [2637.02, 0.22],
    [3956.0, 0.1],
  ];
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    let acc = 0;
    for (const [freq, amp] of partials) {
      acc += Math.sin(2 * Math.PI * freq * t) * amp;
    }
    s[i] = acc * Math.exp(-t * 4.5) * 0.55;
  }
  return wavDataUri(s);
}
