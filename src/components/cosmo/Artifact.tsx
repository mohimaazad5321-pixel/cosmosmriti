import { useEffect, useState } from "react";
import eagle from "@/assets/eagle.jpg";
import { Robot } from "./Robot";
import { cn } from "@/lib/utils";

const NASA_URL = "https://www.nasa.gov/mission/apollo-11/";

const facts = [
  ["MISSION", "Apollo 11"],
  ["OBJECT", "Lunar Module “Eagle” Descent Stage"],
  ["WORLD", "Moon"],
  ["YEAR", "1969"],
  ["STATUS", "Mission-completed hardware left on the lunar surface"],
  ["LOCATION", "Apollo 11 landing site, Mare Tranquillitatis"],
];

const timeline = [
  { t: "1969", d: "Apollo 11 launches from Earth.", icon: "🚀" },
  { t: "Journey to the Moon", d: "The spacecraft travels toward the Moon.", icon: "🌌" },
  { t: "Lunar Landing", d: "Eagle lands on the lunar surface.", icon: "🦅" },
  { t: "Human Exploration", d: "Neil Armstrong and Buzz Aldrin explore the lunar surface.", icon: "👣" },
  { t: "Departure", d: "The astronauts leave the lunar surface using the ascent stage.", icon: "⬆️" },
  { t: "Left Behind", d: "The descent stage remains on the Moon.", icon: "🌕" },
];

const cards = [
  ["Humans first walked on the Moon in 1969.", "Apollo 11 landed in July 1969. Neil Armstrong and Buzz Aldrin were the first people to walk there."],
  ["The Apollo 11 Lunar Module was named Eagle.", "The Lunar Module was the part of the spacecraft that carried the two astronauts down to the surface."],
  ["Part of the Lunar Module remained on the Moon.", "The descent stage stayed behind and worked like a launch pad when the ascent stage lifted off."],
];

const chain = ["NASA DATA", "MISSION RECORD", "OBJECT IDENTIFICATION", "LOCATION", "COSMOSMRITI STORY"];

const scientific =
  "The Apollo 11 Lunar Module consisted of a descent stage and an ascent stage. After surface operations at Mare Tranquillitatis, the ascent stage departed, and the descent stage remained on the lunar surface.";
const simple =
  "Eagle had different parts. One part helped the astronauts land. Another part helped them leave. The landing part stayed on the Moon.";

const bubbles = ["Whoa! We found something!", "This isn't just a piece of metal.", "It's a piece of human history.", "Want to see what happened?", "Let's follow the mission!"];

