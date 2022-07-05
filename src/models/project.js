const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');


class Project extends Model {};

Project.init({
    prj_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    prj_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    prj_description: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    prj_dpt_id: DataTypes.INTEGER,
}, {
    sequelize,
    createdAt: 'prj_createdAt',
    updatedAt: 'prj_updatedAt',
    tableName: 'project',
}
);

module.exports = Project;