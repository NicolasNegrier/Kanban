const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');


class Card extends Model {};

Card.init({
    crd_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    crd_description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    crd_position: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0,
    },
    crd_lst_id: DataTypes.INTEGER,
}, {
    sequelize,
    createdAt: 'crd_createdat',
    updatedAt: 'crd_updatedat',
    tableName: 'k_card',
}
);

module.exports = Card;