module.exports = app => {
    const outfit = require("../controllers/outfit.controller");
    var router = require("express").Router();
  
    // Create a new outfit
    router.post("/", outfit.create);
  
    // Retrieve all outfits
    router.get("/", outfit.getAllOutfits);
  
    // Retrieve outfit by id
    router.get("/:id", outfit.getOutfitById);
  
    // Delete outfit with id
    router.delete("/:id", outfit.deleteOutfit);
  
    // Update outfit
    router.put("/:id", outfit.updateOutfit);
  
    app.use('/api/outfits', router);
  }