const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require ('mongoose');
const config = require('./config/database');

// //mongoose database
// mongoose.connect(config.database);

// //on connection
// mongoose.connection.on('connected', () => {
//     console.log('Connected to database '+config.database);
// });
// //On error
// mongoose.connection.on('error', (err) => {
//     console.log('Database error '+err);
// });

// //express
const app = express();

//user route
const users = require('./routes/users');

//role routess
const roles = require('./routes/roles');

//mediafile routes
const mediaFiles = require('./routes/mediaFiles')

//key routes
const keys = require('./routes/key.routes')

//PORT
const port = 3000;

//CORS
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser
app.use(express.json());

//Passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/roles', roles);
app.use('/api/media', mediaFiles);
app.use('/api/keys' , keys);

//Index route
app.get('/', (req, res) => {
    res.send('Work');
});


//start
app.listen(port, () => {
    console.log('Server is running on port '+port);
});
