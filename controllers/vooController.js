const { response } = require('express');
const {getVoosDB, getVooPorCodigoDB, addVooDB, updateVooDB, deleteVooDB} = require('../usecases/vooUseCases')

const getVoos = async (request, response) => {
    await getVoosDB().then(data => response.status(200).json(data)).catch(err => response.status(400).json({
        status : 'error', message : 'Erro ao consultar voos: ' + err
    }))
}

const addVoo = async (request, response) => {
    await addVooDB(request.body).then(data => response.status(200).json({
        status : "success", message : "Voo adicionado", objeto : data
    }))
    .catch(err => response.status(400).json({
        status : 'error', message :  err
    }))
}

const updateVoo = async (request, response) => {
    await updateVooDB(request.body).then(data => response.status(200).json({
        status : "success", message : "Voo alterado", objeto : data
    }))
    .catch(err => response.status(400).json({
        status : 'error', message : err
    }))
}

const deleteVoo = async (request, response) => {
    await deleteVooDB(request.params.codigo).then(data => response.status(200).json({
        status : "success", message : data
    }))
    .catch(err => response.status(400).json({
        status : 'error', message : err
    }))
}

const getVooPorCodigo = async (request, response) => {
    await getVooPorCodigoDB(request.params.codigo)
          .then(data => response.status(200).json(data))
          .catch(err => response.status(400).json({
            status : 'error',
            message : err
          }))
}

module.exports = {getVoos, getVooPorCodigo, addVoo, deleteVoo, updateVoo}; 