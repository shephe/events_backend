// DEPENDENCIES
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

// GLOBAL VARIABLES 
const PORT = process.env.PORT || 3000;
const db = mongoose.connection;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/events';
const eventController = require('./controllers/events.js')

// CORS STUFF
const whitelist = ['http://localhost:3010', ];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
}

// DATABASE
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true});
db.on('open', () => {
    console.log('Mongo is connected')
});

// MIDDLEWARE 
app.use(cors())
app.use(express.json());
app.use('/events', eventController)

app.get('/', (req, res) => res.send('Working'))


// LISTENER
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})