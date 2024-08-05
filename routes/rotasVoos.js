const {Router, urlencoded} = require('express');
const {getVoos, getVooPorCodigo, addVoo, updateVoo, deleteVoo} = require('../controllers/vooController');
const { verificaJWT } = require('../controllers/segurancaController');

const rotasVoos = new Router();

rotasVoos.route('/voo')
.get(verificaJWT, getVoos)
.post(verificaJWT, addVoo)
.put(verificaJWT, updateVoo);

rotasVoos.route('/voo/:codigo')
.get(verificaJWT, getVooPorCodigo)
.delete(verificaJWT, deleteVoo);

module.exports = {rotasVoos};