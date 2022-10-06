const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');


class Department extends Model {};

Department.init({
    dpt_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    dpt_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
}, {
    sequelize,
    createdAt: 'dpt_createdat',
    updatedAt: 'dpt_updatedat',
    tableName: 'k_department',
}
);

module.exports = Department;