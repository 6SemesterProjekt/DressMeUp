module.exports = app => {
  const color = require("../controllers/colors.controller");
  var router = require("express").Router();
  
  // Create a new color
  router.post("/", color.create);

  // Retrieve all colors
  router.get("/", color.getAllColors);

  // Retrieve color by id
  router.get("/:id", color.getColorById);

  // Delete color with id
  router.delete("/:id", color.deleteColor);

  // Update color
  router.put("/:id", color.updateColor);

  app.use('/api/colors', router);
  }