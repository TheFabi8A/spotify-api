import { createContext } from "react";
import { useGetPlayBackState } from "./hooks/useGetPlayBackState";
import { useGetArtist } from "./hooks/useGetArtist";

export const Context = createContext();

export default function ContextProvider({ children }) {
  const { player } = useGetPlayBackState();

  const { artist } = useGetArtist(player?.item.album.artists[0].id);

  if (!player) return null;
  return (
    <Context.Provider value={{ player, artist }}>{children}</Context.Provider>
  );
}
