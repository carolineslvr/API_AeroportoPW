const {Router} = require('express');

const {rotasCompanhiasAereas} = require('./rotasCompanhiasAereas');

const {rotasPilotos} = require('./rotasPilotos');

const {rotasVoos} = require('./rotasVoos');

const rotas = new Router();

rotas.use(rotasCompanhiasAereas);

rotas.use(rotasPilotos);

rotas.use(rotasVoos);

module.exports = rotas;