import ContextProvider from "./Context";
import { BlurredPlayer } from "./components/BlurredPlayer";
import { SpotifyIcon } from "./components/Icons";
import useSpotifyAuth from "./hooks/useSpotifyAuth";

function App() {
  const accessToken = localStorage.getItem("spotifyAccessToken");

  const { handleSpotifyAuth } = useSpotifyAuth();

  return (
    <ContextProvider>
      {!accessToken && (
        <button
          className="overflow-hidden text-lg tracking-wider box font-bold bg-[#1ed760] bg-clip-padding border-[#1ed760] border-b-2 border-r-2 border-dashed transition-all duration-300 rounded-md text-white flex items-center gap-3 p-4 h-max hover:shadow-xl hover:-translate-y-2"
          onClick={handleSpotifyAuth}>
          Authenticate with Spotify
          <SpotifyIcon className="w-10 h-10" />
        </button>
      )}
      {accessToken && <BlurredPlayer />}
    </ContextProvider>
  );
}

export default App;
