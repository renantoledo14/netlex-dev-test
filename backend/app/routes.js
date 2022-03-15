const { Router } = require('express');
var cors = require('cors');

const routes = new Router();

routes.use(cors());

routes.get('/', (req, res) => {
    res.send({message: "netLex backend test!"});
})

module.exports = routes;