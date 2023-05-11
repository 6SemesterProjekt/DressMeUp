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
        Outfit.hasMany(models.clothes)
    }

    return Outfit;
};