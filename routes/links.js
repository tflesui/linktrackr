const linksRouter = require('express').Router();
const { getAllLinks } = require('../db');
const { getAllLinkTags } = require('../db')

linksRouter.get('/', async (req, res, next) => {
    const links = await getAllLinks();

    res.send({ links });
});

linksRouter.get("/:linkId/tags", async (req, res, next) => {
    try {
        const { linkId } = req.params;
  
        const  response = await getAllLinkTags(linkId);
        console.log('response', response)
        const  tagName = response;
        console.log('tags:', tagName)
      
        res.send({tagName});
    } catch (err) {
        console.error(err.message)
        throw err;
    }
  });
  
  module.exports = linksRouter;