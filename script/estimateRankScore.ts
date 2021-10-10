import dotenv from 'dotenv'
import mariadb from 'mariadb'

if(process.argv.length != 4) {
    console.error("This script takes two arguments, the limit and offset.")
    process.exit(1)
}

const limit: number = Number(process.argv[2]);
const offset: number = Number(process.argv[3]);

if(!(0 <= limit && 0 <= offset)) {
    console.error(`Limit and offset should be natural numbers, but we have ${limit} and ${offset}`)
    process.exit(1)
}

dotenv.config()

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  acquireTimeout: 2 * 60 * 60 * 1000,
})

type Player = {
    user_id: number
}

type Score = {
    score_id: number,
    beatmap_id: number,
    pp: number
}

type ScoreWithEstimatedRankScore = {
    score_id: number,
    beatmap_id: number,
    pp: number,
    estimated_rank_score: number
}

async function getPlayers(): Promise<number[]> {
    let db
    let resp: Player[]
    try {
        db = await pool.getConnection()
        resp = await db.query(`SELECT U.user_id from osu_user_stats as U ORDER BY U.user_id LIMIT ? OFFSET ?`,
            [limit, offset]
        )
    } catch (err) {
        throw err;
    } finally {
        if(db) db.end();
    }
    return resp.map(p => p.user_id);
}

async function updatePlayer(playerId: number) {
    let db
    try {
        db = await pool.getConnection()

        console.log(`[${playerId}] Retrieving player scores...`)

        const scores: Score[] = await db.query(
            `SELECT S.score_id, S.beatmap_id, S.pp FROM osu_scores_high as S WHERE user_id = ? ORDER BY S.score_id`,
            playerId
        )
    
        console.log(`[${playerId}] ${scores.length} scores retrieved for player. Computing estimate...`)
        // Highest pp first
        const tops: Score[] = [];
    
        const output: ScoreWithEstimatedRankScore[] = [];
    
        let previousRankScore = 0;
        for(const score of scores) {
            let rankScore = 0;
            let weight = 1;
            let i = 0;
            while(i < tops.length) {
                const top = tops[i];
                if(top.pp < score.pp) {
                    // We found the spot were we insert the new score
                    tops.splice(i, 0, score)
                    rankScore += (score.pp * weight)
                    weight *= 0.95
                    ++i
                    break
                }
                if(top.beatmap_id == score.beatmap_id) {
                    // We found an other score with the same beatmap_id
                    // The new score gives less pp, so we ignore it,
                    // and we skip the recalculation of the rankScore since it didn't change.
                    i = Number.POSITIVE_INFINITY
                    rankScore = previousRankScore
                    weight = 0
                    break
                }
                rankScore += (top.pp * weight)
                weight *= 0.95
                ++i
            }
    
            if(i == tops.length) {
                tops.push(score)
                rankScore += (score.pp * weight)
                weight *= 0.95
                ++i
            }
            
            while(i < tops.length) {
                const top = tops[i];
                if(top.beatmap_id == score.beatmap_id) {
                    // We found an other score with the same beatmap_id
                    // The old score gives less pp, so we remove it.
                    tops.splice(i, 1)
                    continue
                }
                rankScore += (top.pp * weight)
                weight *= 0.95
                ++i
            }
            previousRankScore = rankScore
    
            output.push({
                ...score,
                estimated_rank_score: rankScore
            })
        }
    
        console.log(`[${playerId}] Finished computing estimate. Updating...`)
    
        await db.batch(
            `UPDATE osu_scores_high SET estimated_rank_score=? WHERE score_id=?`,
            output.map(x => [x.estimated_rank_score, x.score_id]),
        )
        
        console.log(`[${playerId}] Updated estimated_rank_score entries for player.`)
    } catch (err) {
        throw err;
    } finally {
        if(db) db.end();
    }
}

async function main() {
    const players: number[] = await getPlayers()

    await Promise.all(players.map(p => updatePlayer(p)))

    console.log("done.")
    process.exit()
}

main()