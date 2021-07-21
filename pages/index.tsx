import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Head from 'next/head'
import DefaultLayout from '../layout'
import TextField from '../components/TextField'
import Chart from '../components/Chart'
import BeatmapPreview from '../components/BeatmapPreview'
import { V1BeatmapObject } from '..'

const SCORES_ENDPOINT = '/api/scores'
const BEATMAPSET_REGEX = /beatmapsets\/(?<beatmapset_id>\d*)#.*\/(?<beatmap_id>\d*)/
const BEATMAP_URL_EXAMPLE = 'https://osu.ppy.sh/beatmapsets/842412#osu/1764213'

const getBeatmapsetCover = (beatmapsetId?: number|string|undefined) => {
  if (!beatmapsetId) {
    return `https://osu.ppy.sh/images/headers/profile-covers/c${randomNumber(1, 8)}.jpg`
  }

  return `https://assets.ppy.sh/beatmaps/${beatmapsetId}/covers/cover.jpg`
}

export default function Home() {
  const { control, watch, setValue } = useForm({ mode: 'onBlur' })
  const [beatmapCover, setBeatmapCover] = useState(getBeatmapsetCover())
  const [beatmap, setBeatmap] = useState<V1BeatmapObject|null>(null)
  const [scores, setScores] = useState([])

  const beatmapUrl: string = watch('beatmapUrl', getBeatmapsetCover())

  useEffect(updateBeatmapData, [beatmapUrl])

  function updateBeatmapData() {
    const beatmap = BEATMAPSET_REGEX.exec(beatmapUrl)
    const beatmapset_id = beatmap?.groups?.beatmapset_id
    const beatmap_id = beatmap?.groups?.beatmap_id

    // Update the image cover
    setBeatmapCover(getBeatmapsetCover(beatmapset_id))

    // If the beatmap URL is a valid beatmap URL, we can fetch the data
    if (beatmap_id) {
      getData(beatmap_id)
      return
    }

    // If the beatmap URL is invalid clear state
    setBeatmap(null)
    setScores([])
  }

  async function getData(beatmap_id: string) {
    const querystring = new URLSearchParams({
      beatmap_id
    })
    const response = await fetch(`${SCORES_ENDPOINT}?${querystring}`)
    const data = await response.json()

    setScores(data.scores)
    setBeatmap(data.beatmap)
  }

  function getExampleMap() {
    setValue('beatmapUrl', BEATMAP_URL_EXAMPLE)
  }

  return (
    <DefaultLayout>
      <Head>
        <title>MLpp - Charts</title>
        <meta name="description" content="Difficulty estimations of scores on osu! beatmaps using statistics and maching learning" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="grid relative">
        {/* Display the beatmap info if any */}
        <div className="grid-row">
          <div className="grid-col-12">
            <BeatmapPreview
              beatmap={beatmap}
              beatmapCover={beatmapCover}
            />
          </div>
        </div>

        {/* Enter the beatmap URL form */}
        <div className="grid-row">
          <div className="grid-col-12">
            <Controller
              name="beatmapUrl"
              control={control}
              render={
                ({ field }) => (
                  <TextField {...field}
                    name="beatmapUrl"
                    label="Beatmap URL"
                    placeholder={BEATMAP_URL_EXAMPLE} />
                )
              }
            />
          </div>
        </div>


        {/* Display the chart */}
        <div className="grid-row">
          <div className="grid-col-12">
            <Chart
              data={scores}
              emptyBtnHandler={getExampleMap}
            />
          </div>
        </div>
      </section>
    </DefaultLayout>
  )
}

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}