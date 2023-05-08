module.exports = app => {
  const clothes = require("../controllers/clothes.controller");
  var router = require("express").Router();

  // Create a new clothes
  router.post("/", clothes.create);

  // Retrieve all clothes
  router.get("/", clothes.getAllClothes);

  // Retrieve clothes by id
  router.get("/:id", clothes.getClothesById);

  // Delete clothes with id
  router.delete("/:id", clothes.deleteClothes);

  // Update clothes
  router.put("/:id", clothes.updateClothes);

  app.use('/api/clothes', router);
}