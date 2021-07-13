const { client } = require('./client');

// database methods
// CREATE

const createTags = async tagList => {
    if (tagList.length === 0) return;

    const insertValues = tagList.map(
        (_, index) => `$${index + 1}`).join('), (');
    
    const selectValues = tagList.map(
        (_, index) => `$${index + 1}`).join(', ');

    try {
        await client.query(`
            INSERT INTO tags(tag_name)
            VALUES (${ insertValues })    
            ON CONFLICT (tag_name) DO NOTHING;    
        `, tagList);

        const { rows } = await client.query(`
            SELECT *
            FROM tags
            WHERE tag_name
            IN (${ selectValues });
        `, tagList);

        return rows;
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

const createTag = async tagName  => {
    try {
        const { rows : tag  } = await client.query(`
            INSERT INTO tags(tag_name)
            VALUES ($1)
            ON CONFLICT (tag_name) DO NOTHING;
        `, [tagName]);

        return tag;
    } catch (err) {
        console.error(err.message)
    }
}

// READ

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

const getTagById = async tagId => {
    try {
        const { rows: [ tag ] } = await client.query(`
            SELECT *
            FROM tags
            WHERE id=$1;
        `, [ tagId ]);

        return tag;
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

// UPDATE (needed?)

// DELETE
const deleteTag = async tagId => {
    try {
        const { rows: [ tag ] } = await client.query(`
            DELETE FROM tags
            WHERE id=$1
            RETURNING *;
        `, [ tagId ]);

        return tag;
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

module.exports = {
    createTags,
    createTag,
    getAllTags,
    getTagById,
    deleteTag
}