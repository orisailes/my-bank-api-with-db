const express = require('express')
require('./db/mongoose')
const bankRoute = require('./router/my_bank')
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(bankRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server is on http://localhost:${port}`);
})