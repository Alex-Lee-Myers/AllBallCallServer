const { DataTypes } = require("sequelize");
// import uuid
const uuid = require("uuid");
const db = require("../db");

const User = db.define("user", {
    uuid: {
        type: DataTypes.UUID,
        // primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        required: true,
        unique: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    passwordhash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    accountResetQuestion1: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    accountResetQuestion2: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    accountResetAnswer1: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    accountResetAnswer2: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = User;
