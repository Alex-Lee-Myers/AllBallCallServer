const { DataTypes } = require("sequelize");
const db = require("../db");

const Comments = db.define("comments", {
    commentID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    commentText: {
        type: DataTypes.TEXT,
        required: true,
        allowNull: false,
    },
    commentDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    adminDelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    badActor: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
});

module.exports = Comments;