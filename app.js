require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
let whitelist = [
	"http://localhost:3001",
	"https://allballcall.herokuapp.com",
	"http://localhost:3000",
];

// imports
app.use(cors({ origin: whitelist, credentials: true }));
// app.use(require('./middleware/headers'));
// app.use(cors());
// const middleware = require("./middleware");
const dbConnection = require("./db");
const controllers = require("./controllers");
app.use(express.json());

// endpoints
// app.use(middleware.validateSession);
app.use("/users", controllers.usercontroller);
app.use("/videos", controllers.videopostcontroller);
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
