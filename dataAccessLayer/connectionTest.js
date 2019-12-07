const MongoClient = require('mongodb').MongoClient;
const ObjectId = require("mongodb").ObjectId;
require('dotenv').config()


// Connection URL
const url = process.env.ATLAS_CONNECTION

// Database Name
const toDoDB = 'ToDoProject';
const eventsDB = 'Calendar';
const settings = {useUnifiedTopology: true}

const testToDoConnection = () => {
    const iou = new Promise((resolve, reject) => {
        // Use connect method to connect to the server
        MongoClient.connect(url, settings, function (err, client) {
            if(err){
                // assert.equal(null, err);
                reject(err)
            } else {
                const db = client.db(toDoDB);
                // console.log("client", client)
                // console.log("db", db)
                client.close();
                resolve("Successfully to ToDoProject DataBase")
                console.log("Connected to ToDoProject DataBase")
            }
        });
    })
    return iou
}

const testEventsConnection = () => {
    const iou = new Promise((resolve, reject) => {
        // Use connect method to connect to the server
        MongoClient.connect(url, settings, function (err, client) {
            if(err){
                // assert.equal(null, err);
                reject(err)
            } else {
                const db = client.db(eventsDB);
                // console.log("client", client)
                // console.log("db", db)
                client.close();
                resolve("Successfully connected to Calendar DataBase")
                console.log("Connected to Calendar DataBase")
            }
        });
    })
    return iou
}

module.exports = {testToDoConnection, testEventsConnection}