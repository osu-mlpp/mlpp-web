import type { NextApiRequest, NextApiResponse } from 'next'
import { ScoresResponse } from '../..'
import flru from 'flru'
import client from './libs/client'
import { v1 } from './libs/osu'

const cache = flru(50)


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ScoresResponse|string>
) {
  // Method not allowed
  if (req.method !== 'GET') {
    res.status(405)
  }

  const beatmap_id = req.query.beatmap_id as string

  // Missing required parameter `beatmap_id`
  if (!beatmap_id) {
    res.status(400).send('GET parameter "beatmap_id" is missing.')
  }

  const cachedData = cache.get(beatmap_id)

  if (cachedData) {
    const { scores, beatmap } = cachedData
    return res.status(200).json({ scores, beatmap })
  }


  const db = await client.getConnection()

  try {
    const [scores, beatmap] = await Promise.all([
      db.query(
        `SELECT S.score, S.maxcombo, S.count50, S.count100, S.count300, S.countmiss, S.enabled_mods, S.pp, S.estimated_rank_score
        FROM osu_scores_high as S WHERE S.beatmap_id = ? AND S.hidden=0`,
        [beatmap_id]
      ),
      v1.beatmap({ b: Number(beatmap_id) })
    ])

    const response: ScoresResponse = { scores, beatmap }

    cache.set(beatmap_id, response)

    res.status(200).json(response)
  } catch (error) {
    console.error(error)
    res.status(500)
  } finally {
    db.release()
  }
}