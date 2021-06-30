import Link from 'next/link'
import { useEffect } from 'react'
import { useState } from 'react'
import { FiGithub, FiBook } from 'react-icons/fi'

const GITHUB_REPO_ENDPOINT = 'https://api.github.com/repos/osu-mlpp/osu-mlpp'

const FOOTER_LINKS = [
  {
    label: 'GitHub',
    url: 'https://github.com/osu-mlpp',
    icon: <FiGithub size={32} />
  },
  {
    label: 'Wiki',
    url: 'https://github.com/osu-mlpp/wiki/blob/master/Summary.md',
    icon: <FiBook size={32} />
  },
]

export default function DefaultLayout({ children }: ChildrenProps) {
  const [updatedAt, setUpdatedAt] = useState('')

  useEffect(() => {
    getLastUpdateDate()
  }, [])

  async function getLastUpdateDate() {
    const response = await fetch(GITHUB_REPO_ENDPOINT)
    const json = await response.json()

    const date = new Date(json.updated_at)
    const lastUpdateDate = new Intl.DateTimeFormat(navigator.language)
      .format(date)

    setUpdatedAt(lastUpdateDate)
  }


  return (
    <div className="container">
      <header className="py-14">
        <Link href="/" passHref={true}>
          <a className="logo bg-white text-black inline-block py-4 px-8 rounded">
            <h1>
              MLpp
            </h1>
          </a>
        </Link>

        <p>
          Latest update : <b>{ updatedAt }</b>
        </p>
      </header>

      <main>
        { children }
      </main>

      <footer>
        {FOOTER_LINKS.map((link => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-opacity-40 hover:text-opacity-80 transition-colors"
          >
            { link.icon }
            <span className="mt-2">{ link.label }</span>
          </a>
        )))}
      </footer>
    </div>
  )
}
