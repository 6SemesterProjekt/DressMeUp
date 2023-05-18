const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  dbConfig.DB, 
  dbConfig.USER, 
  dbConfig.PASSWORD, 
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.clothes = require("./clothes.model.js")(sequelize,Sequelize);
db.outfits = require("./outfit.model.js")(sequelize,Sequelize);
db.colors = require("./color.model.js")(sequelize,Sequelize);
db.fabrics = require("./fabric.model.js")(sequelize,Sequelize);
db.seasons = require("./season.model.js")(sequelize,Sequelize);
db.filterTags = require("./filterTag.model.js")(sequelize,Sequelize);
db.users = require("./user.model.js")(sequelize,Sequelize);
db.userOutfits = require("./userOutfit.model.js")(sequelize,Sequelize);

Object.keys(db).forEach(modelName =>{
  if (db[modelName].associate){
    db[modelName].associate(db);
  }
})

module.exports = db;
