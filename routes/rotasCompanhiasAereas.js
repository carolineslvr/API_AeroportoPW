const {Router, urlencoded} = require('express');
const {getCompanhiasAereas, getCompanhiaAereaPorCodigo, addCompanhiaAerea, updateCompanhiaAerea, deleteCompanhiaAerea} = require('../controllers/companhiaAereaController');
const { verificaJWT } = require('../controllers/segurancaController');

const rotasCompanhiasAereas = new Router();

rotasCompanhiasAereas.route('/companhiaaerea')
.get(getCompanhiasAereas)
.post(verificaJWT, addCompanhiaAerea)
.put(verificaJWT, updateCompanhiaAerea);

rotasCompanhiasAereas.route('/companhiaaerea/:codigo')
.get(verificaJWT, getCompanhiaAereaPorCodigo)
.delete(verificaJWT, deleteCompanhiaAerea);

module.exports = {rotasCompanhiasAereas};

