"use client";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 py-32 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-300">Something went wrong</p>
      <h2 className="mt-4 text-4xl font-bold tracking-tight text-white">Unable to load this page.</h2>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex min-h-[3rem] items-center rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 px-6 text-sm font-bold text-[#02131f]"
        >
          Try again
        </button>
        <a
          href="/"
          className="inline-flex min-h-[3rem] items-center rounded-xl border border-white/15 bg-white/[0.03] px-6 text-sm font-semibold text-white"
        >
          Back to home
        </a>
      </div>
    </div>
  );
}
