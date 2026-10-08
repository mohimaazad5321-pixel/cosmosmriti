import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Starfield } from "@/components/cosmo/Starfield";
import { Robot } from "@/components/cosmo/Robot";
import { MoonWorld } from "@/components/cosmo/MoonWorld";
import { Artifact } from "@/components/cosmo/Artifact";
import { MarsPreview } from "@/components/cosmo/MarsPreview";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CosmoSmriti — Every Mission Leaves a Memory" },
      { name: "description", content: "Explore the Moon and Mars and discover the real mission hardware humans left behind. A COSMOS team project for NASA Space Apps 2026." },
      { property: "og:title", content: "CosmoSmriti — Every Mission Leaves a Memory" },
      { property: "og:description", content: "Look into the explorer's eyes, choose a world, and uncover the stories humans left behind." },
    ],
  }),
  component: Index,
});

type View = "home" | "moon" | "artifact" | "mars";

const steps = [
  ["01", "Choose a world", "Look into the explorer's eyes and choose Moon or Mars."],
  ["02", "Explore", "Enter an interactive world."],
  ["03", "Discover", "Find a glowing memory and uncover its story."],
];

const worlds = [
  ["Moon", "Apollo missions and other lunar exploration hardware.", "text-primary"],
  ["Mars", "Rovers, landing systems, parachutes, heat shields, and other mission hardware.", "text-secondary"],
  ["Beyond", "Future worlds and future missions.", "text-accent"],
];

function Index() {
  const [view, setView] = useState<View>("home");
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);

  const go = (target: View) => (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({ x: r.left + r.width / 2, y: r.top + r.height / 2 + window.scrollY });
    setTimeout(() => {
      setView(target);
      setZoom(null);
      window.scrollTo(0, 0);
    }, 1300);
  };
  const home = () => {
    setView("home");
    window.scrollTo(0, 0);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Starfield />
      {view === "home" && (
        <div
          style={{
            transformOrigin: zoom ? `${zoom.x}px ${zoom.y}px` : "center",
            transform: zoom ? "scale(28)" : "scale(1)",
            opacity: zoom ? 0 : 1,
            transition: zoom ? "transform 1.3s cubic-bezier(.7,0,.3,1), opacity .4s 0.9s" : "none",
          }}
          className="animate-fade-up"
        >
          <section className="flex min-h-screen flex-col items-center justify-center gap-10 px-6 py-16 text-center">
            <div>
              <p className="text-xs tracking-[0.4em] text-muted-foreground">A COSMOS TEAM PROJECT · NASA SPACE APPS 2026</p>
              <h1 className="mt-4 bg-gradient-to-r from-primary via-foreground to-secondary bg-clip-text text-5xl font-extrabold text-transparent sm:text-7xl">
                CosmoSmriti
              </h1>
              <p className="mt-3 font-display text-lg sm:text-xl">“Every Mission Leaves a Memory.”</p>
              <p className="mx-auto mt-3 max-w-md text-muted-foreground">Explore the worlds beyond Earth and discover the stories humans left behind.</p>
            </div>
            <Robot onMoon={go("moon")} onMars={go("mars")} />
            <p className="mt-6 font-display text-sm tracking-[0.25em] text-accent">LOOK INTO THE EYES. CHOOSE YOUR WORLD.</p>
            <p className="text-xs text-muted-foreground">স্মৃতি (smriti) — Bengali for “memory”</p>
          </section>

          <section className="mx-auto max-w-5xl px-6 pb-20">
            <h2 className="text-center text-3xl font-bold">How It Works</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {steps.map(([n, t, d]) => (
                <div key={n} className="glass p-6 text-left">
                  <div className="font-display text-3xl text-primary">{n}</div>
                  <div className="mt-2 font-display">{t}</div>
                  <p className="mt-2 text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-5xl px-6 pb-24">
            <h2 className="text-center text-3xl font-bold">The Cosmos Is Full of Memories</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {worlds.map(([t, d, c]) => (
                <div key={t} className="glass p-8">
                  <div className={`font-display text-2xl ${c}`}>{t}</div>
                  <p className="mt-3 text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
      {view === "moon" && <MoonWorld onDiscover={() => setView("artifact")} onBack={home} />}
      {view === "artifact" && <Artifact onReturn={() => setView("moon")} />}
      {view === "mars" && <MarsPreview onReturn={home} />}
    </main>
  );
}
