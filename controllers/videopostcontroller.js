const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-session");
const { VideoPostModel } = require("../models");
const uuid = require("uuid");

console.log(VideoPostModel);

//! Create Video Post
router.post("/content", validateJWT, async (req, res) => {
    const {
        videoTitle, 
        videoLink,
        username,
        videoOwner, 
        thumbnailImage,
        playersHighlighted, 
        teamsFeatured, 
        tags, 
        gameDate, 
        nbaSeason, 
        isPlayoffs, 
        clutch,
        adminHighlighted,
        adminDelete
    } =
        req.body.videopost;

    try {
    const videoPostSuccess = await VideoPostModel.create
    ({
            videoID: uuid.v4(),
            videoTitle: videoTitle,
            videoLink: videoLink,
            username: req.user.username,
            videoOwner: req.user.uuid,
            thumbnailImage: thumbnailImage,
            playersHighlighted: playersHighlighted,
            teamsFeatured: teamsFeatured,
            tags: tags,
            gameDate: gameDate,
            nbaSeason: nbaSeason,
            isPlayoffs: isPlayoffs,
            clutch: clutch,
            adminHighlighted: adminHighlighted,
            adminDelete: adminDelete
        });
    res.status(201).json({
        message: "Video Post created!",
        videopost: videoPostSuccess,
    });
    } catch (err) {
    res.status(500).json({
        messageError: `Error message is: ${err}`,
        message: "Failed to create the Video Post!",
    });
    }
}
);

//! Get all VideoPosts from a specific user
router.get("/content/:username", validateJWT, async (req, res) => {
    const { username } = req.params;
    try {
        const videoPosts = await VideoPostModel.findAll({
            where: {
                username: username,
            },
        });
        res.status(200).json({
            message: `All of ${username}'s videos were successfully retrieved!`,
            videoposts: videoPosts,
        });
    } catch (err) {
        res.status(500).json({
            message: `${username}'s videos could not be retrieved!`,
            errorMessage: err
        });
    }
});

//! Get a specific VideoPost from a specific user
router.get("/content/:username/:videoID", validateJWT, async (req, res) => {
    const { username, videoID } = req.params;
    try {
        const videoPost = await VideoPostModel.findOne({
            where: {
                username: username,
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
router.put("/:username/:videoID", validateJWT, async (req, res) => {
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
        clutch,
        adminHighlighted,
        adminDelete    
    } =    
        req.body.videopost;

    //? VideoID is the primary key of the table. Needed to grab for the user's video post in the where clause.
    const videoID = req.params.videoID;
    const videoOwner = req.user.uuid;
    const username = req.params.username;

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
                clutch: clutch,
                adminHighlighted: adminHighlighted,
                adminDelete: adminDelete
            },
            {
                where: {
                    videoID: videoID,
                    videoOwner: videoOwner,
                    username: username
                }
            }
        );
        res.status(200).json({
            message: "Video Post successfully updated!",
            videopost: updateVideoPost,
        });
});

//! Update an individual user's video post (admin)
// router.put("/:username/:videoID/", validateJWT, async (req, res) => {
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
//     const username = req.params.username;

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
//                 username: username
//             }
//         }
//     );
//     res.status(200).json({
//         message: "Video Post successfully updated!",
//         videopost: updateVideoPost,
//     });
// });


//! DELETE a specific user's Video Post
router.delete("/delete/:username/:videoId", validateJWT, async (req, res) => {
    const username = req.params.username;
    const videoID = req.params.videoId;

    try {
    const deletedVideoPost = await VideoPostModel.destroy({
        where: {
            videoID: videoID,
            username: username
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
router.get("/allVideos/:username", validateJWT, async (req, res) => {
    const username = req.user.username;

    try {
    const allUserVideos = await VideoPostModel.findAll({
        where: {
            username: username,
        },
    });
    res.status(200).json({
        message: "All of a user's Video Posts!",
        allUserVideos,
    });
    } catch (err) {
    res.status(500).json({
        message: "Failed to get all of a user's Video Posts!",
    });
    }
});

//! DELETE all of a user's Video Posts they've ever made
router.delete("/deleteAll/:username", validateJWT, async (req, res) => {
    const username = req.params.username;

    try {
    const deletedAllVideos = await VideoPostModel.destroy({
        where: {
            username: username,
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