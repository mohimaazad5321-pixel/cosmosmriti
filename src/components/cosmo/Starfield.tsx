import { useEffect, useState } from "react";

type Star = { x: number; y: number; s: number; d: number };

export function Starfield() {
  const [stars, setStars] = useState<Star[]>([]);
  useEffect(() => {
    setStars(
      Array.from({ length: 140 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: Math.random() * 2 + 0.5,
        d: Math.random() * 4,
      })),
    );
  }, []);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {stars.map((st, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-foreground animate-twinkle"
          style={{ left: `${st.x}%`, top: `${st.y}%`, width: st.s, height: st.s, animationDelay: `${st.d}s` }}
        />
      ))}
      <span className="absolute right-[10%] top-[8%] h-px w-28 bg-gradient-to-l from-foreground to-transparent animate-shoot" />
      <span
        className="absolute right-[40%] top-[3%] h-px w-20 bg-gradient-to-l from-primary to-transparent animate-shoot"
        style={{ animationDelay: "4.5s" }}
      />
    </div>
  );
}
