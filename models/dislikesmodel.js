// const {DataTypes} = require("sequelize");
// const db = require("../db");

// const DislikesOnVideo = db.define("dislikesonvideo", {
//     dislikeID: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         allowNull: false,
//     },
//     dislikeUser: {
//         type: DataTypes.UUID,
//         allowNull: false,
//     },
//     dislikeVideo: {
//         type: DataTypes.UUID,
//         allowNull: false,
//     },
//     dislikeDate: {
//         type: DataTypes.DATE,
//         allowNull: false,
//     },
//     adminDelete: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false,
//     },
//     badActor: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false,
//     }
// });

// module.exports = DislikesOnVideo;