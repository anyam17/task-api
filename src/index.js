// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');

const config = require('./config/config').get(process.env.NODE_ENV);
const UsersRouter = require('./routes/users.routes');

// defining the Express app
const app = express();

// adding Helmet to enhance your Rest API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining routes
UsersRouter.userRoutes(app);

// Database Connection Setup. 
mongoose.Promise = global.Promise;

/** 
 * Mongoose v6.0.6 already sets useNewUrlParser , useUnifiedTopology , and useCreateIndex to true, 
 * and useFindAndModify is false. So explicitely setting them is not required. */
mongoose.connect(config.DATABASE_URL)
    .then(() => app.listen(config.PORT, () => {
        console.log("\n" + "* ".repeat(100));
        console.log(`MongoDB database started sucessfully! \nServer started successfully on port: [${config.PORT}]`);
        console.log("_ ".repeat(100) + "\n");
    }))
    .catch((error) => console.log(error.message));