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

const getAllLinkTags = async linkId => {
    try {
        const { rows } = await client.query(`
            SELECT t.tag_name as "tagName"
            FROM link_tags as lt
            JOIN links as l ON lt."linksId" = (
                SELECT id FROM links WHERE id = $1 LIMIT 1
            )
            JOIN tags as t ON t.id = lt."tagsId";
        `, [linkId]);
        
        console.log('linkId', linkId);
        console.log('rows',  rows.length  );

        return rows; 
    } catch (err) {
        console.error(err.message);
        throw err;
    }
};
// UPDATE
// DELETE

module.exports = {
    createLinkTag,
    getLinkTagById,
    getAllLinkTags
}