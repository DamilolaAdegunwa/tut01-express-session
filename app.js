const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

//Package documentation - https://www.npmjs.com/package/connect-mongo
const mongoStore = require('connect-mongo');
//const mongoStore = new connectMongo(session);

//Create the Express application
var app = express();
//<user>:<password>
//const dbString = 'mongodb://localhost:27017/tutorial_db';
const dbString = 'mongodb://127.0.0.1:27017/tutorial_db';
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
//console.log(mongoose);
const connection = mongoose.createConnection(dbString, dbOptions);

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
// const sessionStore = new mongoStore({
//     mongooseConnection: connection,
//     collection:'sessions'
// });
const sessionStore = mongoStore.create(
    {
        mongoUrl:dbString,
        collectionName:'sessions'
    }
);
app.use(session({
    secret:'some secret',
    resave:false,
    saveUninitialized: true,
    store:sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60* 24//1 day
    }
}));

app.get('/',(req,res,next) => {
    res.send('<h1>hello world (session)</h1>')
});
app.listen(3000);