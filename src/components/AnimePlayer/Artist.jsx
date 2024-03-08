import { useContext } from "react";
import { Context } from "../../Context";

export default function Artist() {
  const { artist } = useContext(Context);
  return (
    <svg
      width="96"
      height="96"
      viewBox="0 0 96 96"
      className="absolute -left-12 -top-12 z-30 scale-150 origin-center"
      aria-hidden="true">
      <foreignObject x="0" y="0" width="96" height="96">
        <div className="grid place-items-center w-full h-full">
          {artist && (
            <img
              className="w-20 absolute h-20 rounded-full"
              src={artist.images[1].url}
              alt={name}
              aria-hidden="true"
            />
          )}
          <img
            className="w-24 h-24"
            src="https://cdn.discordapp.com/avatar-decoration-presets/a_c3cffc19e9784f7d0b005eecdf1b566e.png?size=240&passthrough=true"
            alt=""
          />
        </div>
      </foreignObject>
    </svg>
  );
}
