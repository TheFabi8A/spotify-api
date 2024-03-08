import { useContext } from "react";
import Artist from "./Artist";
import "./BlurredPlayer.css";
import { Context } from "../../Context";

export default function BlurredPlayer() {
  const { player } = useContext(Context);
  return (
    <div className="relative grid place-items-center w-max">
      <Artist />
      <div className="w-full overflow-hidden bottom-0 absolute left-0 bg-white/25 z-20 backdrop-blur-md">
        <div className="scroller-container relative flex items-center gap-4 w-max py-6 text-5xl leading-[38px]">
          <h1 className=" w-full text-center">{player.item.name}</h1>
          <h1 className="w-full text-center">{player.item.name}</h1>
          <h1 className="w-full text-center">{player.item.name}</h1>
          <h1 className="w-full text-center">{player.item.name}</h1>
          <h1 className="w-full text-center">{player.item.name}</h1>
          <h1 className="w-full text-center">{player.item.name}</h1>
          <h1 className="w-full text-center">{player.item.name}</h1>
          <h1 className="w-full text-center">{player.item.name}</h1>
          <h1 className="w-full text-center">{player.item.name}</h1>
          <h1 className="w-full text-center">{player.item.name}</h1>
        </div>
      </div>
      <img
        className="relative z-10 w-96"
        src={player.item.album.images[0].url}
      />
      <img
        className="absolute blur-md scale-110"
        src={player.item.album.images[0].url}
      />
      <div className="z-10 absolute overflow-hidden h-full">
        <img
          className="relative -top-[calc(50%_-_10px)]"
          src="https://cdn.discordapp.com/assets/profile_effects/effects/2024-02-28/sushi-mania/intro.png"
        />
      </div>
    </div>
  );
}
