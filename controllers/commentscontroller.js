const router = require('express').Router();
const { models } = require('../models');
let validateJWT = require("../middleware/validate-session");

//! Routes based off of ../models/commentsmodel.js and associated with the videopost model
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
//! create a new comment for a specific video when the user submits a comment on the video when the user is logged in + validated
router.post("/:videoID", validateJWT, async (req, res) => {
    try {
        const { videoID } = req.params;
        const { commentText, commentUser } = req.body;
        const commentDate = new Date();
        const comment = await models.comments.create({
            commentText,
            commentDate,
            commentUser,
            commentVideoID: videoID,
            adminDelete: false,
            badActor: false,
        });
        res.status(201).json(comment);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//! update a comment for a specific video from a specific user when they're validated with ValidateJWT from validate-session.js
router.put("/:videoID/:commentID", validateJWT, async (req, res) => {
    try {
        const { videoID, commentID } = req.params;
        const { commentText, commentUser } = req.body;
        const commentDate = new Date();
        const comment = await models.comments.update({
            commentText,
            commentDate,
            commentUser,
            commentVideoID: videoID,
            adminDelete: false,
            badActor: false,
        }, {
            where: {
                commentID,
            }
        });
        res.status(201).json(comment);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//! delete a comment for a specific video from a specific user when they're validated with ValidateJWT from validate-session.js
router.delete("/:videoID/:commentID", validateJWT, async (req, res) => {
    try {
        const { videoID, commentID } = req.params;
        const comment = await models.comments.destroy({
            where: {
                commentID,
            }
        });
        res.status(201).json(comment);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//! get all comments for a specific video when the user is validated with ValidateJWT from validate-session.js
router.get("/:videoID", validateJWT, async (req, res) => {
    try {
        const { videoID } = req.params;
        const comments = await models.comments.findAll({
            where: {
                commentVideoID: videoID,
                adminDelete: false,
                badActor: false,
            }
        });
        res.status(201).json(comments);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//! delete all of a users comments if the person deleting them is an admin
// router.delete("/:videoID", validateJWT, async (req, res) => {
//     try {
//         const { videoID } = req.params;
//         const comments = await models.comments.destroy({
//             where: {
//                 commentVideoID: videoID,
//             }
//         });
//         res.status(201).json(comments);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });

module.exports = router;