const tagsRouter = require('express').Router();
const { getAllTags } = require('../db');

tagsRouter.get('/', async (req, res, next) => {
    const tags = await getAllTags();

    res.send({ tags })
})

// create a link
// delete a link

module.exports = tagsRouter;