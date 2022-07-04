const express = require('express')
const path = require('path');
const bodyparser = require('body-parser');
const app = express()
const port = 3000

// it can access the databasse from the config file
const db = require('./config/mongoose');

//importing the Contact Schema from contact.js
const Contact = require('./models/contact')

//Setting up ejs templates
app.set('view engine', 'ejs');
//__dirname tells the current directory ans path.join joins the __dirname to specified folders
app.set('views',path.join(__dirname, 'views'));

/*var contactList = [
    {
        name : "harsha",
        phone: "8088223109"
    },
    {
        name: "sow",
        phone: "9611967930"
    },
    {
        name: "shashi",
        phone: "8310383369"
    },
    {
        name: "krishna",
        phone: "9686833070"
    }
]*/

//Middleware Creation 1
app.use(function(req,res, next){
   // console.log("middle ware 1 is created");
    next()
})

//Middleware Creation 2
app.use(function(req,res, next){
   // console.log("middle ware 2 is created");
    next()
})

//Middlewares
app.use(bodyparser.urlencoded({extended: false}));
//this read the form data and parse it for me but not params and queries
app.use(express.urlencoded());
//middleware to access static files
app.use(express.static('assets'));

//Route and Controller function (call back function)
app.get('/', (req, res) => {
    console.log(__dirname);

    //Mongodb  code to find the data from the database
    Contact.find({}, function(err, contacts){
        if(err){
            console.log("Error in fetching contacts from db");
            return;
        }

    //.render used to render the view 
    return res.render('home',{
        //we pass on the data through this context object
    contact_List: contacts,
    title : 'contacts'
});
});

})

app.get('/playground',(req, res)=>{
    return res.render('practice',{title : 'Lets play with Ejs'});
})

//Create contacts
app.post('/create-contact',(req, res)=>{
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // })

    //inserting into the database
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if (err){
            console.log("Error while populating the database");
            return;
        }

        console.log(newContact);
        return res.redirect('back');
    });
});


//Delete Contact
app.get('/delete-contact/',(req, res)=>{
    //get the query from url and accessed using req.query compare it with the 
/*  console.log(req.query)
    let phone = req.query.phone;

    let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    if(contactIndex != -1){
        contactList.splice(contactIndex, 1);
    }
    return res.redirect('back');
    */

    //Getting unique id
    let id = req.query.id;

    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log("error in deleting the form from the database");
            return;
        }

    return res.redirect('back');

    })
    
     
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})