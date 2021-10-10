import randomNumber from "./randomNumber";

const getBeatmapsetCover = (beatmapsetId?: number | string | undefined) => {
  if (!beatmapsetId) {
    return `https://osu.ppy.sh/images/headers/profile-covers/c${randomNumber(
      1,
      8
    )}.jpg`;
  }

  return `https://assets.ppy.sh/beatmaps/${beatmapsetId}/covers/cover.jpg`;
};

export default getBeatmapsetCover