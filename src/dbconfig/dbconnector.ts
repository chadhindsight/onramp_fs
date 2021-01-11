// const {Pool} = require('pg');
// const dotenv = require('dotenv');
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config()

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
})

// pool.connect() maybe?

// DB QUERY
// pool.query('SELECT * FROM posts', (error, results) => {
//   if (!error) {
//   console.log(results.rows)
//   }
//   // pool.end()
// })

export default pool