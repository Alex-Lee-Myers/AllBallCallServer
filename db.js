const Sequelize = require('sequelize');

// const seqeulize = new Sequelize(
//     process.env.DATABASE_URL, {
//         dialect: 'postgres',
// })

const db = new Sequelize(`postgres://postgres:hellomoto@localhost:5432/AllBallCall`, {
    dialect: 'postgres',
    });

module.exports = db;