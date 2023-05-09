module.exports = (sequelize, Sequelize) => {
    const Outfit = sequelize.define("Outfit", {
        likes: {
            type: Sequelize.INTEGER
        },
        dislikes: {
            type: Sequelize.INTEGER
        }
    });
    return Outfit;
};