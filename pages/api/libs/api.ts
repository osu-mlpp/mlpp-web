import axios from 'axios'
import { ScoresResponse, V1BeatmapObject } from '../../..'

const instance = axios.create({
  baseURL: '/api/'
})

class Api {
  async scores({
    beatmap_id
  }: {
    beatmap_id: number | string;
  }): Promise<ScoresResponse> {
    const { data } = await instance.get('/scores', {
      params: {
        beatmap_id
      }
    })

    return data
  }

  async mostPlayed(): Promise<V1BeatmapObject[]> {
    const { data } = await instance.get('/most_played')

    return data
  }
}

const api = new Api()

export default api