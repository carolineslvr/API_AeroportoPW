const { pool } = require('../config');
const CompanhiaAerea = require('../entities/CompanhiaAerea');

const getCompanhiasAereasDB = async () => {
    try {    
        const { rows } = await pool.query('SELECT * FROM companhiasAereas ORDER BY nome');
        return rows.map((companhiaAerea) => new CompanhiaAerea(companhiaAerea.codigo, companhiaAerea.nome,
            companhiaAerea.codiata, companhiaAerea.pais));        
    } catch (err) {
        throw "Erro ao buscar Companhias Aéreas: " + err;
    }
}

const addCompanhiaAereaDB = async (body) => {
    try {   
        const { nome, codIATA, pais } = body; 
        const results = await pool.query(
            `INSERT INTO companhiasAereas (nome, codIATA, pais) 
            VALUES ($1, $2, $3)
            RETURNING codigo, nome, codIATA, pais`,
            [nome, codIATA, pais]
        );
        const companhiaAerea = results.rows[0];
        return new CompanhiaAerea(companhiaAerea.codigo, companhiaAerea.nome, companhiaAerea.codiata, companhiaAerea.pais); 
    } catch (err) {
        throw "Erro ao inserir a Companhia Aérea: " + err;
    }    
}

const updateCompanhiaAereaDB = async (body) => {
    try {   
        const { codigo, nome, codIATA, pais } = body; 
        const results = await pool.query(
            `UPDATE companhiasAereas 
            SET nome = $2, codIATA = $3, pais = $4 
            WHERE codigo = $1 
            RETURNING codigo, nome, codIATA, pais`,
            [codigo, nome, codIATA, pais]
        );        
        if (results.rowCount === 0) {
            throw `Nenhuma Companhia Aérea encontrada com o código ${codigo} para ser alterada`;
        }
        const companhiaAerea = results.rows[0];
        return new CompanhiaAerea(companhiaAerea.codigo, companhiaAerea.nome, companhiaAerea.codiata, companhiaAerea.pais); 
    } catch (err) {
        throw "Erro ao alterar dados da Companhia Aérea: " + err;
    }      
}

const deleteCompanhiaAereaDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM companhiasAereas where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhuma Companhia Aérea encontrada com o código ${codigo} para ser removida`;
        } else {
            return "Companhia Aérea removida com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover a Companhia Aérea: " + err;
    }     
}

const getCompanhiaAereaPorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`SELECT * FROM companhiasAereas WHERE codigo = $1`, [codigo]);
        if (results.rowCount === 0) {
            throw `Nenhuma Companhia Aérea encontrada com o código: ${codigo}`;
        } else {
            const companhiaAerea = results.rows[0];
            return new CompanhiaAerea(companhiaAerea.codigo, companhiaAerea.nome, companhiaAerea.codiata, companhiaAerea.pais); 
        }       
    } catch (err) {
        throw "Erro ao recuperar dados da Companhia Aérea:  " + err;
    }     
}

module.exports = {
    getCompanhiasAereasDB, addCompanhiaAereaDB, updateCompanhiaAereaDB, deleteCompanhiaAereaDB, getCompanhiaAereaPorCodigoDB
}
