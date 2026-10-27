export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-red-50 border border-red-200 rounded-xl text-center">
      <p className="text-sm font-semibold text-red-800 mb-1">Failed to load photos</p>
      <p className="text-xs text-red-600 mb-4">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
