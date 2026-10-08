import moon from "@/assets/moon.jpg";
import mars from "@/assets/mars.jpg";
import { cn } from "@/lib/utils";

type Props = {
  size?: "lg" | "sm";
  onMoon?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMars?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function Eye({ img, label, kind, onClick, small }: { img: string; label: string; kind: "moon" | "mars"; onClick?: Props["onMoon"]; small: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      aria-label={label}
      className={cn(
        "group relative grid place-items-center rounded-full bg-background ring-4 ring-robot-shade transition-transform duration-500",
        small ? "h-9 w-9" : "h-28 w-28 sm:h-36 sm:w-36",
        onClick && "cursor-pointer hover:scale-110",
        onClick && (kind === "moon" ? "hover:glow-moon" : "hover:glow-mars"),
      )}
    >
      <span className="absolute inset-[8%] overflow-hidden rounded-full animate-blink">
        <img src={img} alt="" width={1024} height={1024} className="h-full w-full scale-125 object-cover animate-spin-slow" />
        <span className="absolute left-[20%] top-[15%] h-[18%] w-[18%] rounded-full bg-foreground/70 blur-[1px]" />
      </span>
      {!small && onClick && (
        <span
          className={cn(
            "pointer-events-none absolute -bottom-12 whitespace-nowrap font-display text-xs tracking-[0.2em] opacity-0 transition-opacity group-hover:opacity-100",
            kind === "moon" ? "text-primary" : "text-secondary",
          )}
        >
          {label}
        </span>
      )}
    </button>
  );
}

export function Robot({ size = "lg", onMoon, onMars }: Props) {
  const small = size === "sm";
  return (
    <div className={cn("relative flex flex-col items-center", !small && "animate-bob")}>
      {/* antenna */}
      <div className="flex flex-col items-center">
        <span className={cn("rounded-full bg-accent animate-twinkle", small ? "h-2 w-2" : "h-4 w-4", "shadow-[0_0_16px_var(--accent)]")} />
        <span className={cn("bg-robot-shade", small ? "h-2 w-0.5" : "h-8 w-1")} />
      </div>
      {/* head */}
      <div
        className={cn(
          "relative rounded-[42%] bg-gradient-to-b from-robot to-robot-shade shadow-2xl",
          small ? "px-2 py-3" : "px-8 py-10 sm:px-10 sm:py-12",
        )}
      >
        <div className={cn("flex items-center rounded-[40%] bg-primary-foreground", small ? "gap-1 p-1.5" : "gap-6 p-5 sm:gap-8 sm:p-6")}>
          <Eye img={moon} label="EXPLORE THE MOON" kind="moon" onClick={onMoon} small={small} />
          <Eye img={mars} label="EXPLORE MARS" kind="mars" onClick={onMars} small={small} />
        </div>
        <div className={cn("mx-auto rounded-full bg-primary/70", small ? "mt-1 h-0.5 w-4" : "mt-5 h-2 w-16")} />
        <span className={cn("absolute top-1/2 -translate-y-1/2 rounded-full bg-robot-shade", small ? "-left-1 h-3 w-1.5" : "-left-3 h-12 w-4")} />
        <span className={cn("absolute top-1/2 -translate-y-1/2 rounded-full bg-robot-shade", small ? "-right-1 h-3 w-1.5" : "-right-3 h-12 w-4")} />
      </div>
      {!small && (
        <div className="-mt-2 h-14 w-40 rounded-b-[3rem] rounded-t-xl bg-gradient-to-b from-robot-shade to-muted">
          <div className="mx-auto mt-4 h-3 w-3 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
        </div>
      )}
    </div>
  );
}
