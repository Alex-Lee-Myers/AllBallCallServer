require('dotenv').config();

// imports
const express = require('express');
const dbConnection = require('./db');
const controllers  = require('./controllers');
const middleware = require('./middleware');

// instantiation
// const app = express();
const app = express();

// middleware
app.use(middleware.CORS);
app.use(express.json());

// endpoints
app.use('/users', controllers.usercontroller);
app.use(middleware.validateSession);
app.use('/videos', controllers.videopostcontroller);
app.use('/comments', controllers.commentscontroller);

// database auth & sync
// try {
    dbConnection
        .authenticate()
        .then(async () => await dbConnection.sync())
        .then(() => {
            app.listen(process.env.PORT, () => {
                console.log(`[SERVER]: App is listening on ${process.env.PORT}`);
            });
        })
// }
.catch (error => console.log(`[SERVER]: ${error}`))