const Paytm = require('paytmchecksum');
const Crypto = require('crypto');
var Transaction = require("../models/transactions");
var Customer = require("../models/customers");
const axios = require("axios")
const {generateTransactionId} = require("../lib/unique_generator");

const index = async function () {

}

const verifyTransaction = async function (request, response) {
    let {CHECKSUMHASH, txn_id} = request.body;
    let status = "failed"
    let txn_details = await Transaction.findOne({_id: txn_id});
    if (!txn_details)
        return response
            .code(400)
            .send({
                success: 0,
                msg: "Payment Failed",
            })
    var paytmParams = {};
    paytmParams.body = {
        "mid": process.env.PaytmMID,
        "orderId": txn_id
    };
    let checksum_body = JSON.stringify(paytmParams.body);
    var paytmChecksum = await Paytm.generateSignature(checksum_body, process.env.PaytmMerchantKey);
    paytmParams.head = {
        "signature": paytmChecksum
    };
    let req = await axios.post("https://securegw-stage.paytm.in/v3/order/status", paytmParams)
    let resp_data = req.data;
    if (resp_data && resp_data.body) {
        if (resp_data.body.resultInfo.resultStatus === "TXN_SUCCESS") {
            status = "success";
        } else {
            status = "failed"
        }
        txn_details.provider_details = resp_data.body;
        txn_details.status = status;
        txn_details.mode = resp_data.body.paymentMode;
        txn_details.provider_txn_id = resp_data.body.txnId;
        await txn_details.save()
    }
    return response.send({
        success: 1,
        msg: "Payment Fetched",
        data: {
            success: status === "success"
        }
    })

}

const initiateOrder = async function (request, response) {
    var txn_id = generateTransactionId();
    let {phone_number, email_id, name, order_id, amount} = request.body;
    var hash = Crypto.createHash('md5').update(phone_number + email_id).digest('hex');
    let customer = await Customer.findOne({_id: "cust_" + hash});
    if (!customer) {
        customer = new Customer({
            _id: "cust_" + hash,
            phone_number,
            email_id,
            name
        })
        customer = await customer.save();
    }
    txn_id = "order_" + txn_id;
    let transaction = new Transaction({
        _id: txn_id,
        order_id,
        provider: "paytm",
        preferred_mode: "na",
        amount,
        status: "initiated",
        txn_type: "ot_order",
        customer_id: customer._id
    })
    await transaction.save();
    var paytmParams = {};
    paytmParams.body = {
        "requestType": "Payment",
        "mid": process.env.PaytmMID,
        "websiteName": "WEBSTAGING",
        "orderId": txn_id,
        "txnAmount": {
            "value": amount,
            "currency": "INR",
        },
        "userInfo": {
            "custId": customer._id
        },
    };
    let checksum_body = JSON.stringify(paytmParams.body);
    var paytmChecksum = await Paytm.generateSignature(checksum_body, process.env.PaytmMerchantKey);
    paytmParams.head = {
        "signature": paytmChecksum
    };
    let req = await axios.post("https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=" + process.env.PaytmMID + "&orderId=" + txn_id, paytmParams)
    let data = req.data;
    return response.send({
        success: 1,
        msg: "Payment Initiated",
        data: {
            paytmChecksum,
            order_id: txn_id,
            paytm_txn_token: data.body.txnToken,
            customer_id: customer._id
        }
    })
}

module.exports = {
    index,
    initiateOrder,
    verifyTransaction
}