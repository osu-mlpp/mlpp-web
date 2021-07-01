// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import client from './libs/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Score[]|string>
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
    const rows: Score[] = await db.query(
      `SELECT * FROM osu_scores_high WHERE beatmap_id = ? ORDER BY date DESC LIMIT 100`,
      [beatmap_id]
    )
    res.status(200).json(rows)
  } catch (error) {
    console.error(error)
    res.status(500)
  } finally {
    db.release()
  }
}