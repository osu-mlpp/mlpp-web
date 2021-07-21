// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ScoresResponse } from '../..'
import client from './libs/client'
import { v1 } from './libs/osu'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ScoresResponse|string>
) {
  // Method not allowed
  if (req.method !== 'GET') {
    res.status(405)
  }

  const { beatmap_id } = req.query

  // Missing required parameter `beatmap_id`
  if (!beatmap_id) {
    res.status(400).send('GET parameter "beatmap_id" is missing.')
  }

  const db = await client.getConnection()

  try {
    const [scores, beatmap] = await Promise.all([
      db.query(
        `select S.score, S.maxcombo, S.count50, S.count100, S.count300, S.countmiss, S.enabled_mods, S.pp, U.rank_score
        from osu_scores_high as S, osu_user_stats as U
        where S.beatmap_id = ? and S.user_id=U.user_id and S.hidden=0
        limit 100`,
        [beatmap_id]
      ),
      v1.beatmap({ b: Number(beatmap_id) })
    ])

    res.status(200).json({ scores, beatmap })
  } catch (error) {
    console.error(error)
    res.status(500)
  } finally {
    db.release()
  }
}