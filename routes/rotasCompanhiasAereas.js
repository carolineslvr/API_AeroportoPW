const {Router, urlencoded} = require('express');
const {getCompanhiasAereas, getCompanhiaAereaPorCodigo, addCompanhiaAerea, updateCompanhiaAerea, deleteCompanhiaAerea} = require('../controllers/companhiaAereaController');

const rotasCompanhiasAereas = new Router();

rotasCompanhiasAereas.route('/companhiaaerea')
.get(getCompanhiasAereas)
.post(addCompanhiaAerea)
.put(updateCompanhiaAerea);

rotasCompanhiasAereas.route('/companhiaaerea/:codigo')
.get(getCompanhiaAereaPorCodigo)
.delete(deleteCompanhiaAerea);

module.exports = {rotasCompanhiasAereas};