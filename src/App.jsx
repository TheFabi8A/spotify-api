import { SpotifyIcon } from "./components/Icons";
import { useFetch } from "./hooks";

function App() {
  const { accessToken, currentSongData, handleSpotifyAuth, isPlaying } =
    useFetch();

  if (currentSongData && currentSongData.item === null) {
    window.location.reload();
  }

  return (
    <>
      {!accessToken && (
        <button
          className="overflow-hidden text-lg tracking-wider box font-bold bg-[#1ed760] bg-clip-padding border-[#1ed760] border-b-2 border-r-2 border-dashed transition-all duration-300 rounded-md text-white flex items-center gap-3 p-4 h-max hover:shadow-xl hover:-translate-y-2"
          onClick={handleSpotifyAuth}>
          Authenticate with Spotify
          <SpotifyIcon className="w-10 h-10" />
        </button>
      )}
      {currentSongData && (
        <div>
          <div className={`vinyl-jacket w-72 h-72 ${isPlaying && "on-play"}`}>
            <div
              className={`bg-black/50 backdrop-blur-sm overflow-hidden absolute w-full h-full left-0 top-0 p-4`}>
              <div className="relative p-4">
                <h4 className="text-white font-black text-xl">
                  {currentSongData.item.external_urls.spotify && (
                    <a
                      className="hover:underline"
                      href={currentSongData.item.external_urls.spotify}
                      target="_blank"
                      rel="noreferrer">
                      {currentSongData.item.name}
                    </a>
                  )}
                </h4>
              </div>
              <div className="bg-white/50 p-4 backdrop-blur-2xl">
                <h4>
                  <span className="font-bold">
                    {currentSongData.item.artists.length > 1
                      ? "Artists:"
                      : "Artist:"}{" "}
                  </span>
                  {currentSongData.item.artists &&
                    currentSongData.item.artists.map((artist, index) => {
                      const { spotify } = artist.external_urls;
                      const { name, id } = artist;

                      return (
                        <span key={id}>
                          {currentSongData.item.artists.length - index === 1 &&
                          currentSongData.item.artists.length > 1
                            ? " and "
                            : ""}
                          <a
                            className="hover:underline font-black"
                            href={spotify}
                            target="_blank"
                            rel="noopener noreferrer">
                            {name}
                          </a>
                          {currentSongData.item.artists.length - index === 1
                            ? ""
                            : currentSongData.item.artists.length - index === 2
                            ? ""
                            : ", "}
                        </span>
                      );
                    })}
                </h4>
                <h4>
                  <span className="font-bold">Album: </span>
                  {currentSongData.item.album.external_urls.spotify && (
                    <a
                      className="hover:underline font-black"
                      href={currentSongData.item.album.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer">
                      {currentSongData.item.album.name}
                    </a>
                  )}
                </h4>
              </div>
            </div>
            <img
              className={`${
                isPlaying &&
                "animate-[open-close_20s_ease-in-out_infinite_forwards]"
              }`}
              src={currentSongData.item.album.images[0].url}
              alt="cover"
            />
            <div className="vinyl-wrapper">
              <div className={`vinyl box ${isPlaying && "animate-spin"}`}>
                <img
                  src={currentSongData.item.album.images[1].url}
                  alt="cover"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
