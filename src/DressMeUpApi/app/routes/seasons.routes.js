module.exports = app => {
  const season = require("../controllers/seasons.controller");
  var router = require("express").Router();
  
  // Create a new season
  router.post("/", season.create);

  // Retrieve all seasons
  router.get("/", season.getAllSeasons);

  // Retrieve season by id
  router.get("/:id", season.getSeasonById);

  // Delete season with id
  router.delete("/:id", season.deleteSeason);

  // Update season
  router.put("/:id", season.updateSeason);

  app.use('/api/seasons', router);
  }