import dbQuery from "../configs/database.js"

const monsters = async (req, res) => {

    const removeBigInt = (obj) => {
        return JSON.parse(JSON.stringify(obj, (key, value) =>
            typeof value === 'bigint'
                ? value.toString()
                : value // return everything else unchanged
        ));
    }

    const type = req.query.type
    const name = req.query?.name

    let resp = {}
    switch (type) {
        case 'mostHunted':
            resp = removeBigInt(await dbQuery('SELECT COUNT(*) AS "Count", Monster FROM hunts_monsters GROUP BY monster ORDER BY COUNT DESC LIMIT 1'))
            break;
        case 'carts':
            if (name) { 
                resp = await dbQuery('SELECT SUM(carts) AS "Carts", players.name FROM hunts_players INNER JOIN players ON players.id = hunts_players.player WHERE players.name = ?', [name])
            } else {
                resp = await dbQuery('SELECT SUM(carts) AS "Carts", players.name FROM hunts_players INNER JOIN players ON players.id = hunts_players.player GROUP BY players.name')
            }
            break;
        case 'questStats':
            resp = removeBigInt(await dbQuery('SELECT COUNT(*) AS "Count", success FROM hunts GROUP BY success'))
            break;
        case 'faintsOverTime':
            resp = removeBigInt(await dbQuery(
                `SELECT sum(hp.carts) AS "carts", p.name, h.hunt_date FROM players AS p
                INNER JOIN hunts_players AS hp ON p.id = hp.player
                INNER JOIN hunts AS h ON hp.hunt_id = h.id
                WHERE p.name = ?
                GROUP BY h.hunt_date`, [name]
            ))
            break;
        default:
            res.status(400).json('Unknown option')
            break;
    }
    console.log(resp)
    // const resp = await dbQuery('SELECT * FROM hunts_monsters WHERE monster = ?', [monsterId])
    res.status(200).json({data: resp})
}


export default monsters