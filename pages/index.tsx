import Head from 'next/head'
import DefaultLayout from '../layout'

export default function Home() {
  return (
    <DefaultLayout>
      <Head>
        <title>MLpp - Difficulty estimations of scores on osu! beatmaps using statistics and maching learning</title>
        <meta name="description" content="Difficulty estimations of scores on osu! beatmaps using statistics and maching learning" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p>
        Hello, there is nothing here... yet
      </p>
    </DefaultLayout>
  )
}
