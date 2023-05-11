module.exports = (sequelize, Sequelize) => {
  const Clothes = sequelize.define("Clothes", {
    clothesType: {
      type: Sequelize.INTEGER
    },
    brand: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    }
  });

  Clothes.associate = function(models) {
    Clothes.belongsToMany(models.outfits, { through: 'ClothesOutfits', timestamps: false } );
    Clothes.belongsToMany(models.colors, { through: 'ClothesColors', timestamps: false });
    Clothes.belongsToMany(models.fabrics, { through: 'ClothesFabrics', timestamps: false });
    Clothes.belongsToMany(models.seasons, { through: 'ClothesSeasons', timestamps: false });
    Clothes.belongsToMany(models.filterTags, { through: 'ClothesFilterTags', timestamps: false });
  }

  return Clothes;
};