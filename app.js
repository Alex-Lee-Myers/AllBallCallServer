require('dotenv').config();

// imports
var cors = require('cors');
const express = require('express');
const dbConnection = require('./db');
const controllers  = require('./controllers');
const middleware = require('./middleware');

// instantiation
// const app = express();
const app = express();

// middleware
app.options("*", cors());
app.use(middleware.CORS);
app.use(express.json());

// endpoints
app.use('/users', controllers.usercontroller);
app.use('/videos', controllers.videopostcontroller);
app.use(middleware.validateSession);
app.use('/comments', controllers.commentscontroller);

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
.catch (error => console.log(`[SERVER]: ${error}`))