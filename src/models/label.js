const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');


class Label extends Model {};

Label.init({
    lbl_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    lbl_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: '',
    },
}, {
    sequelize,
    createdAt: 'lbl_createdAt',
    updatedAt: 'lbl_updatedAt',
    tableName: 'label',
}
);

module.exports = Label;