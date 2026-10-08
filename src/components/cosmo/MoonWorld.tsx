import { useRef, useState } from "react";
import moon from "@/assets/moon.jpg";
import { Button } from "@/components/ui/button";

export function MoonWorld({ onDiscover, onBack }: { onDiscover: () => void; onBack: () => void }) {
  const [rot, setRot] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [near, setNear] = useState(false);
  const [diving, setDiving] = useState(false);
  const drag = useRef<number | null>(null);

  const discover = () => {
    setDiving(true);
    setTimeout(onDiscover, 1500);
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 animate-fade-up">
      <button onClick={onBack} className="absolute left-6 top-6 text-sm text-muted-foreground hover:text-foreground">
        ← Return to CosmoSmriti
      </button>
      <p className="mb-8 text-center font-display text-lg text-primary sm:text-2xl">
        {near ? "Something was left here…" : "Something is waiting to be remembered…"}
      </p>
      <div
        className="relative touch-none select-none"
        style={{
          width: "min(80vw, 560px)",
          aspectRatio: "1",
          transform: diving ? "scale(6) translate(-4%, -2%)" : `scale(${zoom})`,
          transition: diving ? "transform 1.5s cubic-bezier(.6,0,.3,1)" : "transform .3s",
        }}
        onPointerDown={(e) => (drag.current = e.clientX)}
        onPointerMove={(e) => {
          if (drag.current === null) return;
          setRot((r) => r + (e.clientX - drag.current!) * 0.3);
          drag.current = e.clientX;
        }}
        onPointerUp={() => (drag.current = null)}
        onPointerLeave={() => (drag.current = null)}
        onWheel={(e) => setZoom((z) => Math.min(1.6, Math.max(0.7, z - e.deltaY * 0.001)))}
      >
        <div className="absolute inset-0 rounded-full glow-moon" />
        <div className="absolute inset-0 cursor-grab active:cursor-grabbing" style={{ transform: `rotate(${rot}deg)` }}>
          <img src={moon} alt="The Moon" width={1024} height={1024} draggable={false} className="h-full w-full scale-[1.25] rounded-full object-cover" />
          {/* Mare Tranquillitatis approx. */}
          <button
            onClick={discover}
            onMouseEnter={() => setNear(true)}
            onMouseLeave={() => setNear(false)}
            className="group absolute left-[56%] top-[44%] -translate-x-1/2 -translate-y-1/2"
            aria-label="Unknown memory — discover"
          >
            <span className="absolute inset-0 rounded-full bg-accent animate-pulse-ring" />
            <span className="relative block h-4 w-4 rounded-full bg-accent shadow-[0_0_18px_var(--accent)]" />
            <span className="glass absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1 text-xs font-display tracking-widest" style={{ transform: `translateY(-50%) rotate(${-rot}deg)` }}>
              {near ? "DISCOVER" : "UNKNOWN MEMORY"}
            </span>
          </button>
        </div>
        {diving && <div className="absolute inset-0 rounded-full bg-background/0 animate-fade-up" />}
      </div>
      <p className="mt-10 text-sm text-muted-foreground">Drag to spin · scroll to zoom · tap the glowing light</p>
      {!diving && (
        <Button variant="ghost" className="mt-2 text-primary" onClick={discover}>
          Discover
        </Button>
      )}
    </section>
  );
}
