// code to build and initialize DB goes here
const {
  client
  // other db methods 
} = require('./client');
const { createLink } = require('./links');

async function buildTables() {
  try {
    await client.connect();

    // drop tables in correct order
    await client.query(`
      DROP TABLE IF EXISTS link_tags CASCADE;
      DROP TABLE IF EXISTS tags CASCADE;
      DROP TABLE IF EXISTS links CASCADE; 
    `)

    // build tables in correct order
    await client.query(`

      CREATE TABLE links (
        id SERIAL PRIMARY KEY,
        link_name VARCHAR(255) NOT NULL UNIQUE,
        click_count BIGINT,
        comment VARCHAR(255),
        date DATE NOT NULL DEFAULT CURRENT_DATE
      );
    
      CREATE TABLE tags (
        id SERIAL PRIMARY KEY,
        tag_name VARCHAR(255) NOT NULL UNIQUE
      );

      CREATE TABLE link_tags (
        id SERIAL PRIMARY KEY,
        "linksId" INT REFERENCES links(id) ON DELETE CASCADE NOT NULL,
        "tagsId" INT REFERENCES tags(id) ON DELETE CASCADE NOT NULL,
        UNIQUE ("linksId", "tagsId")
      );
    `);

  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    await createLink({
      linkName: 'www.espn.com',
      clickCount: 0, 
      comment: 'I love sports',
      tags: ['sports', 'entertainment'] });
    await createLink({
      linkName: 'www.google.com',
      clickCount: 0, 
      comment: 'OK Google',
      tags: ['search', 'information'] });
    await createLink({
      linkName: 'www.github.com',
      clickCount: 0, 
      comment: 'Check out my repo!',
      tags: ['version control'] });
    
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());