const mongoose = require('mongoose');

const conn = mongoose.createConnection(process.env.db,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true,
    });
module.exports = conn;