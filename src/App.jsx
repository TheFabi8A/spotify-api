import { useContext } from "react";
import { AnimePlayer } from "./components/AnimePlayer";
import { SpotifyIcon } from "./components/Icons";
import useSpotifyAuth from "./hooks/useSpotifyAuth";
import { Context } from "./Context";
import VinylPlayer from "./components/VinylPlayer/VinylPlayer";

function App() {
  const accessToken = localStorage.getItem("spotifyAccessToken");

  const { handleSpotifyAuth } = useSpotifyAuth();

  const { setPlayerTheme, PlayerTheme } = useContext(Context);

  return (
    <div className="grid place-items-center h-screen">
      {accessToken && (
        <div className="fixed flex gap-4 top-0 right-0 p-4">
          <button
            className="bg-red-500 text-white p-2 rounded-md"
            onClick={() => {
              localStorage.removeItem("spotifyAccessToken");
            }}>
            Cerrar sesión
          </button>
          <p className="bg-gray-500 text-white p-2 rounded-md">Cambiar tema</p>
          <button
            className="bg-black text-white p-2 rounded-md"
            onClick={() => {
              setPlayerTheme("Vinyl");
              localStorage.setItem("player_theme", "Vinyl");
            }}>
            Vinyl
          </button>
          <button
            className="bg-black text-white p-2 rounded-md"
            onClick={() => {
              setPlayerTheme("Anime");
              localStorage.setItem("player_theme", "Anime");
            }}>
            Anime
          </button>
        </div>
      )}
      {!accessToken && (
        <div className="flex flex-col gap-4 items-center">
          <button
            className="overflow-hidden text-lg tracking-wider box font-bold bg-[#1ed760] bg-clip-padding border-[#1ed760] border-b-2 border-r-2 border-dashed transition-all duration-300 rounded-md text-white flex items-center gap-3 p-4 h-max hover:shadow-xl hover:-translate-y-2"
            onClick={handleSpotifyAuth}>
            Iniciar sesión con Spotify
            <SpotifyIcon className="w-10 h-10" />
          </button>
          <p>
            Si desea cambiar de cuenta, tambien debe cerrar sesión en la página
            de{" "}
            <a
              className="underline"
              href="https://open.spotify.com"
              target="_blank"
              rel="noopener noreferrer">
              Spotify
            </a>
          </p>
        </div>
      )}
      {accessToken && (
        <>
          {PlayerTheme === "Vinyl" && <VinylPlayer />}
          {PlayerTheme === "Anime" && <AnimePlayer />}
        </>
      )}
    </div>
  );
}

export default App;
