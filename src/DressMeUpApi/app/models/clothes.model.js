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

  Clothes.associate = function (models) {
    Clothes.belongsToMany(models.outfits, {
      as: 'outfits',
      through: 'clothesOutfits',
      timestamps: false,
      onDelete: 'SET NULL',
      foreignKey: { allowNull: true }
    });
    Clothes.belongsToMany(models.colors, { as: 'colors', through: 'clothesColors', timestamps: false, onDelete: 'CASCADE' });
    Clothes.belongsToMany(models.fabrics, { as: 'fabrics', through: 'clothesFabrics', timestamps: false, onDelete: 'CASCADE' });
    Clothes.belongsToMany(models.seasons, { as: 'seasons', through: 'clothesSeasons', timestamps: false, onDelete: 'CASCADE' });
    Clothes.belongsToMany(models.filterTags, { as: 'filterTags', through: 'clothesFilterTags', timestamps: false, onDelete: 'CASCADE' });
  }

  return Clothes;
};




/*  Postman example new:
{
    "clothesType": 1,
    "brand": "Abrand",
    "image": "",
    "name": "t-shirt 23",
    "outfits": [],
    "colors": [
        1,2,3
    ],
    "fabrics": [
        2
    ],
    "seasons": [
        1
    ],
    "filterTags": [
        1
    ]
}
*/