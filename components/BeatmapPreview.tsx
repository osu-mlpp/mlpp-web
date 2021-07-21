import Image from 'next/image'
import { FiStar, FiClock } from 'react-icons/fi'
import Badge from '../components/Badge'
import { V1BeatmapObject } from "..";

interface BeatmapPreviewProps {
  beatmap: V1BeatmapObject|null;
  beatmapCover: string;
}

export default function BeatmapPreview({ beatmap, beatmapCover }: BeatmapPreviewProps) {
  return (
    <div className="flex -mt-24 mb-6 relative">
      { beatmap && (
        <div className={`absolute inset-0 z-above flex flex-col p-8 m:p-12 transition duration-500 ${beatmap ? 'opacity-100' : 'opacity-0'}`}>
          <h3 className="text-2xl mb-4">
            { beatmap?.metadata.artist.original } - { beatmap?.metadata.title.original }
            <span>[{ beatmap?.diff[0].diff }]</span>
          </h3>

          <div className="flex flex-wrap gap-6">
            <Badge Icon={FiStar} className="bg-yellow-300 text-black">
              <span>{ beatmap?.diff[0].stats.star.pure }</span>
            </Badge>

            <Badge Icon={FiClock} className="bg-white text-black">
              <span>{ beatmap?.diff[0].stats.time.drain }s</span>
            </Badge>
          </div>

          <div className="flex flex-wrap gap-6 mt-6">
            <Badge className="bg-gray-300 text-black">
              <span>AR { beatmap?.diff[0].stats.ar }</span>
            </Badge>

            <Badge className="bg-indigo-300 text-black">
              <span>OD { beatmap?.diff[0].stats.od }</span>
            </Badge>

            <Badge className="bg-blue-300 text-black">
              <span>CS { beatmap?.diff[0].stats.cs }</span>
            </Badge>

            <Badge className="bg-red-300 text-black">
              <span>HP { beatmap?.diff[0].stats.hp }</span>
            </Badge>
          </div>
        </div>
      )}

      <Image
        className={`rounded shadow transition duration-500 ${beatmap ? 'filter brightness-30' : ''}`}
        src={beatmapCover}
        alt="Beatmap Cover"
        height={250}
        width={900}
      />
    </div>
  )
}