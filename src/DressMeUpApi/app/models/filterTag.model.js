module.exports = (sequelize, Sequelize) => {
  const FilterTag = sequelize.define("FilterTag", {
      name: {
          type: Sequelize.STRING
      }
  },{ 
    timestamps: false 
  });

  FilterTag.associate = function(models) {
    FilterTag.belongsToMany(models.clothes, { through: 'ClothesFilterTags', timestamps: false, onDelete: 'CASCADE' });
  }

  return FilterTag;
};