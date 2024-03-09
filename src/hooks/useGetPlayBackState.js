import useSWR from "swr";
import useSpotifyAuth from "./useSpotifyAuth";

export function useGetPlayBackState() {
  const { handleSpotifyAuth } = useSpotifyAuth();

  const accessToken = localStorage.getItem("spotifyAccessToken");

  const API_URL = "https://api.spotify.com/v1/me/player";

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const fetcher = (url) => fetch(url, { headers }).then((res) => res.json());
  const { data, error, isValidating } = useSWR(API_URL, fetcher, {
    refreshInterval: accessToken && 1000,
  });

  if (data?.error?.status === 401 && accessToken !== null) {
    handleSpotifyAuth();
  }

  return {
    player: data,
    error,
    isLoading: !data && !error,
    isValidating,
  };
}
