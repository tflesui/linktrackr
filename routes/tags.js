const tagsRouter = require('express').Router();
const { getAllTags } = require('../db');

tagsRouter.get('/', async (req, res, next) => {
    const tags = await getAllTags();

    res.send({ tags })
})

module.exports = tagsRouter;