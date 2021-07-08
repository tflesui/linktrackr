const { getAllLinkTags } = require('../db/link_tags')
const apiRouter = require('express').Router();

// apiRouter.get("/", (req, res, next) => {
//   res.send({
//     message: "API is under construction!"
//   });
// });

apiRouter.get("/links/:linkId/tags", async (req, res, next) => {
  const { linkId } = req.params;

  const tags = await getAllLinkTags(linkId);
  console.log('tags:', tags)

  res.send({ tags });
});


module.exports = apiRouter;
