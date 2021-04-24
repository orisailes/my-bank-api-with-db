const express = require('express');
const utils = require('./utils');
const path = require('path');
const router = new express.Router();
router.use(express.json());


if (process.env.NODE_ENV === "production") {
    router.use(express.static(path.join(__dirname, '../../client/build')))
} else {
    router.use(express.static(path.join(__dirname, '../../client/public')))
}

router.post('/api/clients', async (req, res) => {
    console.log('new client request commited');
    const result = await utils.createClient(req.body);
    typeof result === "string" ? res.status(206).send(result) : typeof result === "object" ? res.status(201).send(result) : null
})

router.get('/api/clients', async (req, res) => {
    console.log(`get all clients commited`);
    const result = await utils.getAllClients();
    result ? res.send(result) : res.send('problem at getting all clients')
})

router.get('/api/accounts/:id', async (req, res) => {
    const {
        id
    } = req.params;
    console.log(`get account by id commited`);
    const result = await utils.getAccountById(id)
    result ? res.send(result) : res.send('cannot get account')
})

router.get('/api/clients/:id', async (req, res) => {
    const {
        id
    } = req.params
    console.log(`get client commited`);
    const result = await utils.getClientById(id);
    result ? res.send(result) : res.send("client not found");
})

router.put('/api/accounts/desposit/cash/:id', async (req, res) => {
    const {
        id
    } = req.params;
    let {
        amount
    } = req.query;
    console.log(`put client commited - desposit cash`);
    if (amount > 0) {
        const result = await utils.despositCash(id, amount);
        result ? res.send(result) : res.send('desposit doesnt commited, please try again later');
    } else {
        res.status(206).send('amount is invalid')
    }
})

router.put('/api/accounts/desposit/credit/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const {
        amount
    } = req.query;
    console.log(`put client commited - change credit status`);
    let result;
    if (amount > 0) {
        result = await utils.updateCredit(id, amount)
        res.status(200).send(result);
    }
    if (amount <= 0) res.status(206).send(`invalid credit change`)
})

router.put('/api/accounts/withdraw/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const {
        amount
    } = req.query;
    console.log(`put request commited - withdraw cash`);
    if (amount < 0) res.status(206).send('invalid withdraw request')
    const result = await utils.withdrawMoney(id, amount);
    res.status(200).send(result);
})

router.put('/api/accounts/transfer', async (req, res) => {
    const {
        from,
        to,
        amount
    } = req.query;
    if (!from || !to || !amount) res.status(400).send('invalid queries. transfer hasnt been made')
    if (amount < 0) res.status(206).send('amount has to be positive number')
    console.log('put request commited - transferm money');
    const result = await utils.transferMoney(from, to, amount)
    result ? res.send(result) : res.status(206).send('invalid transfer request')
})

router.delete('/api/clients/:id', async (req, res) => {
    const id = req.params;
    let result;
    if (id) {
        console.log('delete by id request comitted');
        result = await utils.deleteClientById(id);
    }
    result ? res.send(result) : res.send('delete doesnt comitted')
})

router.delete('/api/clients/', async (req, res) => {
    const {
        id
    } = req.params;
    console.log(`delete all records comitted`);
    const result = await utils.deleteEverything()
    result ? res.send(result) : res.send('cannot get account')
})


module.exports = router