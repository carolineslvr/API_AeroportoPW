const { pool } = require('../config');
const Piloto = require('../entities/Piloto');

const getPilotosDB = async () => {
    try {    
        const { rows } = await pool.query('SELECT * FROM pilotos ORDER BY nome');
        console.log(rows);
        return rows.map((piloto) => new Piloto(piloto.codigo, piloto.nome,
            piloto.numerolicenca, piloto.tipolicenca, piloto.datanascimento, piloto.anosexperiencia));        
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addPilotoDB = async (body) => {
    try {   
        const { nome, numeroLicenca, tipoLicenca, dataNascimento, anosExperiencia } = body; 
        const results = await pool.query(
            `INSERT INTO pilotos (nome, numeroLicenca, tipoLicenca, dataNascimento, anosExperiencia) 
            VALUES ($1, $2, $3, $4, $5)
            RETURNING codigo, nome, numeroLicenca, tipoLicenca, dataNascimento, anosExperiencia`,
            [nome, numeroLicenca, tipoLicenca, dataNascimento, anosExperiencia]
        );
        const piloto = results.rows[0];
        return new Piloto(piloto.codigo, piloto.nome, piloto.numerolicenca, piloto.tipolicenca, piloto.datanascimento, piloto.anosexperiencia); 
    } catch (err) {
        throw "Erro ao inserir piloto: " + err;
    }    
}

const updatePilotoDB = async (body) => {
    try {   
        const { codigo, nome, numeroLicenca, tipoLicenca, dataNascimento, anosExperiencia } = body; 
        const results = await pool.query(
            `UPDATE pilotos 
            SET nome = $2, numeroLicenca = $3, tipoLicenca = $4, dataNascimento = $5, anosExperiencia = $6 
            WHERE codigo = $1 
            RETURNING codigo, nome, numeroLicenca, tipoLicenca, dataNascimento, anosExperiencia`,
            [codigo, nome, numeroLicenca, tipoLicenca, dataNascimento, anosExperiencia]
        );        
        if (results.rowCount === 0) {
            throw `Nenhum piloto encontrado com o código ${codigo} para ser alterado`;
        }
        const piloto = results.rows[0];
        return new Piloto(piloto.codigo, piloto.nome, piloto.numerolicenca, piloto.tipolicenca, piloto.datanascimento, piloto.anosexperiencia); 
    } catch (err) {
        throw "Erro ao alterar dados do piloto: " + err;
    }      
}

const deletePilotoDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM pilotos where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum piloto encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Piloto removido com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover piloto: " + err;
    }     
}

const getPilotoPorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`SELECT * FROM pilotos WHERE codigo = $1`, [codigo]);
        if (results.rowCount === 0) {
            throw new Error(`Nenhum piloto encontrado com o código: ${codigo}`);
        } else {
            const piloto = results.rows[0];
            return new Piloto(piloto.codigo, piloto.nome, piloto.numerolicenca, piloto.tipolicenca, piloto.datanascimento, piloto.anosexperiencia); 
        }       
    } catch (err) {
        throw "Erro ao recuperar dados do piloto:  " + err;
    }     
}

module.exports = {
    getPilotosDB, addPilotoDB, updatePilotoDB, deletePilotoDB, getPilotoPorCodigoDB
}

