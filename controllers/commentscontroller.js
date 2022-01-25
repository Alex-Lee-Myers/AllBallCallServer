const router = require('express').Router();
const { models } = require('../models');
let validateJWT = require("../middleware/validate-session");

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