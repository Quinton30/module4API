require('dotenv').config(); // Load environment variables

const { Pool } = require('pg');

//credentials for the database on render
/*const pool = new Pool({
    user: 'students_fqe5_user',
    host: 'cvi01adrie7s73ebi45g-a.oregon-postgres.render.com',
    database: 'students_fqe5',
    password: 'Rqur05qinOVXKi1EEbi3wE8XOAHczozY',
    port: 5432,
    ssl: {
        rejectUnauthorized: false,
    }
}); Database expired */

const pool = new Pool({
  user: 'postgres.auqsxkehosbvhviedypm',
  host: 'aws-0-us-east-2.pooler.supabase.com',
  database: 'postgres',
  password: '#5@w$MM5SdSG8CK',
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
})

module.exports = pool;
