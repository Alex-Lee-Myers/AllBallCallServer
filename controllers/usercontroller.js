const express = require("express");
const router = express.Router();
const { UserModel } = require("../models");
const { UniqueConstraintError, Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let validateJWT = require("../middleware/validate-session");
// import uuid
const uuid = require("uuid");

router.post("/register", async (req, res) => {
    const {
        username,
        email,
        passwordhash,
        isAdmin,
        accountResetQuestion1,
        accountResetQuestion2,
        accountResetAnswer1,
        accountResetAnswer2,
    } = req.body.user;
    const salt = bcrypt.genSaltSync(12);
    const pwHashed = bcrypt.hashSync(passwordhash, salt);

    try {
        const User = await UserModel.create({
            id: uuid.v4(),
            username: username,
            email: email,
            passwordhash: pwHashed,
            isAdmin: isAdmin,
            accountResetQuestion1: accountResetQuestion1,
            accountResetQuestion2: accountResetQuestion2,
            accountResetAnswer1: accountResetAnswer1,
            accountResetAnswer2: accountResetAnswer2,
    });

    let token = jwt.sign({ id: User.id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    });
        res.status(201).json({
            message: "Registration complete!",
            user: User,
            sessionToken: token,
    });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Username already in use!",
            });
    } else {
        res.status(500).json({
        message: "Failed to register the User!",
        });
        }
    }
});

router.post("/login", async (req, res) => {
    const { username, email, passwordhash } = req.body.user;
  // where username or email is equal to the username or email in the request body

    try {
    const user = await UserModel.findOne({
        where: {
            [Op.or]: [{ username }, { email }],
        },
    });

    //compare our passwordhash to the DB passwordhash for the user
    // "(passwordhash," calls into parameter in 36. "user.passwordhash)" refers to line 39 and stepping into the object
    console.log("Username: ", user.username, "Email :", user.email, "UUID: ", user.uuid);
    // depending on userAuth value 0/1 we proceed or throw
    //TODO generate jwt for the user and save it to database
    if (!user.username) {
      //* If userAuth (the passwordhash) is not right, run this...(lines 56-59)
        res.status(401).json({
            message: "Invalid login",
        });
        return false;
      //* Otherwise, run else where we assign a token and run the object in lines 64-68)
    } else {
        const userAuth = bcrypt.compareSync(passwordhash, user.passwordhash);
        console.log(userAuth);
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24,
        });

        res.status(200).json({
            username: user.username,
            email: user.email,
            message: "User successfully logged in!",
            user: UserModel,
            sessionToken: token,
            id: user.id,
        });
    }
    } catch (error) {
        console.log(error);
        res.status(500).json({
        message: "Failed to log user in",
        });
    }
});

// Checking if their token is valid, if it is, then:
router.get("/validate", validateJWT, async (req, res) => {
    res.status(200).json({
        message: "Token is valid",
        id: req.user.id,
        email: req.user.email,
        username: req.user.username,
        isAdmin: req.user.isAdmin
    });
});

//! GET UserInfo if they are logged in
router.get("/:id", validateJWT, async (req, res) => {
    console.log("UserInfo: ", req.user);
    const { id } = req.params;

    try {
        const user = await UserModel.findOne({
            where: {
                id: id,
            },
        });
        res.status(200).json({
            user: user,
            message: ":id | UserInfo grabbed!",
        });
    } catch (error) {
        res.status(500).json({
        message: ":id | Failed to get user",
        });
    }
});

//TODO 1) update passphrase only if the user answers accountResetQuestion1 and accountResetQuestion2 correctly according to accountResetAnswer1 and accountResetAnswer2
//TODO 2) update username and/or email only if valid

router.put("/passphrase/:id", validateJWT, async (req, res) => {
    const { id } = req.params;
    const {
        username,
        email,
        passwordhash,
    } = req.body.user;

    try {
    // update username, email and passwordhash
    const user = await UserModel.update(
        {
            username: username,
            email: email,
            passwordhash: passwordhash,
        },
        {
            where: {
                id: id,
            },
        }
    );
    res.status(200).json({
        message: "/passphrase/:id | User successfully updated!",
        user: user,
    });
    } catch (error) {
        res.status(500).json({
        message: "/passphrase/:id | Failed to update user",
        });
    }
});

// if validateJWT is true, then we can delete the user
router.delete(":id", validateJWT, async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.destroy({
            where: {
                id: id,
            },
        });
        res.status(200).json({
            message: "User successfully deleted!",
            user: user,
        });
    } catch (error) {
        res.status(500).json({
        message: "Failed to delete user",
        });
    }
});




module.exports = router;
