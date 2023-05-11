module.exports = (sequelize, Sequelize) => {
  const Fabric = sequelize.define("Fabric", {
      name: {
          type: Sequelize.STRING
      }
  },{ 
    timestamps: false 
  });

  Fabric.associate = function(models) {
      Fabric.belongsToMany(models.clothes, { through: 'ClothesFabrics', timestamps: false });
  }

  return Fabric;
};