module.exports = (sequelize, Sequelize) => {
    const Outfit = sequelize.define("Outfit", {
        likes: {
            type: Sequelize.INTEGER
        },
        dislikes: {
            type: Sequelize.INTEGER
        }
    });

    Outfit.associate = function(models) {
        Outfit.belongsToMany(models.clothes, { as: 'clothes', through: 'clothesOutfits', timestamps: false, onDelete: 'CASCADE' })
    }

    return Outfit;
};