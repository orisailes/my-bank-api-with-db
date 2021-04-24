const Client = require('../model/client');
const Account = require('../model/account');
const {
    ObjectID
} = require('mongodb');
const mongoose = require('mongoose')


const getAllClients = async () => {
    let clients = [];
    try {
        clients = await Client.find({});
        return clients;
    } catch (err) {
        return clients;
    }
}

const getClientById = async (id) => {
    const found = await Client.findById(id);
    console.log(mongoose.Types.ObjectId.isValid(id));
    return found;
}

const getAccountById = async (id) => {
    const found = await Account.findById(id);
    return found;
}

const createClient = async (body) => {
    let newClient = new Client(body);
    let newAccount;
    try {
        newClient = await newClient.save();
        newAccount = await new Account();
        newAccount._id = new ObjectID(newClient._id);
        try {
            newAccount = await newAccount.save();
        } catch (err) {
            await Client.findByIdAndDelete(newClient._id)
            return 'fail to create account'
        }
    } catch (err) {
        return err.message;
    }
    return newClient;
}

const despositCash = async (id, amount) => {
    const result = await Account.findByIdAndUpdate(id, {
        $inc: {
            cash: amount
        }
    }, {
        new: true,
        runValidators: true
    });
    return result;
}

const updateCredit = async (id, amount) => {
    console.log('asdaasdasd');
    const result = await Account.findByIdAndUpdate(id, {
        credit: amount
    }, {
        new: true,
        runValidators: true
    });
    return result;
}

const withdrawMoney = async (id, amount) => {
    let result;
    try {
        const accountFound = await Account.findById(id);
        if (accountFound.cash - amount >= accountFound.credit * -1) {
            accountFound.cash = accountFound.cash - amount
        } else {
            return 'not enough funds'
        }
        result = await accountFound.save();
    } catch (err) {
        return err.message
    }
    return result
}

const transferMoney = async (fromID, toID, amount) => {
    let isValid = false;
    let fromClient;
    let toClient;
    let fromClientResult;
    let toClientResult;
    try {
        fromClient = await Account.findById(fromID);
        toClient = await Account.findById(toID);
        if (fromClient.cash - amount >= fromClient.credit * -1) isValid = true; // make transfer validation 
        if (isValid) {
            fromClient.cash = fromClient.cash - amount;
            toClient.cash = Number(toClient.cash) + Number(amount);
            fromClientResult = await fromClient.save();
            toClientResult = await toClient.save();
        } else {
            return false
        }
    } catch (err) {
        return false
    }

    return [fromClientResult, toClientResult]
}

const deleteClientById = async (id) => {
    let result = []
    id = new ObjectID(id.id)
    try {
        const clientRemove = await Client.findByIdAndRemove(id);
        const accountRemove = await Account.findByIdAndRemove(id)
        result.push(clientRemove, accountRemove)
        return result
    } catch (err) {
        return err.message
    }
}
const deleteEverything = async () => {
    try {
        const deletedClient = await Client.deleteMany();
        const deletedAccount = await Account.deleteMany();
        return 'all clients and account deleted'
    } catch (err) {
        return err.message
    }
}

module.exports = {
    getAllClients,
    createClient,
    getAccountById,
    despositCash,
    updateCredit,
    getClientById,
    withdrawMoney,
    transferMoney,
    deleteClientById,
    deleteEverything
}