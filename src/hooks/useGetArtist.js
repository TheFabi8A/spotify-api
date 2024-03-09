import useSWR from "swr";

export function useGetArtist(spotifyArtistId) {
  const accessToken = localStorage.getItem("spotifyAccessToken");

  const API_URL = `https://api.spotify.com/v1/artists/${spotifyArtistId}`;

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const fetcher = (url) => fetch(url, { headers }).then((res) => res.json());
  const { data, error, isValidating } = useSWR(API_URL, fetcher, {
    refreshInterval: accessToken && 1000,
  });

  return {
    artist: data,
    error,
    isLoading: !data && !error,
    isValidating,
  };
}
