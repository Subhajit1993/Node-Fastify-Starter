var axios = require("axios");
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const moment = require("moment")

var generateTransactionId = function (condition) {
    var starting_number = 100000000;
    return (moment().unix())
};

module.exports = {
    generateTransactionId
};