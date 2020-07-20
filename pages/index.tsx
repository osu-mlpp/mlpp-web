import Head from 'next/head'
import Nav from '../components/nav'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>MLpp Project - Home</title>
      </Head>
      <Nav/>
      <main>
        <h1>
          Welcome to the website of MLpp project.
        </h1>
      </main>
    </div>
  )
}
