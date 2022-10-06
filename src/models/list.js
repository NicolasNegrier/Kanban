const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');


class List extends Model {};

List.init({
    lst_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    lst_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: '',
    },
    lst_position: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0,
    },
    lst_prj_id: DataTypes.INTEGER,
}, {
    sequelize,
    createdAt: 'lst_createdat',
    updatedAt: 'lst_updatedat',
    tableName: 'k_list',
}
);

module.exports = List;