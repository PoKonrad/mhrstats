import dbQuery from "../configs/database.js"

const monsters = async (req, res) => {
    const monsterId =  req.query.name

    if (req?.query?.count) {
            const resp = await dbQuery('SELECT COUNT(monster) AS "Count", Monster FROM hunts_monsters WHERE monster = ?', [monsterId])

        const json = JSON.stringify(resp, (key, value) =>
            typeof value === "bigint" ? value.toString() + "n" : value
        );
        res.status(200).json(json)
        return
    }
    
    const resp = await dbQuery('SELECT * FROM hunts_monsters WHERE monster = ?', [monsterId])
    res.status(200).raw(resp)
}


export default monsters