const db = require("../config/db");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var timestamps = require('mongoose-unix-timestamp-plugin');

const si_tokens = new Schema({
    txn_id: {
        type: String
    },
    token: {
        type: String
    },
    active:{
        required:true,
        default:true,
        type:Boolean
    }
}, {_id: false});

const customersModel = new Schema({
    _id: {
        type: String,
        required: true,
        unique: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    name:{
        type: String,
    },
    phone_number:{
        type: String,
        unique: true,
    },
    email_id: {
        type: String,
    },
    preferred_instrument_type:{
        type: String,
    }
});

customersModel.plugin(timestamps,  {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});
module.exports = db.model('Customers', customersModel, 'customers');
