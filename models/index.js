const db = require('../db');

const UserModel = require('./usermodel');
const VideoPostModel = require('./videopostmodel');
const CommentsModel = require('./commentsmodel');

//? usermodel.js:
// const User = db.define("user", {
//     uuid: {
//         type: DataTypes.UUID,
//         // primaryKey: true,
//         defaultValue: DataTypes.UUIDV4,
//         allowNull: false,
//     },
//     username: {
//         type: DataTypes.STRING,
//         required: true,
//         unique: true,
//         allowNull: false,
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//         validate: {
//             isEmail: true,
//         }
//     },
//     passwordhash: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     isAdmin: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false,
//     },
//     accountResetQuestion1: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     accountResetQuestion2: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     accountResetAnswer1: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     accountResetAnswer2: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     // the videos that the user has uploaded
//     videos: {
//         type: DataTypes.ARRAY(DataTypes.UUID),
//         allowNull: true,
//     },
//     // the comments that the user has made
//     comments: {
//         type: DataTypes.ARRAY(DataTypes.UUID),
//         allowNull: true,
//     }
// });

//? commentsmodel.js:
// const Comments = db.define("comments", {
//     commentID: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         allowNull: false,
//     },
//     commentText: {
//         type: DataTypes.TEXT,
//         required: true,
//         allowNull: false,
//     },
//     commentDate: {
//         type: DataTypes.DATE,
//         allowNull: false,
//     },
//     commentUser: {
//         type: DataTypes.UUID,
//         allowNull: false,
//     },
//     commentVideoID: {
//         type: DataTypes.UUID,
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

//? videopostmodel.js:
// const VideoPost = db.define("videopost", {
//     videoID: {
//         type: DataTypes.UUID,
//         // primaryKey: true,
//         defaultValue: DataTypes.UUIDV4,
//         allowNull: false,
//     },
//     videoTitle: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
//     videoLink: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
//     username: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     videoOwner: {
//         type: DataTypes.UUID,
//         allowNull: false,
//     },
//     thumbnailImage: {
//         type: DataTypes.TEXT,
//         allowNull: true,
//     },
//     // an array of strings that are optional
//     playersHighlighted: {
//         type: DataTypes.ARRAY(DataTypes.TEXT),
//         allowNull: true,
//     },
//     teamsFeatured: {
//         type: DataTypes.ARRAY(DataTypes.TEXT),
//         allowNull: true,
//     },
//     // tags which is an array of strings
//     tags: {
//         type: DataTypes.ARRAY(DataTypes.TEXT),
//         allowNull: true,
//     },
//     // gameDate which is a date format for when the game is played
//     gameDate: {
//         type: DataTypes.DATE,
//         allowNull: true,
//     },
//     //nbaSeason which is a string with a format of YYYY-YYYY
//     nbaSeason: {
//         type: DataTypes.STRING,
//         allowNull: true,
//     },
//     // isPlayoffs which is a boolean value
//     isPlayoffs: {
//         type: DataTypes.BOOLEAN,
//         allowNull: true,
//     },
//     // clutch which is a boolean value
//     clutch: {
//         type: DataTypes.BOOLEAN,
//         allowNull: true,
//     },
//     // adminHighlighted which is a boolean value
//     adminHighlighted: {
//         type: DataTypes.BOOLEAN,
//         allowNull: true,
//         defaultValue: false,
//     },
//     adminDelete: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false,
//     },
//     // comments which is associated with a videopost and is an array of objects with a commentText, commentDate, commentUser, commentVideoID, adminDelete, and badActor
//     comments: {
//         type: DataTypes.ARRAY(DataTypes.JSON),
//         allowNull: true,
//     }  
// });


//! Types of associations:
//? 1. HasMany
//? 2. BelongsTo
//? 3. HasOne
//? 4. BelongsToMany

module.exports = {UserModel, VideoPostModel, CommentsModel};