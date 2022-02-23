require("dotenv").config();
const express = require("express");
// const fetch = require("node-fetch");
// globalThis.fetch = fetch;
const app = express();
var cors = require("cors");
let whitelist = [
	"http://localhost:3001",
	"https://allballcall.herokuapp.com/",
	"http://localhost:3000",
];

// imports
app.use(cors({ origin: whitelist, credentials: true }));
app.use(require('./middleware/headers'));
app.use(cors());
// const middleware = require("./middleware");
const dbConnection = require("./db");
const controllers = require("./controllers");

// middleware
// app.options("*", cors());
app.use(express.json());

// endpoints
app.use("/users", controllers.usercontroller);
app.use("/videos", controllers.videopostcontroller);
// app.use(middleware.validateSession);
app.use("/comments", controllers.commentscontroller);

// database auth & sync
// try {
dbConnection
	.authenticate()
	.then(async () => await dbConnection.sync()) // { force: true } = reset database.
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log(`[SERVER]: App is listening on ${process.env.PORT}`);
		});
	})
	// }
	.catch((error) => console.log(`[SERVER]: ${error}`));
