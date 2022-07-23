import { createPool } from "mariadb";


const dbQuery = async (query, placeholders) => {
    try {
        const db = createPool({
            host: process.env.MARIADB_HOST,
            user: process.env.MARIADB_USER,
            password: process.env.MARIADB_PASSWORD,
            database: process.env.MARIADB_DB,
            checkDuplicate: false,
            multipleStatements: true
        });

        const resp = await db.query(query, placeholders);
        await db.end();
        return resp;
    } catch (error) {
        console.error(error)
    }
}
// export const dbQueryNamed = async (query, params) => {
//     try {
//         const db = createPool({
//             host: process.env.MARIADB_HOST,
//             user: process.env.MARIADB_USER,
//             password: process.env.MARIADB_PASSWORD,
//             database: process.env.MARIADB_DB,
//             checkDuplicate: false
//         });

//         const resp = await db.query({
//             namedPlaceholders: true,
//             query
//         },
//             { params }
//         );
//         await db.end();
//         return resp;
//     } catch (error) {
//         console.error(error)
//     }
// }

export default dbQuery