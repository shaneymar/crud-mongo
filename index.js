const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config.json");

//configure server

let app = express();
app.use(express.json());
//create Schema

let Schema = mongoose.Schema;

//schema requires an object Id
let ObjectId = Schema.ObjectId;

let User = mongoose.model("User", Schema({
    id: ObjectId,
    title: String,
    firstname: String,
    lastname: String,
    power: String,
    City: String,
}))

const url = config.url.replace("{{user}}", config.user)
.replace("{{password}}", config.password)
.replace("{{dbname}}",config.dbname)
.replace("{{dbstring}}", config.dbstring)


mongoose.connect(url)
.then(res => console.log("connection successfull"))
.catch(error =>console.log("Error", error));

//Middlewares
// app.get("/", function(req, res){
//     res.send("Welcome to Node JS")
// })
// app.get("/data", function(req, res){
//     res.send("reached data route")
// })


//CRUD
//Create
let user = new User({
    title : "Superman",
     firstname : "Clark",
     lastname : "Kent",
     power : 7,
    City : "Metropolis",
});

app.post("/data", function(req,res){
    let user = new User(req.body);
    user.save()
    .then(dbres =>res.status(200).send({"message": dbres.title+ "was added to DB"}))
    .catch(err => {
        console.log("Error Fetching Records", err);
        res.send(400).send({"Error": "Something went Wrong - error adding user"})
    }); 
})



//Read
app.get("/data",function(req, res){
    console.log(req);
    User.find()
    .then(dbres => res.status(200).send(dbres))
    .catch(err => {
        console.log("Error Fetching Records", err);
        res.send(400).send({"error": "something went  wrong"})
        })
});

//Read before update
app.get("/update/:id", function(req,res){
    User.findByIdAndUpdate({ _id : req.params.id })
    .then(dbres => res.status(200).send(dbres))
    .catch(err => {
        console.log("Error Fetching Records", err);
        res.send(400).send({"error": "Error Finding User"})
    });
})

//Read before update
app.get("/update/:id", function(req,res){
    User.findByIdAndUpdate({ _id : req.params.id })
    .then(dbres => res.status(200).send(dbres))
    .catch(err => {
        console.log("Error Fetching Records", err);
        res.send(400).send({"error": "Error Finding User"})
    });
})

//update
// User.findByIdAndUpdate({ _id : "643ad5f89a23228e916df13c" })
// .then( dbres => {
//     let user = new User(dbres);
//     user.power = 10;
//     user.City = "Bangalore";
//     user.save().then(updatedinfo => console.log("updated")).catch(error => console.log("Error ", errror))
// })
// .catch(err => console.log("Error ", err));


 
//Delete
User.findByIdAndDelete({ _id : "643ad58bb81c3137ac3d21b9"})
.then(dbres => console.log(dbres.title, " was deleted"))
.catch(err => console.log("Error ", err)); 





// config.host and port are coming from config.json
app.listen(config.port, config.host, function(err){  
    if(err){
        console.log("Error", err);
    }
    else{
        console.log(`Express is now running on ${config.host}:${config.port}`);
    }
})