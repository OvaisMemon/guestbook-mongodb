const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

var api = express.Router();
api.use(express.json());

require("../models/guests");

const guests = mongoose.model("guests");

api.get("/", (req, res) => {
    
    res.render("index", { entries = guests.json });
});

api.get("/new-entry", (req, res) => {
    res.render("new-entry");
});

api.post("/new-entry", (req, res) => {
    if(!request.body.title || !request.body.message){
        response.status(400).send("Message and Title should have some value and cannot be null.");
        
        return;
    }

    var newEntry = {
        title: req.body.title,
        message: req.body.message
    };

    new guests(newEntry)
    .save()
    .then(s=> {
        response.status(200).send("Guest book entry saved..");
        res.redirect("/");
    })
    .catch(err => {
        console.log(err);
        res.redirect("403");
    });
});

api.put("/update", (req, res) => {
    res.send("Update");
});

api.delete("/delete", (req, res) => {
    res.send("Delete.");
});

module.exports = api;