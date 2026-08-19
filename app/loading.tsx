export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <div className="rounded-2xl border border-slate-100 bg-white p-10 shadow-sm">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-orange-200 border-t-orange-600" />
        <p className="mt-4 text-base font-medium text-slate-700">
          Analyzing community vibe...
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Crunching sentiment data from the latest hot posts.
        </p>
      </div>
    </main>
  );
}
