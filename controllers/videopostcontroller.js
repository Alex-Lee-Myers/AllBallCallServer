const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-session");
const { VideoPostModel } = require("../models");

router.post("/", validateJWT, async (req, res) => {
    const { videoID, videoTitle, videoLink, videoOwner, thumbnailImage, playersHighlighted, teamsFeatured, tags, gameDate, nbaSeason, isPlayoffs, clutch, adminHighlighted, adminDelete } =
        req.body.videoPost;
    const { id } = req.user;
    const videoPostEntry = {
        videoID,
        videoTitle,
        videoLink,
        videoOwner: id,
        thumbnailImage,
        playersHighlighted,
        teamsFeatured,
        tags,
        gameDate,
        nbaSeason,
        isPlayoffs,
        clutch,
        adminHighlighted,
        adminDelete,
    };
    try {
    const videoPost = await VideoPostModel.create(videoPostEntry);
    res.status(201).json({
        message: "Video Post created!",
        videoPost,
    });
    } catch (err) {
    res.status(500).json({
        message: "Failed to create the Video Post!",
    });
    }
}
);

router.get("/", validateJWT, async (req, res) => {
    const { id } = req.user;
    try {
    const query = {
    where: {
        videoOwner: id,
        },
    };
    const entries = await VideoPostModel.findAll(query);
    res.status(200).json(entries);
    } catch (err) {
    res.status(500).json({ error: err });
    }
});

router.put("/:videoID", validateJWT, async (req, res) => {
    const { description, videoTitle, price, shortDescription, image, owner_id } =
        req.body.videopost;
    const videoID = req.params.videoID;
    const videoOwner = req.user.uuid;

    try {
    const updatedVideoPost = await VideoPostModel.update(
        {
        videoTitle,
        videoLink,
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
        adminDelete,
        },
        {
        where: {
            videoID,
            videoOwner,
        },
        }
    );
    res.status(200).json({
        message: "Video Post updated!",
        updatedVideoPost,
    });
    } catch (err) {
    res.status(500).json({
        message: "Failed to update the Video Post!",
    });
    }
});


router.delete("/:productId", validateJWT, async (req, res) => {
    const videoOwner = req.user.id;
    const videoID = req.params.videoID;

    try {
    const deletedVideoPost = await VideoPostModel.destroy({
        where: {
            videoID,
            videoOwner,
        },
    });
    res.status(200).json({
        message: "Video Post deleted!",
        deletedVideoPost,
    });
    } catch (err) {
    res.status(500).json({
        message: "Failed to delete the Video Post!",
    });
    }
});

module.exports = router;