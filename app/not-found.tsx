import Link from "next/link";
import { Container, Section } from "@/components/ui";

export default function NotFound() {
  return (
    <Section className="pt-24">
      <Container className="max-w-xl text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 text-4xl font-semibold">This page moved or never existed.</h1>
        <p className="mt-4 text-muted">
          The link may be from the old site. Let&rsquo;s get you back on track.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="btn-primary">Go home</Link>
          <Link href="/frontier" className="btn-secondary">Explore Frontier</Link>
        </div>
      </Container>
    </Section>
  );
}
