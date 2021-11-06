const Crypto = require('crypto');
var Transaction = require("../models/transactions");
var Customer = require("../models/customers");
const axios = require("axios")
const {generateTransactionId} = require("../lib/unique_generator");

const index = async function () {

}

const verifyTransaction = async function (request, response) {
    let {CHECKSUMHASH, txn_id} = request.body;
    return response.send({
        success: 1,
        msg: "Payment Fetched",
        data: {
            success: status === "success"
        }
    })

}

const initiateOrder = async function (request, response) {
    return response.send({
        success: 1,
        msg: "Payment Initiated",
        data: {
        }
    })
}

module.exports = {
    index,
    initiateOrder,
    verifyTransaction
}