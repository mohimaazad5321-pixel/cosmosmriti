import mars from "@/assets/mars.jpg";

const items = ["Opportunity", "Spirit", "Curiosity", "Perseverance", "Landing systems", "Parachutes", "Backshells", "Heat shields", "Descent stages"];

export function MarsPreview({ onReturn }: { onReturn: () => void }) {
  return (
    <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center px-6 py-16 text-center animate-fade-up">
      <img src={mars} alt="Mars" width={1024} height={1024} className="h-64 w-64 rounded-full object-cover scale-110 glow-mars animate-spin-slow" />
      <h1 className="mt-10 text-4xl font-extrabold text-secondary sm:text-6xl">Mars Is Waiting</h1>
      <p className="mt-3 text-lg text-muted-foreground">“More memories are waiting to be discovered.”</p>
      <div className="mt-12 grid w-full grid-cols-2 gap-4 sm:grid-cols-3">
        {items.map((i) => (
          <div key={i} className="glass relative p-6 opacity-80">
            <div className="mx-auto mb-3 h-10 w-10 rounded-full bg-secondary/30 blur-sm" />
            <div className="font-display text-sm">{i}</div>
            <div className="mt-2 text-[0.65rem] tracking-[0.3em] text-secondary">COMING NEXT</div>
          </div>
        ))}
      </div>
      <button className="btn-ghost mt-12" onClick={onReturn}>↩ Return to CosmoSmriti</button>
    </section>
  );
}
