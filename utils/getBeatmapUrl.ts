import { V1BeatmapObject } from "..";

export default function getBeatmapUrl(beatmap: V1BeatmapObject, mode = 'osu') {
  return `https://osu.ppy.sh/beatmapsets/${beatmap.id.set}#${mode}/${beatmap.id.diff}`;
}