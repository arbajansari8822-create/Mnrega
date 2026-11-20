export default function SkeletonCard() {
  return (
    <div className="rounded-2xl border-2 border-slate-200 bg-white p-4" aria-hidden="true">
      <div className="skeleton h-4 w-1/3" />
      <div className="skeleton mt-4 h-8 w-3/4" />
      <div className="skeleton mt-4 h-4 w-full" />
      <div className="skeleton mt-2 h-4 w-2/3" />
    </div>
  );
}
