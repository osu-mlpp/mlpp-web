import { V1 } from 'osu-api-extended'

const apiKey: string = process.env.OSU_API_KEY ? process.env.OSU_API_KEY : ''

const v1 = new V1(apiKey)

export {
  v1
}