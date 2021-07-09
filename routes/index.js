const linksRouter = require('./links');
const tagsRouter = require('./tags');

const apiRouter = require('express').Router();

apiRouter.use('/links', linksRouter);

apiRouter.use('/tags', tagsRouter);


module.exports = apiRouter;
