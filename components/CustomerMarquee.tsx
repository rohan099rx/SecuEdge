import Image from "next/image";
import { CUSTOMERS } from "@/lib/site";

/**
 * Customer logo strip (F500 light treatment): the originals are
 * white-background brand JPEGs, so they merge into the light band directly —
 * no tiles. Quiet monochrome by default, full colour on hover. CSS marquee,
 * paused on hover / reduced motion, edges faded.
 */
export function CustomerMarquee() {
  const logos = CUSTOMERS.filter(
    (c): c is (typeof CUSTOMERS)[number] & { logo: string } => c.logo !== null
  );
  const row = [...logos, ...logos];
  return (
    <div
      className="group relative overflow-hidden"
      style={{
        maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div className="flex w-max animate-marquee items-center gap-14 py-2 group-hover:[animation-play-state:paused]">
        {row.map((c, i) => (
          <Image
            key={`${c.name}-${i}`}
            src={c.logo}
            alt={c.name}
            title={`${c.name} — ${c.sector}`}
            width={180}
            height={72}
            className="h-11 w-auto shrink-0 object-contain opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
          />
        ))}
      </div>
    </div>
  );
}
