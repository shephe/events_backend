// DEPENDENCIES
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()
// const MongoClient = require('mongodb').MongoClient;

//DOTENV
require('dotenv').config()
const APIKEY = process.env.APIKEY

// GLOBAL VARIABLES 
const PORT = process.env.PORT || 3000;
const db = mongoose.connection;
const MONGODB_URI = process.env.DB_URI || 'mongodb://localhost:27017/events';
const eventController = require('./controllers/events.js')

// CORS STUFF
const whitelist = ['http://localhost:3010', 'https://events-express-api.herokuapp.com/', ];
// const corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
// }
const corsOptions = (req, callback) => {
    let corsOptions;
    if (whitelist.indexOf(req.header("Origin")) !== -1) {
      corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
  };

// DATABASE
// MongoClient.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
//     db.close()
// })
// mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
// db.on('open', () => {
//     console.log('Mongo is connected')
// });
try {
    mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true,  useCreateIndex: true})
    .then(() => console.log('MongoDB connected...'))
    .catch (error => {
        console.log('ERROR: ' + error + '. \n'
            +'CONNECTION TO MONGO FAILED.');
    });
} catch (error) {
    console.log('ERROR: ' + error.message);
}
// const client = new MongoClient(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true});
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// MIDDLEWARE
app.options('*', cors(corsOptions))
// app.use(cors(corsOptions))
app.use(express.json());
app.use('/events', eventController)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3010');
    next();
  });

app.get('/', (req, res) => {
    res.send('up and running')
})


// LISTENER
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})