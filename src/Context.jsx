import { createContext, useState } from "react";
import { useGetPlayBackState } from "./hooks/useGetPlayBackState";
import { useGetArtist } from "./hooks/useGetArtist";

export const Context = createContext();

export default function ContextProvider({ children }) {
  const { player } = useGetPlayBackState();
  const { artist } = useGetArtist(player?.item?.album?.artists[0]?.id);

  const [PlayerTheme, setPlayerTheme] = useState(() => {
    let stored_player_theme;

    if (typeof window !== "undefined") {
      stored_player_theme = localStorage.getItem("player_theme");
    }

    return stored_player_theme ? stored_player_theme : "Vinyl";
  });

  if (!player) return null;
  return (
    <Context.Provider value={{ player, artist, PlayerTheme, setPlayerTheme }}>
      {children}
    </Context.Provider>
  );
}
