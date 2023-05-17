module.exports = app => {
  const filterTag = require("../controllers/filterTags.controller");
  var router = require("express").Router();
  
  // Create a new filterTag
  router.post("/", filterTag.create);

  // Retrieve all filterTags
  router.get("/", filterTag.getAllFilterTags);

  // Retrieve filterTag by id
  router.get("/:id", filterTag.getFilterTagById);

  // Delete filterTag with id
  router.delete("/:id", filterTag.deleteFilterTag);

  // Update filterTag
  router.put("/:id", filterTag.updateFilterTag);

  app.use('/api/filterTags', router);
  }