export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
      <p className="mt-3 text-sm text-slate-500 font-medium">Loading photos...</p>
    </div>
  );
}
