const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-session");
const { VideoPostModel } = require("../models");
const uuid = require("uuid");

//! GET all video posts, no need for ValidateJWT
router.get("/content/all", async (req, res) => {
    try {
        const allVideos = await VideoPostModel.findAll({
            where: {
                adminDelete: false,
            },
        });
        res.status(200).json({
            message: "All Video Posts!",
            allVideos,
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to get all Video Posts!",
            errorMessage: `Error message is: ${err}`
        });
    }
});

//! Create Video Post
router.post("/content/", validateJWT, async (req, res) => {
    const {
        videoTitle,
        videoLink,
        // thumbnailImage,
        // playersHighlighted,
        // teamsFeatured,
        // tags,
        // gameDate,
        // nbaSeason,
        // isPlayoffs,
        // clutch
    } =
        req.body.videopost;

    const videoIDcreateUUID = uuid.v4();
    // backticks look like this: `${variable}`
    // console.log(`videoOwner UUID is the following: ${videoOwnerUUID} and has the type of ${typeof videoOwnerUUID}`);
    // console.log(`userId is the following: ${usernameConst} and has the type of ${typeof usernameConst}`)

    try {
    const videoPostSuccess = await VideoPostModel.create
    ({
            videoID: videoIDcreateUUID,
            videoTitle: videoTitle,
            videoLink: videoLink,
            thumbnailImage: null,
            playersHighlighted: null,
            teamsFeatured: null,
            tags: null,
            gameDate: null,
            nbaSeason: null,
            isPlayoffs: null,
            clutch: null,
            adminHighlighted: false,
            adminDelete: false,
            userId: req.user.id
        });
    res.status(201).json({
        status: 201,
        message: "Video Post created!",
        videopost: videoPostSuccess,
    });
    } catch (err) {
    res.status(500).json({
        status: 500,
        messageError: `Error message is: ${err}`,
        message: "Failed to create the Video Post!",
    });
    }
}
);

//! Get all VideoPosts from a specific user
router.get("/content/:userId", validateJWT, async (req, res) => {
    const { userId } = req.params;

    try {
        const videoPosts = await VideoPostModel.findAll({
            where: {
                userId: userId
            },
        });
        res.status(200).json({
            message: `All of ${userId}'s videos were successfully retrieved!`,
            videoposts: videoPosts,
        });
    } catch (err) {
        res.status(500).json({
            message: `${userId}'s videos could not be retrieved!`,
            errorMessage: err
        });
    }
});

//! Get a specific VideoPost from a specific user
router.get("/content/:userId/:videoID", validateJWT, async (req, res) => {
    const { userId, videoID } = req.params;
    try {
        const videoPost = await VideoPostModel.findOne({
            where: {
                userId: userId,
                videoID: videoID
            },
        });
        res.status(200).json({
            message: "Video Post successfully retrieved!",
            videopost: videoPost,
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to retrieve Video Post!",
            errorMessage: err,
        });
    }
});

//! Update a specific Video Post
router.put("/content/:userId/:videoID", validateJWT, async (req, res) => {
    const { 
        videoTitle,
        videoLink,
        thumbnailImage,
        playersHighlighted,
        teamsFeatured,
        tags,
        gameDate,
        nbaSeason,
        isPlayoffs,
        clutch
    } =    
        req.body.videopost;

    //? VideoID is the primary key of the table. Needed to grab for the user's video post in the where clause.
    const { userId, videoID } = req.params;

        const updateVideoPost = await VideoPostModel.update(
            {
                videoTitle: videoTitle,
                videoLink: videoLink,
                thumbnailImage: thumbnailImage,
                playersHighlighted: playersHighlighted,
                teamsFeatured: teamsFeatured,
                tags: tags,
                gameDate: gameDate,
                nbaSeason: nbaSeason,
                isPlayoffs: isPlayoffs,
                clutch: clutch
            },
            {
                where: {
                    videoID: videoID,
                    userId: userId
                }
            }
        );
        res.status(200).json({
            message: "Video Post successfully updated!",
            videopost: updateVideoPost,
        });
});

//! Update an individual user's video post (admin)
// router.put("/:userId/:videoID/", validateJWT, async (req, res) => {
//     const {
//         videoTitle,
//         videoLink,
//         thumbnailImage,
//         playersHighlighted,
//         teamsFeatured,
//         tags,
//         gameDate,
//         nbaSeason,
//         isPlayoffs,
//         clutch,
//         adminHighlighted,
//         adminDelete
//     } =
//         req.body.videopost;

//     //? VideoID is the primary key of the table. Needed to grab for the user's video post in the where clause.
//     const videoID = req.params.videoID;
//     const userId = req.params.userId;

//     const updateVideoPost = await VideoPostModel.update(
//         {
//             videoTitle: videoTitle,
//             videoLink: videoLink,
//             thumbnailImage: thumbnailImage,
//             playersHighlighted: playersHighlighted,
//             teamsFeatured: teamsFeatured,
//             tags: tags,
//             gameDate: gameDate,
//             nbaSeason: nbaSeason,
//             isPlayoffs: isPlayoffs,
//             clutch: clutch,
//             adminHighlighted: adminHighlighted,
//             adminDelete: adminDelete
//         },
//         {
//             where: {
//                 videoID: videoID,
//                 videoOwner: videoOwner,
//                 userId: userId
//             }
//         }
//     );
//     res.status(200).json({
//         message: "Video Post successfully updated!",
//         videopost: updateVideoPost,
//     });
// });


//! DELETE a specific user's Video Post
router.delete("content/:userId/:videoId", validateJWT, async (req, res) => {
    const userId = req.params.userId;
    const videoID = req.params.videoId;

    try {
    const deletedVideoPost = await VideoPostModel.destroy({
        where: {
            videoID: videoID,
            userId: userId
        },
    });
    res.status(200).json({
        message: "Video Post deleted!",
        deletedVideoPost,
    });
    } catch (err) {
    res.status(500).json({
        message: "Failed to delete the Video Post!",
        errorMessage: `Error message is: ${err}`
    });
    }
});

//!___________________________________________________________________________
//!___________ CRUD for All Video Posts ___________
//!___________________________________________________________________________

//! Get all of a user's Video Posts
router.get("content/admin/:userId", validateJWT, async (req, res) => {
    const userId = req.user.userId;

    try {
    const allUserVideos = await VideoPostModel.findAll({
        where: {
            userId: userId,
        },
    });
    res.status(200).json({
        message: "Deleted of a user's Video Posts!",
        allUserVideos,
    });
    } catch (err) {
    res.status(500).json({
        message: "Failed to get all of a user's Video Posts!",
    });
    }
});

//! DELETE all of a user's Video Posts they've ever made
router.delete("/content/:userId", validateJWT, async (req, res) => {
    const userId = req.params.userId;

    try {
    const deletedAllVideos = await VideoPostModel.destroy({
        where: {
            userId: userId,
        },
    });
    res.status(200).json({
        message: "All of a user's Video Posts deleted!",
        deletedAllVideos,
    });
    } catch (err) {
    res.status(500).json({
        message: "Failed to delete all of a user's Video Posts!",
        errorMessage: `Error message is: ${err}`
    });
    }
});



module.exports = router;