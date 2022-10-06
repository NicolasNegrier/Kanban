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
    lbl_dpt_id: DataTypes.INTEGER,
}, {
    sequelize,
    createdAt: 'lbl_createdat',
    updatedAt: 'lbl_updatedat',
    tableName: 'k_label',
}
);

module.exports = Label;