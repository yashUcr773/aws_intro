const { Client } = require('pg');

// Replace with your AWS RDS PostgreSQL details
const client = new Client({
    user: 'postgres',
    host: 'database-1.cn6aeyce6wqh.us-west-2.rds.amazonaws.com',

    password: 'postgres',
    port: 5432, // Default PostgreSQL port
    ssl: {
        rejectUnauthorized: false, // Set to true if using a valid SSL certificate
    },
});

const names = ['a a', 'b b', 'c c', 'd d']

async function main() {
    try {
        await setupDB()
        // await createTable()
        // for (let i = 0; i < names.length; i++) {
        //     await insertData(names[i], `${names[i]}@gmail.com`)
        // }
        await getData()
    } catch (err) {
        console.error('Error executing query', err);
    } finally {
        await client.end();
        console.log('Disconnected from database');
    }
}

main();

async function setupDB() {
    try {
        await client.connect();
        console.log('Connected To DB')
    } catch (e) {
        console.log('Error connecting DB', e)
    }
}

async function createTable() {
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
              id SERIAL PRIMARY KEY,
              name VARCHAR(100),
              email VARCHAR(100) UNIQUE
            );
          `);
        console.log('Table created successfully');
    } catch (e) {
        console.log('Error creating Table', e)
    }
}

async function insertData(name = 'Jane Doe', email = 'jane.doe@example.com') {
    try {
        await client.query(
            `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *;`,
            [name, email]
        );
        console.log('Data inserted successfully');
    } catch (e) {
        console.log('Error inserting Data', e)
    }
}

async function getData() {
    try {
        const res = await client.query('SELECT * FROM users;');
        console.log('Users:', res);
    } catch (e) {
        console.log('Error fetching Data', e)
    }
}