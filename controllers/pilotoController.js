const { response } = require('express');
const {getPilotosDB, getPilotoPorCodigoDB, addPilotoDB, updatePilotoDB, deletePilotoDB} = require('../usecases/pilotoUseCases')

const getPilotos = async (request, response) => {
    await getPilotosDB().then(data => response.status(200).json(data)).catch(err => response.status(400).json({
        status : 'error', message : 'Erro ao consultar pilotos: ' + err
    }))
}

const addPiloto = async (request, response) => {
    await addPilotoDB(request.body).then(data => response.status(200).json({
        status : "success", message : "Piloto cadastrado", objeto : data
    }))
    .catch(err => response.status(400).json({
        status : 'error', message :  err
    }))
}

const updatePiloto = async (request, response) => {
    await updatePilotoDB(request.body).then(data => response.status(200).json({
        status : "success", message : "Piloto alterado", objeto : data
    }))
    .catch(err => response.status(400).json({
        status : 'error', message : err
    }))
}

const deletePiloto = async (request, response) => {
    await deletePilotoDB(request.params.codigo).then(data => response.status(200).json({
        status : "success", message : data
    }))
    .catch(err => response.status(400).json({
        status : 'error', message : err
    }))
}

const getPilotoPorCodigo = async (request, response) => {
    await getPilotoPorCodigoDB(request.params.codigo)
          .then(data => response.status(200).json(data))
          .catch(err => response.status(400).json({
            status : 'error',
            message : err
          }))
}

module.exports = {getPilotos, getPilotoPorCodigo, addPiloto, updatePiloto, deletePiloto}; 