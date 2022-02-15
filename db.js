const Sequelize = require("sequelize");

// const seqeulize = new Sequelize(
//     process.env.DATABASE_URL, {
//         dialect: 'postgres',
// })
//! LocalHost Deployment
const db = new Sequelize(
	`postgres://postgres:${process.env.DbPass}@localhost:5432/AllBallCall`,
	{
		dialect: "postgres",
	}
);

//!Heroku Deployment
// const db = new Sequelize(`${process.env.DATABASE_URL}`, {
// 	dialect: "postgres",
// 	dialectOptions: {
// 		ssl: {
// 			require: true,
// 			rejectUnauthorized: false,
// 		},
// 	},
// });

module.exports = db;
