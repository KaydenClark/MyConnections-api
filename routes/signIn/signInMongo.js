const MongoClient = require('mongodb').MongoClient;
const ObjectId = require("mongodb").ObjectId;
require('dotenv').config()


// Connection URL
const url = process.env.ATLAS_CONNECTION

// Database Name
const dbName = 'UserData';
const settings = {
    useUnifiedTopology: true
}


const newUser = (email, hash) => {
    // Use connect method to connect to the server
    let iou = new Promise ((resolve, reject) =>{

        MongoClient.connect(url, settings, function (err, client) {
            if(err){
                reject(err)
            }
            else { 
                console.log("Connected to server for Creation of a List");
                // console.log({email, hash})
                const db = client.db(dbName);
                // Get the contacts collection
                const collection = db.collection('users');
                // Insert a document
                collection.insertMany([{email, hash}], function (err, result) {
                    if(err){
                        reject(err)
                    }
                    else{
                        client.close();
                        resolve("Inserted a document into the collection");
                    }
                   
                });
            } 
        })
    });
    return iou
}

module.exports = {newUser}