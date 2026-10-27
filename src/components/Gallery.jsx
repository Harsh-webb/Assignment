import { useState, useCallback, useMemo, useReducer, useEffect } from 'react';
import { useFetchPhotos } from '../hooks/useFetchPhotos';
import {
  favouritesReducer,
  initialFavourites,
  initFavourites,
  ACTIONS,
  STORAGE_KEY,
} from '../reducers/favouritesReducer';
import PhotoCard from './PhotoCard';
import SearchBar from './SearchBar';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

export default function Gallery() {
  const { photos, loading, error, refetch } = useFetchPhotos();
  const [searchQuery, setSearchQuery] = useState('');

  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    initialFavourites,
    initFavourites
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    } catch {}
  }, [favourites]);

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const handleToggleFavourite = useCallback((id) => {
    dispatch({
      type: ACTIONS.TOGGLE_FAVOURITE,
      payload: id,
    });
  }, []);

  const filteredPhotos = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return photos;
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(query)
    );
  }, [photos, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl">
            Photo Gallery
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {favourites.length} {favourites.length === 1 ? 'photo' : 'photos'} favourited
          </p>
        </div>

        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          onClear={handleClearSearch}
        />

        {loading && <LoadingSpinner />}

        {!loading && error && (
          <ErrorMessage message={error} onRetry={refetch} />
        )}

        {!loading && !error && (
          <>
            {filteredPhotos.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-sm text-slate-500">
                  No photos found for &ldquo;{searchQuery}&rdquo;
                </p>
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="mt-3 text-xs text-slate-900 underline hover:text-slate-700"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredPhotos.map((photo) => (
                  <PhotoCard
                    key={photo.id}
                    photo={photo}
                    isFavourite={favourites.includes(photo.id)}
                    onToggleFavourite={handleToggleFavourite}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
