import damageMeterParser from '../scripts/damageMeterParser.js'
import dbQuery from '../configs/database.js'

const newData = async (req, res) => {
    const data = new damageMeterParser(req.body)
    const players = data.getPlayers()
    const monsters = data.getAllMonsters()
    const questSuccess = data.getQuestSuccess()

    const insertHunt = async (success) => {
        return await dbQuery('INSERT INTO hunts (success) VALUES (?) RETURNING id;', [success])
    }

    const insertLog = async (monsters, players) => {
        const huntID = await insertHunt(parseInt(questSuccess))

        players.forEach(async (el) => {
            const currentPlayerId = el.id
            let damageSum = 0
            monsters.forEach(el => {
                const object = el.damageData[currentPlayerId]
                damageSum += object ? Object.values(object).reduce((a, b) => a + b) : 0
            })
            const playerId = await dbQuery(`
            INSERT INTO hunts_players (hunt_id, damage, carts, player) VALUES (?, ?, ?, ?);`, [huntID[0].id, damageSum, el.carts, el.name])
            console.log(playerId)
        })

        monsters.forEach(async (monster) => {
            await dbQuery('INSERT INTO hunts_monsters (hunt_id, monster, quest_target, hunted) VALUES (?, ?, ?, ?) ', [huntID[0].id, monster.name, monster.isQuestTarget, monster.isHunted])
        });
    }
    insertLog(monsters, players)
}

export default newData