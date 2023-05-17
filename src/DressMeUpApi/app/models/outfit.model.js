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
        Outfit.belongsToMany(models.clothes, { 
            as: 'clothes', 
            through: 'clothesOutfits', 
            timestamps: false, 
            onDelete: 'CASCADE', 
            foreignKey: { 
                name: 'outfitId', 
                allowNull: true 
            }  
        })
    }

    Outfit.associate = function(models) {
        Outfit.belongsToMany(models.users, { 
            as: 'users', 
            through: models.userOutfits, 
            onDelete: 'CASCADE',
            foreignKey: { name: 'outfitId' }
        });
    }

    return Outfit;
};