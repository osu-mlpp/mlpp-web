import Image from "next/image";
import Badge from "./Badge";
import { FiStar, FiClock } from "react-icons/fi";
import { V1BeatmapObject } from "..";

interface ExampleBeatmapProps {
  beatmap: V1BeatmapObject;
  onClick: () => void;
}

export default function ExampleBeatmap({
  beatmap,
  onClick,
}: ExampleBeatmapProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col gap-y-4 bg-grey-light p-4 rounded transform hover:bg-opacity-80 hover:scale-105 transition-all cursor-pointer ease-out-cubic items-stretch"
    >
      <Image
        className="rounded shadow transition duration-500"
        src={beatmap.misc.bg.card[1]}
        alt="Beatmap Cover"
        height={150}
        width={300}
        layout="responsive"
      />
      <h4 className="text-xl">
        {beatmap?.metadata.artist.original} - {beatmap?.metadata.title.original}
        <p>[{beatmap?.diff[0].diff}]</p>
      </h4>

      <div className="flex flex-wrap gap-1">
        <Badge Icon={FiStar} className="bg-yellow-300 text-black">
          <span>{beatmap?.diff[0].stats.star.pure}</span>
        </Badge>

        <Badge Icon={FiClock} className="bg-white text-black">
          <span>{beatmap?.diff[0].stats.time.drain}s</span>
        </Badge>
      </div>

      <div className="flex flex-wrap gap-1">
        <Badge className="bg-gray-300 text-black">
          <span>AR {beatmap?.diff[0].stats.ar}</span>
        </Badge>

        <Badge className="bg-indigo-300 text-black">
          <span>OD {beatmap?.diff[0].stats.od}</span>
        </Badge>

        <Badge className="bg-blue-300 text-black">
          <span>CS {beatmap?.diff[0].stats.cs}</span>
        </Badge>

        <Badge className="bg-red-300 text-black">
          <span>HP {beatmap?.diff[0].stats.hp}</span>
        </Badge>
      </div>
    </button>
  );
}
