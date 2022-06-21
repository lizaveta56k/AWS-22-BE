const pg = require('pg')

//Get Database info from environment variable
const PGHOST = process.env.PGHOST;
const PGUSER = process.env.PGUSER;
const PGDATABASE = process.env.PGDATABASE;
const PGPASSWORD = process.env.PGPASSWORD;
const PGPORT = parseInt(process.env.PGPORT, 10);

const pool = new pg.Pool({
    user: PGUSER,
    host: PGHOST,
    database: PGDATABASE,
    password: PGPASSWORD,
    port: PGPORT,
})

export const query = async (q) => {
    const client = await pool.connect()
    let res
    try {
        await client.query('BEGIN')
        try {
            res = await client.query(q)
            await client.query('COMMIT')
        } catch (err) {
            await client.query('ROLLBACK')
            throw err
        }
    } finally {
        client.release()
    }
    return res
}

// module.exports.handle = async (event, context, callback) => {
//     try {
//         const { rows } = await query("SELECT CONCAT(first_name,' ', last_name) AS \"Full Name\" FROM actor LIMIT 10")
//         console.log(JSON.stringify(rows[0]))
//         var response = {
//             "statusCode": 200,
//             "headers": {
//                 "Content-Type": "application/json"
//             },
//             "body": JSON.stringify(rows),
//             "isBase64Encoded": false
//         };
//         callback(null, response);
//     } catch (err) {
//         //handling errors
//         console.log('Database ' + err)
//         callback(null, 'Database ' + err);
//     }
// };