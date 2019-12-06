const mongoose = require('mongoose')

const testConnection = () => {
    mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', () => {
        console.log('Connected')
    });
}
