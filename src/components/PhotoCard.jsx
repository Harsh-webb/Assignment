import { useState } from 'react';

export default function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const imageUrl = hasError
    ? photo.download_url
    : `https://picsum.photos/id/${photo.id}/500/360`;

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col">
      <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-slate-200 animate-pulse" />
        )}
        <img
          src={imageUrl}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            if (!hasError) setHasError(true);
            setImageLoaded(true);
          }}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      <div className="p-3.5 flex items-center justify-between gap-2">
        <p className="text-sm font-medium text-slate-800 truncate" title={photo.author}>
          {photo.author}
        </p>

        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={isFavourite ? 'Remove favourite' : 'Add favourite'}
          className={`p-2 rounded-full transition-colors ${
            isFavourite
              ? 'text-rose-500 bg-rose-50 hover:bg-rose-100'
              : 'text-slate-400 hover:text-rose-500 hover:bg-slate-50'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isFavourite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={isFavourite ? '0' : '2'}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
