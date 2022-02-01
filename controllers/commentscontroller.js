const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-session");
const { CommentsModel } = require('../models');

//! create a new comment for a specific video when the user submits a comment on the video when the user is logged in + validated
router.post("/:videoID", validateJWT, async (req, res) => {
    const {
        commentText
    } =
        req.body.comments;

    const videoID = req.params.videoID;
    const userId = req.user.id;
    const commentDate = new Date();

    try {
        const commentSuccess = await CommentsModel.create
        ({
            commentText: commentText,
            commentDate: commentDate,
            videopostVideoID: videoID,
            userId: userId
        });
        res.status(201).json({
            message: "Comment created!",
            comment: commentSuccess,
        });
    } catch (err) {
        res.status(500).json({
            messageError: `Error message is: ${err}`,
            message: "Failed to create the Comment!",
        });
    }
});

//! get a single comment from a specific video when the user is logged in + validated
router.get("/:videoID/:commentID", validateJWT, async (req, res) => {
    const videoID = req.params.videoID;
    const commentID = req.params.commentID;

    try {
        const commentSuccess = await CommentsModel.findOne({
            where: {
                videopostVideoID: videoID,
                commentID: commentID
            }
        });
        res.status(200).json({
            message: "Comment found!",
            comment: commentSuccess,
        });
    } catch (err) {
        res.status(500).json({
            messageError: `Error message is: ${err}`,
            message: "Failed to find the Comment!",
        });
    }
});


//! update a comment for a specific video from a specific user when they're validated with ValidateJWT from validate-session.js
router.put("/:videoID/:commentID", validateJWT, async (req, res) => {
    const { commentText } = req.body.comments;
    
    const videoID = req.params.videopostVideoID;
    const { commentID } = req.params;
    const commentDate = new Date();

    try {
        const commentSuccess = await CommentsModel.update
        ({
            commentText: commentText,
            commentDate: commentDate
        },
        {
            where: {
                commentID: commentID
            }
        });
        res.status(201).json({
            message: "Comment updated!",
            comment: commentSuccess,
        });
    } catch (err) {
        res.status(500).json({
            messageError: `Error message is: ${err}`,
            message: "Failed to update the Comment!",
        });
    }
});

//! delete a comment for a specific video from a specific user when they're validated with ValidateJWT from validate-session.js
router.delete("/:videoID/:commentID", validateJWT, async (req, res) => {
    const { commentID } = req.params;
    const videoID = req.params.videopostVideoID;

    try {
        const commentSuccess = await CommentsModel.destroy
        ({
            where: {
                commentID: commentID,
                videopostVideoID: videoID
            }
        });
        res.status(201).json({
            message: "Comment deleted!",
            comment: commentSuccess,
        });
    } catch (err) {
        res.status(500).json({
            messageError: `Error message is: ${err}`,
            message: "Failed to delete the Comment!",
        });
    }
});

//! get all comments for a specific video when the user is validated with ValidateJWT from validate-session.js
router.get("/:videoID", validateJWT, async (req, res) => {
    const videoID = req.params.videoID;

    try {
        const allComments = await CommentsModel.findAll
        ({
            where: {
                videopostVideoID: videoID
            }
        });
        res.status(200).json({
            message: "All comments for a specific video!",
            allComments,
        });
    } catch (err) {
        res.status(500).json({
            messageError: `Error message is: ${err}`,
            message: "Failed to get all comments for a specific video!",
        });
    }
});

//! delete all of a users comments if the person deleting them is an admin
router.delete("/:userID", validateJWT, async (req, res) => {
    const { userId } = req.params;

    try {
        const commentsSuccess = await CommentsModel.destroy
        ({
            where: {
                userID: userId
            }
        });
        res.status(201).json({
            message: "All comments for a specific user!",
            comments: commentsSuccess,
        });
    } catch (err) {
        res.status(500).json({
            messageError: `Error message is: ${err}`,
            message: "Failed to get all comments for a specific user!",
        });
    }
});

module.exports = router;