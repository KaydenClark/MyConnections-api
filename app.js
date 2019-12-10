const MongoClient = require('mongodb').MongoClient;
const ObjectId = require("mongodb").ObjectId;
require('dotenv').config()


// Connection URL
const url = process.env.ATLAS_CONNECTION

// Database Name
const dbName = 'ToDoProject';
const settings = {
    useUnifiedTopology: true
}

const testConnection = () => {
    const iou = new Promise((resolve, reject) => {
        // Use connect method to connect to the server
        MongoClient.connect(url, settings, function (err, client) {
            if(err){
                // assert.equal(null, err);
                reject(err)
            } else {
                const db = client.db(dbName);
                // console.log("client", client)
                // console.log("db", db)
                client.close();
                resolve("Connected successfully to server")
                console.log("Connected to Server")
            }
        });
    })
    return iou
}

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


const newList = (list) => {
    // Use connect method to connect to the server
    let iou = new Promise ((resolve, reject) =>{

        MongoClient.connect(url, settings, function (err, client) {
            if(err){
                reject(err)
            }
            else { 
                console.log("Connected to server for Creation of a List");
                const db = client.db(dbName);
                // Get the contacts collection
                const collection = db.collection('ToDoLists');
                // Insert a document
                collection.insertOne(list, function (err, result) {
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

const readTaskById = (id) => {
    let iou = new Promise((resolve, reject) => {
        // Use connect method to connect to the server
        MongoClient.connect(url, settings, function (err, client) {
            if (err) {
                reject(err)
            } else {
                console.log("Connected to server Read Contacts");

                const db = client.db(dbName);
                // Get the tasks collection
                const collection = db.collection('ToDoTasks');
                // Find some documents
                collection.find({ _id: ObjectId(id) }).toArray(function (err, docs) {
                    if (err) {
                        reject(err)
                    } else {
                        const results = {
                            data: docs[0],
                            msg: "Found the following records"
                        }

                        client.close();
                        resolve(results);
                    }
                });
            }
        });
    })
    return iou;
}

const readTasks = () => {
    let iou = new Promise((resolve, reject) => {
    // Use connect method to connect to the server
        MongoClient.connect(url, settings, function (err, client) {
            if(err){
            reject(err)
            }else{
                console.log("Connected to server read tasks");

                const db = client.db(dbName);
                // Get the contacts collection
                const collection = db.collection('ToDoTasks');
                // Find some documents
                collection.find({}).toArray(function (err, docs) {
                    if(err){
                        reject(err)
                    }else{
                        const results = {
                            data: docs,
                            msg: "Found the following records"
                        }
                        
                        client.close();
                        resolve(results);
                    }
                });
            }
        });
    })
    return iou;
}

const readLists = () => {
    let iou = new Promise((resolve, reject) => {
    // Use connect method to connect to the server
        MongoClient.connect(url, settings, function (err, client) {
            if(err){
            reject(err)
            }else{
                console.log("Connected to server read tasks");

                const db = client.db(dbName);
                // Get the contacts collection
                const collection = db.collection('ToDoLists');
                // Find some documents
                collection.find({}).toArray(async function (err, docs) {
                    if(err){
                        reject(err)
                    }else{
                        const filterList = async () => {
                            let listList = []
                            for(i = 0; i < docs.length; i++){
                                let todoTasks = []
                                for(j = 0; j < docs[i].todos.length; j++){
                                    const task = await readTaskById(docs[i].todos[j])
                                    todoTasks.push(task.data.title)
                                }
                                listList.push(
                                    {title : docs[i].title,
                                    data : todoTasks})
                            }
                            return listList
                        }
                        
                        const results = {
                            data: await filterList(),
                            msg: "Found the following records"
                        }
                        
                        client.close();
                        resolve(results);
                    }
                });
            }
        });
    })
    return iou;
}

const updateTask = (id, task) => {
    let iou = new Promise((resolve, reject) => {
        
        // Use connect method to connect to the server
        MongoClient.connect(url, settings, function (err, client) {
            if (err) {
                reject(err)
            }
            else{
                console.log("Connected to server to Update a Task");

                const db = client.db(dbName);
                // Get the contacts collection
                const collection = db.collection('ToDoTasks');
                // Insert a document
                collection.updateOne({ "_id": ObjectId(id) }, 
                    { $set: { "complete": task } },
                    function (err, result) {
                        if(err){
                            reject(err)
                        }  else{
                            client.close();
                            resolve("Updated a document in the collection");
                        }
                });
            }
        });
    })
    return iou
}

const updateList = (id, todos) => {
    let iou = new Promise((resolve, reject) => {
        
        // Use connect method to connect to the server
        MongoClient.connect(url, settings, function (err, client) {
            if (err) {
                reject(err)
            }
            else{
                console.log("Connected to server to Update a List");

                const db = client.db(dbName);
                // Get the contacts collection
                const collection = db.collection('ToDoLists');
                // Insert a document
                collection.updateOne({ "_id": ObjectId(id) }, 
                    { $push: { todos } },
                    function (err, result) {
                        if(err){
                            reject(err)
                        }  else{
                            client.close();
                            resolve("Updated a document in the collection");
                        }
                });
            }
        });
    })
    return iou
}

const deleteTask = (task) => {
    let iou = new Promise ((resolve, reject) => {
        // Use connect method to connect to the server
        MongoClient.connect(url, settings, function (err, client) {
            if(err){
               reject(err) 
            } else {
                console.log("Connected to server to Delete a Task");
                const db = client.db(dbName);
                // Get the contacts collection
                const collection = db.collection('ToDoTasks');
                // Insert a document
                collection.deleteMany({ 'listTitle': task },
                    function (err, result) {
                        if(err){
                            reject(err)
                        } else {
                            client.close();
                            resolve("Delete documents in the collection")
                        }
                        
                    });
            }          
       }); 
    })
    return iou
};

const deleteList = (list) => {
    let iou = new Promise ((resolve, reject) => {
        // Use connect method to connect to the server
        MongoClient.connect(url, settings, function (err, client) {
            if(err){
               reject(err) 
            } else {
                console.log("Connected to server to Delete a List");
                const db = client.db(dbName);
                // Get the contacts collection
                const collection = db.collection('ToDoLists');
                // Insert a document
                collection.deleteMany({ 'title': list },
                    function (err, result) {
                        if(err){
                            reject(err)
                        } else {
                            client.close();
                            resolve("Delete documents in the collection")
                        }
                        
                    });
            }          
       }); 
    })
    return iou
};


module.exports = {testConnection, newTask, readTasks, updateTask, deleteTask, newList, readLists, updateList, deleteList}