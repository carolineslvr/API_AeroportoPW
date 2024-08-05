const {Router, urlencoded} = require('express');
const {getPilotos, getPilotoPorCodigo, addPiloto, updatePiloto, deletePiloto} = require('../controllers/pilotoController');
const { verificaJWT } = require('../controllers/segurancaController');

const rotasPilotos = new Router();

rotasPilotos.route('/piloto')
.get(verificaJWT, getPilotos)
.post(verificaJWT, addPiloto)
.put(verificaJWT, updatePiloto);

rotasPilotos.route('/piloto/:codigo')
.get(verificaJWT, getPilotoPorCodigo)
.delete(verificaJWT, deletePiloto);

module.exports = {rotasPilotos};