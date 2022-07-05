const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');


class User extends Model {};

User.init({
    usr_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    usr_firstName: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    usr_lastName: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    usr_mail: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    usr_pwd: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    usr_role: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: '',
    },
    usr_dpt_id: DataTypes.INTEGER,
}, {
    sequelize,
    createdAt: 'usr_createdAt',
    updatedAt: 'usr_updatedAt',
    tableName: 'user',
}
);

module.exports = User;