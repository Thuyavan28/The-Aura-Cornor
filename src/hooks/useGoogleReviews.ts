import { useState, useEffect } from 'react';
import { fetchGoogleReviews, type GooglePlaceMeta, FALLBACK_REVIEWS, GOOGLE_MAPS_URL } from '../services/googleReviews';

export function useGoogleReviews() {
  const [data, setData] = useState<GooglePlaceMeta>({
    name: 'The Aura Corner',
    rating: 5.0,
    totalReviews: 8,
    address: '7/518, Velachery Main Rd, Vijayanagaram, Medavakkam, Chennai',
    googleMapsUrl: GOOGLE_MAPS_URL,
    reviews: FALLBACK_REVIEWS,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    fetchGoogleReviews()
      .then(result => {
        if (isMounted) {
          setData(result);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    place: data,
    reviews: data.reviews,
    rating: data.rating,
    totalReviews: data.totalReviews,
    googleMapsUrl: data.googleMapsUrl,
    isLoading,
  };
}
