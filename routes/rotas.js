const {Router} = require('express');

const {rotasCompanhiasAereas} = require('./rotasCompanhiasAereas');

const {rotasPilotos} = require('./rotasPilotos');

const {rotasVoos} = require('./rotasVoos');

const { login } = require('../controllers/segurancaController');

const rotas = new Router();

rotas.route('/login').post(login);

rotas.use(rotasCompanhiasAereas);

rotas.use(rotasPilotos);

rotas.use(rotasVoos);

module.exports = rotas;