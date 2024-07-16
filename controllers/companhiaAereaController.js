const { response } = require('express');
const {getCompanhiasAereasDB, getCompanhiaAereaPorCodigoDB, addCompanhiaAereaDB, updateCompanhiaAereaDB, deleteCompanhiaAereaDB} = require('../usecases/companhiaAereaUseCases')

const getCompanhiasAereas = async (request, response) => {
    await getCompanhiasAereasDB().then(data => response.status(200).json(data)).catch(err => response.status(400).json({
        status : 'error', message : 'Erro ao consultar as Companhias Aéreas: ' + err
    }))
}

const addCompanhiaAerea = async (request, response) => {
    await addCompanhiaAereaDB(request.body).then(data => response.status(200).json({
        status : "success", message : "Companhia Aérea cadastrada", objeto : data
    }))
    .catch(err => response.status(400).json({
        status : 'error', message :  err
    }))
}

const updateCompanhiaAerea = async (request, response) => {
    await updateCompanhiaAereaDB(request.body).then(data => response.status(200).json({
        status : "success", message : "Companhia Aérea alterada", objeto : data
    }))
    .catch(err => response.status(400).json({
        status : 'error', message : err
    }))
}

const deleteCompanhiaAerea = async (request, response) => {
    await deleteCompanhiaAereaDB(request.params.codigo).then(data => response.status(200).json({
        status : "success", message : data
    }))
    .catch(err => response.status(400).json({
        status : 'error', message : err
    }))
}

const getCompanhiaAereaPorCodigo = async (request, response) => {
    await getCompanhiaAereaPorCodigoDB(request.params.codigo)
          .then(data => response.status(200).json(data))
          .catch(err => response.status(400).json({
            status : 'error',
            message : err
          }))
}

module.exports = {getCompanhiaAereaPorCodigo, getCompanhiasAereas, addCompanhiaAerea, updateCompanhiaAerea, deleteCompanhiaAerea}; 