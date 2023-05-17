module.exports = (sequelize, Sequelize) => {
  const Season = sequelize.define("Season", {
      name: {
          type: Sequelize.STRING
      }
  },{ 
    timestamps: false 
  });

  Season.associate = function(models) {
      Season.belongsToMany(models.clothes, { through: 'ClothesSeasons', timestamps: false, onDelete: 'CASCADE' });
  }

  return Season;
};