import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Head from "next/head";
import DefaultLayout from "../layout";
import TextField from "../components/TextField";
import Chart from "../components/Chart";
import BeatmapPreview from "../components/BeatmapPreview";
import { V1BeatmapObject, Score, ScoresResponse } from "..";
import localforage from "localforage";
import api from "./api/libs/api";
import { BEATMAP_URL_EXAMPLE, BEATMAPSET_REGEX } from "../utils/constants";
import getBeatmapsetCover from "../utils/getOsuCover";

export default function Home() {
  const { control, watch, setValue } = useForm({ mode: "onBlur" });
  const [beatmapCover, setBeatmapCover] = useState(getBeatmapsetCover());
  const [beatmap, setBeatmap] = useState<V1BeatmapObject | null>(null);
  const [scores, setScores] = useState<Score[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const beatmapUrl: string = watch("beatmapUrl", getBeatmapsetCover());

  useEffect(updateBeatmapData, [beatmapUrl]);

  function updateBeatmapData() {
    setIsLoading(true);
    const beatmap = BEATMAPSET_REGEX.exec(beatmapUrl);
    const beatmapset_id = beatmap?.groups?.beatmapset_id;
    const beatmap_id = beatmap?.groups?.beatmap_id;

    // Update the image cover
    setBeatmapCover(getBeatmapsetCover(beatmapset_id));

    // If the beatmap URL is a valid beatmap URL, we can fetch the data
    if (beatmap_id) {
      getData(beatmap_id);
      return;
    }

    // If the beatmap URL is invalid clear state
    setBeatmap(null);
    setScores([]);
    setIsLoading(false);
  }

  async function getData(beatmap_id: string) {
    const cachedData = await localforage.getItem<ScoresResponse>(beatmap_id);

    if (cachedData) {
      setScores(cachedData.scores);
      setBeatmap(cachedData.beatmap);
      setIsLoading(false);
      return;
    }
    const { scores, beatmap } = await api.scores({ beatmap_id });

    setScores(scores);
    setBeatmap(beatmap);
    setIsLoading(false);
    localforage.setItem<ScoresResponse>(beatmap_id, {
      scores,
      beatmap,
    });
  }

  function setExampleMap(url: string) {
    setValue("beatmapUrl", url);
  }

  return (
    <DefaultLayout>
      <Head>
        <title>MLpp - Charts</title>
        <meta
          name="description"
          content="Difficulty estimations of scores on osu! beatmaps using statistics and maching learning"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="relative">
        {/* Display the beatmap info if any */}
        <BeatmapPreview beatmap={beatmap} beatmapCover={beatmapCover} />

        {/* Enter the beatmap URL form */}
        <div className="flex items-end justify-between">
          <div className="flex-1">
            <Controller
              name="beatmapUrl"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  name="beatmapUrl"
                  label="Beatmap URL"
                  placeholder={BEATMAP_URL_EXAMPLE}
                />
              )}
            />
          </div>
          <button
            className="btn"
            onClick={() => {
              setValue("beatmapUrl", "");
            }}
          >
            Reset
          </button>
        </div>

        {isLoading && (
          <div className="bg-grey-light text-center p-4 my-4">
            <h2 className="text-2xl font-bold">Loading...</h2>
          </div>
        )}

        {/* Display the chart */}
        <Chart
          rawData={scores}
          setExampleMap={setExampleMap}
          beatmap={beatmap}
        />
      </section>
    </DefaultLayout>
  );
}
