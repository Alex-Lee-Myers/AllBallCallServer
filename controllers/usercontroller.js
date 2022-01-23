const express = require("express");
const router = express.Router();
const { UserModel } = require("../models");
const { UniqueConstraintError } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// import uuid
const uuid = require("uuid");


router.post("/register", async (req, res) => {
    const { username, email, passwordhash, isAdmin, accountResetQuestion1, accountResetQuestion2, accountResetAnswer1, accountResetAnswer2} = req.body.user;
    const salt = bcrypt.genSaltSync(12);
    const pwHashed = bcrypt.hashSync(passwordhash, salt);

    try {
        const User = await UserModel.create({
            uuid: uuid.v4(),
            username: username,
            email: email,
            passwordhash: pwHashed,
            isAdmin: isAdmin,
            accountResetQuestion1: accountResetQuestion1,
            accountResetQuestion2: accountResetQuestion2,
            accountResetAnswer1: accountResetAnswer1,
            accountResetAnswer2: accountResetAnswer2
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

    try {
        const { username, passwordhash } = req.body.user
        const loginUser = await UserModel.findOne({
        where: {
            username,
        }});

        if (loginUser) {
        let passwordComparison = await bcrypt.compare(
            passwordhash,
            loginUser.passwordhash
        );

        if (passwordComparison) {
            let token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24,
            });

            res.status(200).json({
            user: loginUser,
            message: "Login successful!",
            sessionToken: token,
            });
        } else {
            res.status(401).json({
            message: "Incorrect username or password",
            });
        }
        }
    } catch (error) {
        res.status(500).json({
        message: "Failed to login user!",
        });
    }
});

module.exports = router;