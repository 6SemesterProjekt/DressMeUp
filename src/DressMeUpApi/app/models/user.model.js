module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define("User", {

        email: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                customValidator(value) {
                  if (value === null && this.phoneNumber === null) {
                    throw new Error("Email must be provided");
                  }
                },
            },
            unique: true
        },
        
        phoneNumber: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                customValidator(value) {
                  if (value === null && this.email === null) {
                    throw new Error("Phone number must be provided");
                  }
                },
            },
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        fullName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        admin: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    User.associate = function(models) {
        User.hasMany(models.clothes, { as: 'clothes', onDelete: 'CASCADE', foreignKey: 'userId'});
    }

    User.associate = function(models) {
        User.belongsToMany(models.outfits, { 
          as: 'outfits',
          through: models.userOutfits, 
          onDelete: 'CASCADE',
          foreignKey: 'userId'
        });
    }

    return User;
};
