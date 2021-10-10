import type { NextApiRequest, NextApiResponse } from 'next'
import { ScoresResponse, V1BeatmapObject } from '../..'
import client from './libs/client'
import { v1 } from './libs/osu'

const mostPlayedBeatmaps = [104229, 131891, 714001, 1351114]
let cache: (V1BeatmapObject | null)[] | null = null

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<(V1BeatmapObject | null)[]>
) {
  // Method not allowed
  if (req.method !== 'GET') {
    res.status(405)
  }

  if (cache) {
    return res.status(200).json(cache)
  }

  const db = await client.getConnection()

  try {
    const beatmaps = await Promise.all(
      mostPlayedBeatmaps.map(b => v1.beatmap({ b }))
    )

    cache = beatmaps

    res.status(200).json(beatmaps)
  } catch (error) {
    console.error(error)
    res.status(500)
  } finally {
    db.release()
  }
}