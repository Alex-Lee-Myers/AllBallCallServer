const UserModel = require('./usermodel');
const VideoPostModel = require('./videopostmodel');
const CommentsModel = require('./commentsmodel');
// const LikesModel = require('./likesmodel');
// const DislikesModel = require('./dislikesmodel');
// const Bookmarks = require('./bookmarksmodel');

//! Types of associations: (Start)
//? 1. HasMany
//? 2. BelongsTo
//? 3. HasOne
//? 4. BelongsToMany
//! Types of associations. (End)

//? ______________________________________________
//? VIDEOS SECTION | START
//? ______________________________________________
//! Users can have many videos
UserModel.hasMany(VideoPostModel, {
    foreignKey: 'videoOwner'
});

//! Username can have many videos
UserModel.hasMany(VideoPostModel, {
    foreignKey: 'username'
});

//! Videos must belong to a user
VideoPostModel.belongsTo(UserModel, {
    foreignKey: 'videoOwner'
});

//! Videos must belong to a user
VideoPostModel.belongsTo(UserModel, {
    foreignKey: 'username'
});
//? ______________________________________________
//? VIDEOS SECTION | END
//? ______________________________________________

//! ______________________________________________
//! ______________________________________________

//? ______________________________________________
//? COMMENTS SECTION | START
//? ______________________________________________
//! Videos can have many comments
VideoPostModel.hasMany(CommentsModel, {
    foreignKey: 'commentVideoID',
    as: 'comments',
});

//! Comments must belong to a video
CommentsModel.belongsTo(VideoPostModel, {
    foreignKey: 'commentVideoID',
    as: 'video',

    //* This is a custom field that will be used to find the video that the comment belongs to
    //? This is the same as the videoID field in the comments table
    //* This is used to find the video that the comment belongs to
    //? The following is the function:
    //* function findVideo(videoID) {
    //*     return this.findOne({
    //*         where: {
    //*             videoID: videoID
    //*         }
    //*     });
});

//! Users can have many comments
UserModel.hasMany(CommentsModel, {
    foreignKey: 'commentUser',
    as: 'comments',

    //! This is a custom function that will be called when a user is deleted
    //! It will delete all of the comments that the user has made
    onDelete: 'CASCADE',
});

//! Comments must belong to a user
CommentsModel.belongsTo(UserModel, {
    foreignKey: 'commentUser',
    as: 'commentsForUser',

    //! This is a custom function that will be called when a user is deleted
    //! It will delete all of the comments that the user has made
    onDelete: 'CASCADE',
});

//? ______________________________________________
//? COMMENTS SECTION | END
//? ______________________________________________

//! Users can have many likes
// UserModel.hasMany(LikesModel, {
//     foreignKey: 'likeUser',
//     as: 'likes',
// });

//! Videos can have many likes
// VideoPostModel.hasMany(LikesModel, {
//     foreignKey: 'likeVideoID',
//     as: 'likes',
// });

//! Users can have many dislikes
// UserModel.hasMany(DislikesModel, {
//     foreignKey: 'dislikeUser',
//     as: 'dislikes',
// });

//! Users can bookmark videos
// UserModel.hasMany(BookmarkModel, {
//     foreignKey: 'bookmarkUser',
//     as: 'bookmarks',
// });

//! Videos can have likes
// VideoPostModel.hasMany(LikesModel, {
//     foreignKey: 'likeVideoID',
//     as: 'likes',
// });


//! Videos can have dislikes
// VideoPostModel.hasMany(DislikesModel, {
//     foreignKey: 'dislikeVideoID',
//     as: 'dislikes',
// });


//! Export the models
module.exports = {
    UserModel,
    VideoPostModel,
    CommentsModel,
    // LikesModel,
    // DislikesModel,
    // Bookmarks,
};
