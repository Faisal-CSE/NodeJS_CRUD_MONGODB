const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const connectDB = require('./server/database/connection');

const app = express();

//Add ENV Config
dotenv.config({path: 'config.env'});

//Define Port number
const PORT = process.env.PORT || 8080;

//Log requests
app.use(morgan('tiny'));

//Mongo db connection
connectDB();

//Parse request to body-parser
app.use(bodyParser.urlencoded({extended: true}));

//Set view engine
app.set('view engine', 'ejs');
//app.set('views',path.resolve(__dirname,'views/ejs'));

//Load Assets
app.use("/css",express.static(path.resolve(__dirname, 'assets/css')));
app.use("/img",express.static(path.resolve(__dirname, 'assets/img')));
app.use("/js",express.static(path.resolve(__dirname, 'assets/js')));

//load routes
app.use("/", require('./server/routes/router'));

app.listen(PORT,()=>{
    console.log("Server is running on http://localhost:"+PORT+")");
});