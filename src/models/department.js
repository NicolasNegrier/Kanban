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
    createdAt: 'dpt_createdAt',
    updatedAt: 'dpt_updatedAt',
    tableName: 'department',
}
);

module.exports = Department;