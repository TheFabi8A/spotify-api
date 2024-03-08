import "./VinylPlayer.css";

export default function VinylPlayer() {
  return (
    <div className={`vinyl-jacket w-80 h-80 ${player.is_playing && "on-play"}`}>
      <div className={`bg-black absolute w-full h-full left-0 top-0 p-4`}>
        <div className="relative mb-4">
          <h1 className="text-white font-black text-4xl line-clamp-3">
            {player.item.external_urls.spotify && (
              <a
                className="hover:underline"
                href={player.item.external_urls.spotify}
                target="_blank"
                rel="noreferrer">
                {player.item.name}
              </a>
            )}
          </h1>
        </div>
        <div className="bg-white p-4">
          <h2 className="text-2xl line-clamp-2">
            <span
              className="underline decoration-black tracking-wider"
              style={{
                fontWeight: "900",
              }}></span>
            {player.item.artists.map((artist, index) => {
              const { spotify } = artist.external_urls;
              const { name, id } = artist;

              return (
                <span key={id}>
                  {player.item.artists.length - index === 1 &&
                  player.item.artists.length > 1
                    ? " and "
                    : ""}
                  <a
                    className="hover:underline font-black"
                    href={spotify}
                    target="_blank"
                    rel="noopener noreferrer">
                    {name}
                  </a>
                  {player.item.artists.length - index === 1
                    ? ""
                    : player.item.artists.length - index === 2
                    ? ""
                    : ", "}
                </span>
              );
            })}
          </h2>
          <h2 className="text-2xl line-clamp-2 font-normal">
            <a
              className="hover:underline"
              href={player.item.album.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer">
              {player.item.album.name}
            </a>
          </h2>
        </div>
      </div>
      <img
        className={`${
          player.is_playing &&
          `animate-[open-close_20s_ease-in-out_infinite_forwards]`
        }`}
        src={player.item.album.images[0].url}
        alt="cover"
      />
      <div className="vinyl-wrapper">
        <div className={`vinyl ${player.is_playing && "animate-spin"}`}>
          {artistData && <img src={artistData.images[2].url} alt="cover" />}
        </div>
      </div>
    </div>
  );
}
