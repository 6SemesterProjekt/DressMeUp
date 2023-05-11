module.exports = (sequelize, Sequelize) => {
  const Color = sequelize.define("Color", {
      name: {
          type: Sequelize.STRING
      }
  },{ 
    timestamps: false 
  });

  Color.associate = function(models) {
      Color.belongsToMany(models.clothes, { through: 'ClothesColors', timestamps: false });
  }

  return Color;
};