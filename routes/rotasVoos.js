const {Router, urlencoded} = require('express');
const {getVoos, getVooPorCodigo, addVoo, updateVoo, deleteVoo} = require('../controllers/vooController');

const rotasVoos = new Router();

rotasVoos.route('/voo')
.get(getVoos)
.post(addVoo)
.put(updateVoo);

rotasVoos.route('/voo/:codigo')
.get(getVooPorCodigo)
.delete(deleteVoo);

module.exports = {rotasVoos};