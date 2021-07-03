// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'linkerator'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods
const insertLink = async (linkName, clickCount, comment) => {
  try {
    const { rows } = await client.query(`
      INSERT INTO links (link_name, click_count, comment)
      VALUES ($1, $2, $3)
      ON CONFLICT (link_name) DO NOTHING
      RETURNING *;
    `, [linkName, clickCount, comment]);

    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const insertTag = async () => {

}

const insertLinkTag = async () => {
  
}
// export
module.exports = {
  client,
  // db methods
}