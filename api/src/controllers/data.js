import express from 'express';
import dbQuery from "../configs/database.js";
import damageMeterParser from '../scripts/damageMeterParser.js'
import authMiddleware from '../middleware/auth.js'
const router = express.Router()

const removeBigInt = (obj) => {
    return JSON.parse(JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value // return everything else unchanged
    ));
}

router.use(authMiddleware)

router.get('/mostHunted', async (req, res) => {

    const resp = removeBigInt(await dbQuery('SELECT COUNT(*) AS "Count", Monster FROM hunts_monsters GROUP BY monster ORDER BY COUNT DESC LIMIT 1'))

    res.status(200).json({ data: resp });

});

router.get('/questCount', async (req, res) => {

    const resp = removeBigInt(await dbQuery('SELECT COUNT(*) AS "Count", success FROM hunts GROUP BY success'))

    res.status(200).json({ data: resp });
})

router.get('/players', async (req, res) => {
    const resp = await dbQuery('SELECT name FROM players')

    res.status(200).json({data: resp})
})

router.get('/carts/:name?', async (req, res) => {

    const params = req.params

    let resp = {}

    if (params.name) {
        resp = await dbQuery('SELECT SUM(carts) AS "Carts", players.name FROM hunts_players INNER JOIN players ON players.id = hunts_players.player WHERE players.name = ?', [params.name])
    } else {
        resp = await dbQuery('SELECT SUM(carts) AS "Carts" FROM hunts_players')
    }

    res.status(200).json({ data: resp })
})

router.get('/cartsOverTime/:name', async (req, res) => {

    const removeBigInt = (obj) => {
        return JSON.parse(JSON.stringify(obj, (key, value) =>
            typeof value === 'bigint'
                ? value.toString()
                : value // return everything else unchanged
        ));
    }

    const params = req.params


    const resp = removeBigInt(await dbQuery(
        `SELECT sum(hp.carts) AS "carts", p.name, DATE(FROM_UNIXTIME(h.hunt_date)) AS hd FROM players AS p
        INNER JOIN hunts_players AS hp ON p.id = hp.player
        INNER JOIN hunts AS h ON hp.hunt_id = h.id
        WHERE p.name = ?
        GROUP BY hd`, [params.name]
    ))

    console.log(resp)
    res.status(200).json({ data: resp })
})

router.get('/highestDamageDone', async (req, res) => {
    const resp = removeBigInt(await dbQuery('SELECT players.name, MAX(hunts_players.damage) AS "damage" FROM players JOIN hunts_players ON players.id = hunts_players.player'))

    res.status(200).json({ data: resp })
})

router.get('/lastQuests', async (req, res) => {
    const idResp = removeBigInt(await dbQuery(`
    SELECT h.id, h.success FROM hunts AS h
    ORDER BY h.hunt_date DESC
    LIMIT 4`))
    console.log(idResp)

    const resp = await Promise.all(idResp.map(async (el) => {
        const mosntersResp = await dbQuery(`
        SELECT hm.monster FROM hunts AS h
        INNER JOIN hunts_monsters AS hm ON h.id = hm.hunt_id
        WHERE h.id = ? AND hm.quest_target = 1`, [el.id])

        const playersResp = await dbQuery(`
        SELECT SUM(hp.carts) AS carts, SUM(hp.damage) AS damage FROM hunts AS h
        INNER JOIN hunts_players AS hp ON h.id = hp.hunt_id
        WHERE h.id = ?`, [el.id])
        return {
            success: el.success,
            monsters: mosntersResp.map(monster => monster.monster),
            carts: playersResp[0].carts,
            damage: playersResp[0].damage
        }
    }))
        res.status(200).json({ data: resp })
})

router.post('/addData', async (req, res) => {

    if(!res.locals.user.insertPerm) {
        res.status(403).json("No permissions to upload.")
        return
    }

    const data = new damageMeterParser(req.body)
    const players = data.getPlayers()
    const monsters = data.getAllMonsters()
    const questSuccess = data.getQuestSuccess()
    const huntDate = parseInt(req.body.date / 1000)

    const insertHunt = async (success, date) => {
        return await dbQuery('INSERT INTO hunts (success, hunt_date) VALUES (?, ?) RETURNING id;', [success, date])
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
})

export default router;