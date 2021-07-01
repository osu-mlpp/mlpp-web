import Head from 'next/head'
import Image from 'next/image'
import DefaultLayout from '../layout'
import TextField from '../components/TextField'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useEffect } from 'react'

const BEATMAPSET_REGEX = /beatmapsets\/(?<id>.*)#/
const getBeatmapsetCover = (beatmapsetId?: string|undefined) => {
  if (!beatmapsetId) return 'https://osu.ppy.sh/images/headers/profile-covers/c4.jpg'
  return `https://assets.ppy.sh/beatmaps/${beatmapsetId}/covers/cover.jpg`
}

export default function Home() {
  const { control, watch } = useForm({ mode: 'onBlur' })
  const [beatmapCover, setBeatmapCover] = useState(getBeatmapsetCover())

  const beatmapUrl: string = watch('beatmapUrl', getBeatmapsetCover())

  useEffect(updateBeatmapData, [beatmapUrl])

  function updateBeatmapData() {
    console.log(beatmapUrl)
    const beatmap = BEATMAPSET_REGEX.exec(beatmapUrl)
    console.log(beatmap)
    setBeatmapCover(getBeatmapsetCover(beatmap?.groups?.id))
  }

  return (
    <DefaultLayout>
      <Head>
        <title>MLpp - Difficulty estimations of scores on osu! beatmaps using statistics and maching learning</title>
        <meta name="description" content="Difficulty estimations of scores on osu! beatmaps using statistics and maching learning" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="relative">
        <div className="flex justify-center -mt-24 mb-6">
          <Image
            className="rounded shadow "
            src={beatmapCover}
            alt="Beatmap Cover"
            height={250}
            width={900}
          />
        </div>

        <form className="grid">
          <div className="grid-row flex justify-center">
            <div className="grid-col-12 m:grid-col-8">
              <Controller
                name="beatmapUrl"
                control={control}
                defaultValue=""
                render={
                  ({ field }) => (
                    <TextField {...field}
                      name="beatmapUrl"
                      label="Beatmap URL"
                      placeholder="https://osu.ppy.sh/beatmapsets/842412#osu/1764213" />
                  )
                }
              />
              <div className="grid-row mt-4">
                <div className="grid-col-12 m:grid-col-4">
                  <TextField name="min-accuracy" label="Min Accuracy" placeholder="98" />
                </div>
                <div className="grid-col-12 m:grid-col-4">
                  <TextField name="min-combo" label="Min Combo" placeholder="425" />
                </div>
                <div className="grid-col-12 m:grid-col-4">
                  <TextField name="max-miss" label="Max Miss" placeholder="3" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </DefaultLayout>
  )
}
