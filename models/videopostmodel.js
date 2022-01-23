const { DataTypes } = require("sequelize");
const db = require("../db");

const VideoPost = db.define("videopost", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    videoID: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    videoTitle: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    videoLink: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    videoOwner: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    thumbnailImage: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    // an array of strings that are optional
    playersHighlighted: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true,
    },
    // teamsFeatured which is array of string with a max of 2
    teamsFeatured: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true,
        validate: {
            len: [0, 2]
        }
    },
    // tags which is an array of strings
    tags: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true,
    },
    // gameDate which is a date format for when the game is played
    gameDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    //nbaSeason which is a string with a format of YYYY-YYYY
    nbaSeason: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    // isPlayoffs which is a boolean value
    isPlayoffs: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    // clutch which is a boolean value
    clutch: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    // adminHighlighted which is a boolean value
    adminHighlighted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    adminDelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = VideoPost;
