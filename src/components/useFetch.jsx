import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const spotifyAuthUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${
  import.meta.env.VITE_SPOTIFY_CLIENT_ID
}&redirect_uri=${
  import.meta.env.VITE_SPOTIFY_REDIRECT_URI
}&scope=user-read-currently-playing+user-read-playback-state`;

const handleSpotifyAuth = () => {
  window.location.href = spotifyAuthUrl;
};

export default function useFetch() {
  const [accessToken, setAccessToken] = useState("");
  const [currentSongData, setCurrentSongData] = useState(null);
  const [expiresIn, setExpiresIn] = useState(0);
  const [plabackStateData, setPlaybackStateData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const getAccessTokenFromStorage = () => {
      const storedToken = localStorage.getItem("spotifyAccessToken");
      if (storedToken) {
        setAccessToken(storedToken);
      }
    };

    const saveAccessTokenToStorage = (token) => {
      localStorage.setItem("spotifyAccessToken", token);
    };

    const getAccessTokenFromURL = () => {
      const hashParams = location.hash
        .substring(1)
        .split("&")
        .reduce((acc, param) => {
          const [key, value] = param.split("=");
          acc[key] = decodeURIComponent(value);
          return acc;
        }, {});

      if (hashParams.access_token && hashParams.expires_in) {
        setAccessToken(hashParams.access_token);
        setExpiresIn(hashParams.expires_in);
        window.location.href = window.location.origin;
        saveAccessTokenToStorage(hashParams.access_token);
      } else {
        getAccessTokenFromStorage();
      }
    };

    getAccessTokenFromURL();
  }, [location, accessToken]);

  useEffect(() => {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${accessToken}`);

    const fetchPlaybackState = async () => {
      try {
        const response = await fetch("https://api.spotify.com/v1/me/player", {
          method: "GET",
          headers,
        });

        if (response.ok) {
          const data = await response.json();
          setPlaybackStateData(data);
          setIsPlaying(data.is_playing);
          //   console.log(data);
        } else {
          handleSpotifyAuth();
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCurrentSong = async () => {
      try {
        const response = await fetch(
          "https://api.spotify.com/v1/me/player/currently-playing",
          {
            method: "GET",
            headers,
          }
        );

        if (response.ok) {
          const data = await response.json();
          setCurrentSongData(data);
          //   console.log(data);
          if (expiresIn > 0) {
            setTimeout(() => {
              handleSpotifyAuth();
            }, expiresIn * 1000 - 60000);
          }
        } else {
          throw new Error(`Error fetching current song: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (accessToken) {
      const refreshData = () => {
        fetchCurrentSong();
        fetchPlaybackState();
      };

      const intervalId = setInterval(refreshData, 1000);

      return () => clearInterval(intervalId);
    }
  }, [accessToken, expiresIn]);

  return {
    accessToken,
    currentSongData,
    handleSpotifyAuth,
    isPlaying,
    plabackStateData,
  };
}
