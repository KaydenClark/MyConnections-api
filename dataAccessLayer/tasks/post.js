const MongoClient = require('mongodb').MongoClient;
const ObjectId = require("mongodb").ObjectId;
require('dotenv').config()


// Connection URL
const url = process.env.ATLAS_CONNECTION

// Database Name
const dbName = 'ToDoProject';

const newTask = (task, listId) => {
    // Use connect method to connect to the server
    let iou = new Promise ((resolve, reject) =>{

        MongoClient.connect(url, settings, function (err, client) {
            if(err){
                reject(err)
            }
            else { 
                console.log("Connected to server for Creation of a Task");
                const db = client.db(dbName);
                // Get the contacts collection
                const collection = db.collection('ToDoTasks');
                // Insert a document
                collection.insertOne(task, async function (err, result) {
                    if(err){
                        reject(err)
                    }
                    else{
                        const newTaskId = ObjectId(result.insertedId)
                        console.log("Connected to server to Update a List");
                        console.log(newTaskId)
                        const db = client.db(dbName);
                        // Get the contacts collection
                        const collection = db.collection('ToDoLists');
                        // Insert a document
                        collection.updateOne({ "_id": ObjectId(listId) }, 
                            { $push: { todos: newTaskId } },
                            function (err, result) {
                                console.log("mongo update callback")
                                if(err){
                                    reject(err)
                                }  else{
                                    // console.log(result)
                                    client.close();
                                    resolve("Updated a document in the collection");
                                }
                        });
                    } 
        })
    }
    });
})
return iou
}

module.exports = {newTask}