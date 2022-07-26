import damageMeterParser from '../scripts/damageMeterParser.js'
import dbQuery from '../configs/database.js'

const newData = async (req, res) => {
    const data = new damageMeterParser(req.body)
    const players = data.getPlayers()
    const monsters = data.getAllMonsters()
    const questSuccess = data.getQuestSuccess()
    const huntDate = req.body.DATE

    const insertHunt = async (success, date) => {
        return await dbQuery('INSERT INTO hunts (success, hunt_date) VALUES (?, DATE(?)) RETURNING id;', [success, date])
    }

    const insertLog = async (monsters, players) => {
        const huntID = await insertHunt(questSuccess ? 1 : 0, huntDate)

        players.forEach(async (el) => {
            const currentPlayerId = el.id
            let damageSum = 0
            monsters.forEach(el => {
                const object = el.damageData[currentPlayerId]
                damageSum += object ? Object.values(object).reduce((a, b) => a + b) : 0
            })
            const name = el.name
            console.log(name)
            let playerId = await dbQuery(`SELECT id FROM players WHERE name = ?`, [name])

            if (!playerId[0]?.id) {
                // Insert player if doesn't exist
                playerId = await dbQuery(`INSERT INTO players (name) VALUES (?) RETURNING id`, [name])
            }
            await dbQuery(`
            INSERT INTO hunts_players (hunt_id, damage, carts, player) VALUES (?, ?, ?, ?);`, [huntID[0].id, damageSum, el.carts, playerId[0].id])
            console.log(playerId)
        })

        monsters.forEach(async (monster) => {
            await dbQuery('INSERT INTO hunts_monsters (hunt_id, monster, quest_target, hunted) VALUES (?, ?, ?, ?) ', [huntID[0].id, monster.name, monster.isQuestTarget, monster.isHunted])
        });
    }
    insertLog(monsters, players)
    res.status(200).json('Success')
}

export default newData