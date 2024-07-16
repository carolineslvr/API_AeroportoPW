const {Router, urlencoded} = require('express');
const {getPilotos, getPilotoPorCodigo, addPiloto, updatePiloto, deletePiloto} = require('../controllers/pilotoController');

const rotasPilotos = new Router();

rotasPilotos.route('/piloto')
.get(getPilotos)
.post(addPiloto)
.put(updatePiloto);

rotasPilotos.route('/piloto/:codigo')
.get(getPilotoPorCodigo)
.delete(deletePiloto);

module.exports = {rotasPilotos};