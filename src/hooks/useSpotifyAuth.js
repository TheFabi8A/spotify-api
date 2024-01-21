import React from "react";
import { useLocation } from "react-router-dom";

const spotifyAuthUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${
  import.meta.env.VITE_SPOTIFY_CLIENT_ID
}&redirect_uri=${
  import.meta.env.VITE_SPOTIFY_REDIRECT_URI
}&scope=user-read-currently-playing+user-read-playback-state`;

export default function useSpotifyAuth() {
  const location = useLocation();

  const saveAccessTokenToStorage = (token) => {
    localStorage.setItem("spotifyAccessToken", token);
  };

  const handleSpotifyAuth = () => {
    window.location.href = spotifyAuthUrl;
    const hashParams = new URLSearchParams(location.hash.substring(1));
    if (hashParams.has("access_token") && hashParams.has("expires_in")) {
      const accessTokenValue = hashParams.get("access_token");
      accessTokenValue && saveAccessTokenToStorage(accessTokenValue);

      setTimeout(() => {
        window.location.href = window.location.origin;
      }, 250);
    }
  };

  React.useEffect(() => {
    const getAccessTokenFromURL = () => {
      if (location && location.hash) {
        const hashParams = new URLSearchParams(location.hash.substring(1));

        if (hashParams.has("access_token") && hashParams.has("expires_in")) {
          const accessTokenValue = hashParams.get("access_token");

          accessTokenValue && saveAccessTokenToStorage(accessTokenValue);

          setTimeout(() => {
            window.location.href = window.location.origin;
          }, 250);
        }
      }
    };

    getAccessTokenFromURL();
  });

  return { handleSpotifyAuth };
}
