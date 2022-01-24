const { DataTypes, Sequelize } = require("sequelize");
const db = require("../db");
// const teamsArray = require("./teamsArray")

//! Creating my own DataTypes for TeamsArray

// class TeamArrayValidator extends DataTypes.ABSTRACT {
//         //! This is where I am going to validate the teamsArray
//         //! It must contain a valid team from the teamsArray array
//         //! It can contain multiple teams
//         //! It can contain no teams
//     toSql() {
//         return `ARRAY[${this.map(team => `'${team}'`).join(",")}]`;
//     }

//     isValidTeamArray(value) {
//         //! I am going to check if the value is an array
//         if (Array.isArray(value)) {
//             //! If it is an array I am going to check if it contains valid teams
//             for (let i = 0; i < value.length; i++) {
//                 //! I am going to check if the value is a string
//                 if (typeof value[i] === "string") {
//                     //! If it is a string I am going to check if it is a valid team
//                     if (teamsArray.includes(value[i])) {
//                         //! If it is a valid team I am going to return true
//                         return true;
//                     } else {
//                         //! If it is not a valid team I am going to return false
//                         return false;
//                     }
//                 } else {
//                     //! If it is not a string I am going to return false
//                     return false;
//                 }
//             }
//         } else {
//             //! If it is not an array I am going to return false
//             return false;
//         }
//     }
// }

// // Manadatory, set key
// const TeamArray = new TeamArrayValidator(DataTypes.ARRAY(DataTypes.STRING), {
//     validate: {
//         isValidTeamArray: function (value) {
//             if (!this.isValidTeamArray(value)) {
//                 throw new Error("Invalid team array");
//             }
//         }
//     }
// });

// //  For convenience, 'classToInvokable' allows you to use the datatype without 'new'
// TeamArray.classToInvokable = TeamArray;


const VideoPost = db.define("videopost", {
    videoID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
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
    thumbnailImage: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    // an array of strings that are optional
    playersHighlighted: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true,
    },
    teamsFeatured: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true,
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
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    videoOwner: {
        type: DataTypes.UUID,
        allowNull: false
    },
});

module.exports = VideoPost;