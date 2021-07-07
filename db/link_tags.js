const { client } = require('./client');

// database methods
// CREATE

const createLinkTag = async (linkId, tagId) => {
    try {
        await client.query(`
            INSERT INTO link_tags("linksId", "tagsId")
            VALUES ($1, $2)
            ON CONFLICT ("linksId", "tagsId") DO NOTHING;
        `, [linkId, tagId]);
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}


// READ

const getLinkTagById = async id => {
    try {
        const { rows: [ link_tag ] } = await client.query(`
            SELECT *
            FROM link_tags
            WHERE id=$1;
        `, [ id ]);

        return link_tag;
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

// UPDATE
// DELETE

module.exports = {
    createLinkTag,
    getLinkTagById
}