// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'linkerator'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods
// CREATE
const createLink = async (linkName, clickCount, comment) => {
  try {
    const { rows } = await client.query(`
      INSERT INTO links (link_name, click_count, comment)
      VALUES ($1, $2, $3)
      ON CONFLICT (link_name) DO NOTHING
      RETURNING *;
    `, [linkName, clickCount, comment]);

    return rows;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}

const createTag = async () => {

}

const createLinkTag = async () => {
  
}

// READ
const getLinkById = linkId => {
  try {
    const { rows: [ link ] } = await client.query(`
      SELECT *
      FROM links
      WHERE id = $1;
    `, [linkId]);

    if (!link) {
      throw {
        name: "LinkNotFoundError",
        message: "Could not find link with that linkId"
      };
    }

    const { rows: tags } = await client.query(`
      SELECT tags.*
      FROM tags
      JOIN link_tags ON tags.id=link_tags."tagId"
      WHERE link_tags."linkId"=$1;
    `, [linkId]);

    link.tags = tags;

    return link;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}

const getAllLinks = async () => {
  try {
    const { rows: linkIds } = await client.query(`
      SELECT id
      FROM links
    `);

    const links = await Promise.all(linkIds.map(
      link => getLinkById(link.id)
    ));

    return links;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}

const getAllTags = async () => {
  try {
    const { rows: tags } = await client.query(`
      SELECT *
      FROM tags;
    `)

    return tags;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}

const getLinkByTagName = tagName => {
  try {
    const { rows: linkIds } = await client.query(`
      SELECT links.id
      FROM links
      JOIN link_tags ON links.id=link_tags."linkId"
      JOIN tags ON tags.id=link_tags."tagsId"
      WHERE tags.name=$1;
    `, [tagName]);

    return await Promise.all(linkIds.map(
      link => getLinkById(link.id)
    ));
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}
// UPDATE
// DELETE


// export
module.exports = {
  client,
  // db methods
}