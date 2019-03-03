const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyparser = require("body-parser");
const guest_router = require("./routers/guest_router");

var app = express();
app.use(bodyparser.urlencoded({ extended:false }));
app.use(express.json());


mongoose.connect("mongodb+srv://ovais-wagla:ovais-wagla@owagla-cswoa.mongodb.net/test?retryWrites=true",{ useNewUrlParser: true })
.then(s=> 
    { 
        console.log("DB Connected.");
    })
.catch(e=> 
    { 
        console.log(e);
    });


// mongoose.connect("mongodb://localhost/guestbook-mongodb", { useNewUrlParser : true })
// .then(s=> { console.log("DB Connected.") })
// .catch(e=> { console.log(e) });

var entries = [];
app.locals.entries = entries;

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/guests", guest_router);

app.use(function(request, response){
    response.status(404).render("404");
});

var port = process.env.PORT || 8080;
app.listen(port, function(){
    console.log("App is running on port 8080.")
})