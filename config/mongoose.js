//Require the library
var mongoose = require('mongoose');

//Connect to database
mongoose.connect('mongodb://localhost/contact_list_db');

//Acquire the connection(to check if it is successul)
const db = mongoose.connection;

//Error 
db.on('error', console.error.bind(console, 'error connecting to db'));

//up and running print the message
db.once('open', function(){
    console.log('successfully connected to the database')
})