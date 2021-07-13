const tagsRouter = require('express').Router();
const { getAllTags, createTag } = require('../db');
//  get All tags
tagsRouter.get('/', async (req, res, next) => {
    const tags = await getAllTags();

    res.send({ tags })
})

// create a tag
tagsRouter.post('/create', async (req, res, next) => {
    const { tag } = req.body;

    console.log('tag', tag)

    await createTag(tag.tagName)

    res.sendStatus(200);
})
// delete a tag

module.exports = tagsRouter;