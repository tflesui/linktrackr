const linksRouter = require('express').Router();
const { 
    getAllLinks,
    getAllLinkTags,
    getLinkById,
    createLink,
    deleteLink
} = require('../db');

// get all links
linksRouter.get('/', async (req, res, next) => {
    const links = await getAllLinks();

    res.send({ links });
});

// get single link
linksRouter.get('/:linkId', async (req, res, next) => {
    const { linkId } = req.params;
    const link = await getLinkById(linkId);
    res.send({ link });
})

// get all tags for a link
linksRouter.get("/:linkId/tags", async (req, res, next) => {
    try {
        const { linkId } = req.params;

        const link = await getLinkById(linkId);
        const { tags } = link;
      
        res.send(tags.map(tag => {
            return tag.tag_name;
            })
        );
    } catch (err) {
        console.error(err.message)
        throw err;
    }
});

// create a link
linksRouter.post('/create', async (req, res, next) => {
    let { link } = req.body; 
    link = {
        ...link,
        clickCount: 0
    }

    await createLink(link);

    res.sendStatus(200);
})

// update a link
// delete a link
linksRouter.delete('/:id', async (req, res, next) => {
    const { id } = req.params;

    await deleteLink(id);

    res.sendStatus(200);
})
  
  module.exports = linksRouter;