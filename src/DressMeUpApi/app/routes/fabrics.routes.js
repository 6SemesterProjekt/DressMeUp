module.exports = app => {
  const fabrics = require("../controllers/fabrics.controller");
  var router = require("express").Router();
  
  // Create a new fabric
  router.post("/", fabrics.create);

  // Retrieve all fabrics
  router.get("/", fabrics.getAllFabrics);

  // Retrieve fabric by id
  router.get("/:id", fabrics.getFabricById);

  // Delete fabric with id
  router.delete("/:id", fabrics.deleteFabric);

  // Update fabric
  router.put("/:id", fabrics.updateFabric);

  app.use('/api/fabrics', router);
  }