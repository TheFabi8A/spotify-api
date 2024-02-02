import { useEffect, useState } from "react";
import useSpotifyAuth from "./useSpotifyAuth";

export default function useFetch() {
  const [currentSongData, setCurrentSongData] = useState(null);
  const [plabackStateData, setPlaybackStateData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [artistData, setArtistData] = useState(null);

  const { handleSpotifyAuth } = useSpotifyAuth();

  const accessToken = localStorage.getItem("spotifyAccessToken");

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
        } else if (response.status === 401) {
          handleSpotifyAuth();
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
  });

  useEffect(() => {

    const headers = new Headers()
    headers.append('Authorization', `Bearer ${accessToken}`)

    if (accessToken && currentSongData) {
      const fetchArtist = async () => {
        try {
          const response = await fetch(`https://api.spotify.com/v1/artists/${currentSongData.item.artists[0].id}`, {
            method: 'GET',
            headers
          })
          const data = await response.json()
          setArtistData(data)
        } catch (error) {
          console.error(error)
        }
      }

      fetchArtist()
    }
  }, [currentSongData, accessToken]);

  return {
    accessToken,
    currentSongData,
    handleSpotifyAuth,
    isPlaying,
    plabackStateData,
    artistData
  };
}
