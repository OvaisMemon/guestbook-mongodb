const express = require("express");
const mongoose = require("mongoose");

var api = express.Router();
api.use(express.json());

require("../models/guests");

const guests = mongoose.model("guests");

api.get("/", (req, res) => {
    guests.find(function(err, db){
        if(err){
            console.log("Error retrieving entries.")
            return;
        }

        res.render("index", { entries : db });
    });    
});

api.get("/new-entry", (req, res) => {
    res.render("new-entry");
});

api.post("/new-entry", (request, response) => {
    if(!request.body.title || !request.body.message){
        response.status(400).send("Message and Title should have some value and cannot be null.");
        
        return;
    }

    var newEntry = {
        title: request.body.title,
        message: request.body.message
    };

    new guests(newEntry)
    .save()
    .then(s=> {     
        console.log("Guest book entry saved.");   
        response.redirect("/guests");
    })
    .catch(err => {
        console.log(err);
        response.render("403");
    });
});

module.exports = api;