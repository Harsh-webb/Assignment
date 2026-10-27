import { useState, useEffect, useCallback } from 'react';

export function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://picsum.photos/v2/list?limit=30');

      if (!response.ok) {
        throw new Error(`Failed to load photos: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setPhotos(data);
    } catch (err) {
      setError(err.message || 'Something went wrong while fetching photos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  return { photos, loading, error, refetch: fetchPhotos };
}
