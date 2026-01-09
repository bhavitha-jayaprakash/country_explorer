export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-4 justify-between mb-12">
        <div className="h-12 w-full md:w-1/3 bg-slate-200 dark:bg-slate-700 rounded-md animate-pulse" />
        <div className="h-12 w-48 bg-slate-200 dark:bg-slate-700 rounded-md animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="rounded-lg overflow-hidden shadow-md h-80 bg-slate-100 dark:bg-slate-800 animate-pulse border border-slate-200 dark:border-slate-700">
            <div className="h-40 bg-slate-300 dark:bg-slate-700" />
            <div className="p-6 space-y-4">
              <div className="h-6 w-3/4 bg-slate-300 dark:bg-slate-700 rounded" />
              <div className="space-y-2">
                <div className="h-4 w-1/2 bg-slate-300 dark:bg-slate-700 rounded" />
                <div className="h-4 w-1/2 bg-slate-300 dark:bg-slate-700 rounded" />
                <div className="h-4 w-1/2 bg-slate-300 dark:bg-slate-700 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}