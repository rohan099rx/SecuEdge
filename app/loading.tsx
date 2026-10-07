export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 py-32" aria-busy="true" aria-label="Loading page">
      <div className="h-4 w-48 animate-pulse rounded bg-white/10" />
      <div className="mt-6 h-10 w-3/4 animate-pulse rounded-lg bg-white/10" />
      <div className="mt-4 h-4 w-1/2 animate-pulse rounded bg-white/10" />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="h-48 animate-pulse rounded-2xl bg-white/[0.04]" />
        <div className="h-48 animate-pulse rounded-2xl bg-white/[0.04]" />
        <div className="h-48 animate-pulse rounded-2xl bg-white/[0.04]" />
      </div>
    </div>
  );
}
