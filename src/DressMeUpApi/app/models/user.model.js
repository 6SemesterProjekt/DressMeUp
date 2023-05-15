import Clothes from "./clothes.model";
import Outfit from "./outfit.model";

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
                unique: true
            }
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
            },

            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },

            clothes: {
                type: Sequelize.ARRAY(Sequelize.INTEGER),
                allowNull: true,
                references: {
                    model: Clothes,
                    key: 'id'
                }
            },
            outfits: {
                type: Sequelize.ARRAY(Sequelize.INTEGER),
                allowNull: true,
                references: {
                    model: Outfit,
                    key: 'id'
                }
            },
            followers: {
                type: Sequelize.ARRAY(Sequelize.INTEGER),
                allowNull: true,
                references: {
                    model: User,
                    key: 'id'
                }
            },
            following: {
                type: Sequelize.ARRAY(Sequelize.INTEGER),
                allowNull: true,
                references: {
                    model: User,
                    key: 'id'
                }
            },
            likedOutfits: {
                type: Sequelize.ARRAY(Sequelize.INTEGER),
                allowNull: true,
                references: {
                    model: Outfit,
                    key: 'id'
                }
            },
            dislikedOutfits: {
                type: Sequelize.ARRAY(Sequelize.INTEGER),
                allowNull: true,
                references: {
                    model: Outfit,
                    key: 'id'
                }
            },
            savedOutfits: {
                type: Sequelize.ARRAY(Sequelize.INTEGER),
                allowNull: true,
                references: {
                    model: Outfit,
                    key: 'id'
                }
            }
        }
    });

    return User;
};
