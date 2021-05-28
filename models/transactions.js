const db = require("../config/db");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var timestamps = require('mongoose-unix-timestamp-plugin');

const transactionModel = new Schema({
    _id: {
        type: String,
        required: true,
        unique: true
    },
    active:{
        type: Boolean,
        required: true,
        default:true
    },
    description:{
        type: String,
        default:"Transaction Details",
        required: true
    },
    provider:{
        type: String,
        required: true,
        enum:["paytm"],
        default: "paytm"
    },
    provider_details:{
        type: Object,
    },
    provider_txn_id:{
        type: String,
    },
    mode:{
        type: String
    },
    preferred_mode:{
        type: String,
        enum:["credit_card", "debit_card", "net_banking", "upi", "na"],
    },
    amount:{
        type: Number,
        required: true,
    },
    status:{
        type: String,
        enum: ["success", "initiated", "failed", "attempted"],
        default:"initiated"
    },
    customer_id:{
        type:String,
        required:true
    },
    txn_type:{
        type: String,
        enum: ["refund", "ot_order",],
        required: true
    },
    order_id:{ // Transaction id passed from other service eg. OrderId, BillId
        type: String,
    }
});

transactionModel.plugin(timestamps,  {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});
module.exports = db.model('Transactions', transactionModel, 'transactions');
