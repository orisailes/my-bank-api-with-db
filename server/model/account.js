const mongoose = require('mongoose');

const Account = mongoose.model("accounts", {
    isActive: {
        type: Boolean,
        default: true
    },
    cash: {
        type: Number,
        min: 0,
        default: 0
    },

    credit: {
        type: Number,
        default: 0,
        min: 0,

    },

    _id: {
        type: ObjectId,
    }

})


module.exports = Account;