export function Artifact({ onReturn }: { onReturn: () => void }) {
  const [phase, setPhase] = useState<"scan" | "found">("scan");
  const [step, setStep] = useState(0);
  const [flipped, setFlipped] = useState<number | null>(null);
  const [eli10, setEli10] = useState(false);
  const [bubble, setBubble] = useState(0);
  const cur = timeline[step]!;

  useEffect(() => {
    const a = setTimeout(() => setPhase("found"), 2200);
    const b = setInterval(() => setBubble((x) => (x + 1) % bubbles.length), 4000);
    return () => {
      clearTimeout(a);
      clearInterval(b);
    };
  }, []);

  return (
    <div className="animate-fade-up">
      {/* Reveal */}
      <section className="relative h-[85vh] min-h-[520px] overflow-hidden">
        <img src={eagle} alt="Apollo 11 Eagle descent stage at Tranquility Base" width={1600} height={912} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        {phase === "scan" && (
          <div className="absolute inset-0">
            <div className="absolute left-0 right-0 h-1 bg-primary shadow-[0_0_30px_var(--primary)] animate-scan" />
          </div>
        )}
        <div className="absolute left-6 top-6 glass px-4 py-2 font-display text-xs tracking-[0.3em] text-primary">
          {phase === "scan" ? "SCANNING MEMORY..." : "MEMORY FOUND ✦"}
        </div>
        <div className="absolute bottom-10 left-0 right-0 mx-auto max-w-5xl px-6">
          <h1 className="text-3xl font-extrabold sm:text-5xl md:text-6xl">The Eagle's Final Resting Place</h1>
          <p className="mt-3 text-lg text-muted-foreground sm:text-xl">“A piece of Apollo history still sits on the Moon.”</p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-24 px-6 py-16">
        {/* Facts */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map(([k, v]) => (
            <div key={k} className="glass p-5">
              <div className="font-display text-[0.65rem] tracking-[0.3em] text-primary">{k}</div>
              <div className="mt-2 text-lg">{v}</div>
            </div>
          ))}
        </section>

        {/* Story + ELI10 */}
        <section className="glass p-8">
          <h2 className="text-2xl font-semibold">The Story</h2>
          <div className="mt-4 space-y-3 text-lg leading-relaxed text-muted-foreground">
            <p>Eagle carried astronauts Neil Armstrong and Buzz Aldrin to the lunar surface.</p>
            <p>The Lunar Module had different parts that performed different jobs. The descent stage helped the astronauts land on the Moon.</p>
            <p>After the astronauts completed their work, they used the ascent stage to leave the lunar surface.</p>
            <p>The descent stage remained behind on the Moon.</p>
            <p className="text-foreground">Today, it represents a physical memory of humanity's first crewed landing on another world.</p>
          </div>
          <div className="mt-8 rounded-xl border border-border p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-display text-xs tracking-[0.3em] text-accent">{eli10 ? "SIMPLE VERSION" : "SCIENTIFIC VERSION"}</span>
              <button className="btn-primary" onClick={() => setEli10((v) => !v)}>
                {eli10 ? "Show scientific" : "Explain like I'm 10"}
              </button>
            </div>
            <p key={String(eli10)} className="mt-4 text-lg animate-fade-up">{eli10 ? simple : scientific}</p>
            <p className="mt-3 text-xs text-muted-foreground">Simplified only from verified CosmoSmriti information — no new facts are added.</p>
          </div>
        </section>

        {/* Timeline */}
        <section>
          <h2 className="text-3xl font-bold">What Happened?</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-[1fr_1.2fr]">
            <ol className="relative space-y-2 border-l border-border pl-6">
              {timeline.map((it, i) => (
                <li key={it.t}>
                  <button
                    onClick={() => setStep(i)}
                    className={cn(
                      "relative w-full rounded-lg px-4 py-3 text-left transition-colors",
                      i === step ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span className={cn("absolute -left-[31px] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full", i <= step ? "bg-primary shadow-[0_0_10px_var(--primary)]" : "bg-muted")} />
                    <span className="font-display text-sm">{it.t}</span>
                  </button>
                </li>
              ))}
            </ol>
            <div key={step} className="glass flex flex-col items-center justify-center p-10 text-center animate-fade-up">
              <div className="text-7xl">{cur.icon}</div>
              <div className="mt-4 font-display text-xl text-primary">{cur.t}</div>
              <p className="mt-3 text-lg">{cur.d}</p>
              <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full bg-primary transition-all duration-700" style={{ width: `${((step + 1) / timeline.length) * 100}%` }} />
              </div>
              {step < timeline.length - 1 && (
                <button className="btn-ghost mt-6" onClick={() => setStep(step + 1)}>Next →</button>
              )}
            </div>
          </div>
        </section>

        {/* Did you know */}
        <section>
          <h2 className="text-3xl font-bold">Did You Know?</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {cards.map(([front, back], i) => (
              <button
                key={i}
                onClick={() => setFlipped(flipped === i ? null : i)}
                className="group h-56 [perspective:1000px]"
              >
                <div className={cn("relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d]", flipped === i && "[transform:rotateY(180deg)]")}>
                  <div className="glass absolute inset-0 flex flex-col justify-between p-6 text-left [backface-visibility:hidden] group-hover:glow-moon">
                    <span className="font-display text-xs tracking-[0.3em] text-accent">DID YOU KNOW?</span>
                    <span className="text-lg">“{front}”</span>
                    <span className="text-xs text-muted-foreground">Tap to reveal more</span>
                  </div>
                  <div className="absolute inset-0 flex items-center rounded-[var(--radius)] bg-primary p-6 text-left text-primary-foreground [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    {back}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* NASA verified */}
        <section className="glass grid gap-6 p-8 md:grid-cols-[auto_1fr] md:items-center">
          <div className="grid h-24 w-24 place-items-center rounded-full border-2 border-primary font-display text-xs text-primary glow-moon">✓ NASA<br />VERIFIED</div>
          <div>
            <h2 className="text-2xl font-bold">NASA Verified</h2>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
              {[["MISSION", "Apollo 11"], ["OBJECT", "Lunar Module Eagle — Descent Stage"], ["WORLD", "Moon"], ["SOURCE", "NASA"]].map(([k, v]) => (
                <div key={k}><dt className="text-xs tracking-widest text-muted-foreground">{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
            <a href={NASA_URL} target="_blank" rel="noreferrer" className="btn-primary mt-6">View NASA source ↗</a>
          </div>
        </section>

        {/* How it knows */}
        <section>
          <h2 className="text-3xl font-bold">How CosmoSmriti Knows</h2>
          <div className="mt-8 flex flex-col items-stretch gap-3 md:flex-row md:items-center">
            {chain.map((c, i) => (
              <div key={c} className="flex flex-1 items-center gap-3 md:flex-col md:gap-0">
                <div className="glass flex-1 p-4 text-center font-display text-xs tracking-widest md:w-full" style={{ animationDelay: `${i * 0.15}s` }}>
                  <span className="text-primary">0{i + 1}</span><br />{c}
                </div>
                {i < chain.length - 1 && <span className="text-primary md:hidden">↓</span>}
              </div>
            ))}
          </div>
        </section>

        <div className="text-center">
          <button className="btn-primary" onClick={onReturn}>↩ Return to CosmoSmriti</button>
        </div>
      </div>

      {/* Guide */}
      <div className="fixed bottom-4 right-4 z-20 flex items-end gap-2">
        <div key={bubble} className="glass mb-10 max-w-[180px] px-3 py-2 text-sm animate-fade-up">{bubbles[bubble]}</div>
        <Robot size="sm" />
      </div>
    </div>
  );
}
