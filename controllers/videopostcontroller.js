const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-session");
const { VideoPostModel } = require("../models");
const uuid = require("uuid");

console.log(VideoPostModel);
router.post("/content", validateJWT, async (req, res) => {
    const { 
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
        adminDelete
    } =
        req.body.videopost;
    // const { uuid } = req.user;

    try {
    const videoPostSuccess = await VideoPostModel.create
    ({
            videoID: uuid.v4(),
            videoTitle: videoTitle,
            videoLink: videoLink,
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

router.get("/allUserVideos", validateJWT, async (req, res) => {
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