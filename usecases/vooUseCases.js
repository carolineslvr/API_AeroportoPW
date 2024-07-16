const { pool } = require('../config');
const Voo = require('../entities/Voo');

const getVoosDB = async () => {
    try {    
        const { rows } = await pool.query(`SELECT v.codigo, v.numerovoo, v.origem, v.destino, v.datapartida, 
                v.horapartida, v.datachegada, v.horachegada, ca.nome AS companhiaaerea_nome, p.nome AS piloto_nome FROM 
                voos v JOIN companhiasaereas ca ON v.companhiaaerea = ca.codigo JOIN pilotos p ON v.piloto = p.codigo
                ORDER BY v.codigo`);
        console.log(rows);
        return rows.map((voo) => new Voo(
            voo.codigo, 
            voo.numerovoo, 
            voo.origem, 
            voo.destino,
            voo.datapartida, 
            voo.horapartida,
            voo.datachegada,
            voo.horachegada, 
            voo.companhiaaerea,
            voo.companhiaaerea_nome, 
            voo.piloto,
            voo.piloto_nome
        ));        
    } catch (err) {
        throw "Erro ao buscar voos: " + err;
    }
}
const addVooDB = async (body) => {
    try {   
        const { numeroVoo, origem, destino, dataPartida, horaPartida, dataChegada, horaChegada, companhiaAerea, piloto } = body; 
        const results = await pool.query(
            `INSERT INTO voos (numeroVoo, origem, destino, dataPartida, horaPartida, dataChegada, horaChegada, companhiaAerea, piloto) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING codigo, numeroVoo, origem, destino, dataPartida, horaPartida, dataChegada, horaChegada, companhiaAerea, piloto`,
            [numeroVoo, origem, destino, dataPartida, horaPartida, dataChegada, horaChegada, companhiaAerea, piloto]
        );
        const voo = results.rows[0];
        return new Voo(voo.codigo, voo.numerovoo, voo.origem, voo.destino, voo.datapartida, voo.horapartida, voo.datachegada, voo.horachegada, voo.companhiaaerea, "", voo.piloto, ""); 
    } catch (err) {
        throw "Erro ao inserir voo: " + err;
    }    
}

const updateVooDB = async (body) => {
    try {   
        const { codigo, numeroVoo, origem, destino, dataPartida, horaPartida, dataChegada, horaChegada, companhiaAerea, piloto } = body; 
        const results = await pool.query(
            `UPDATE voos 
            SET numeroVoo = $2, origem = $3, destino = $4, dataPartida = $5, horaPartida = $6, dataChegada = $7, horaChegada = $8, companhiaAerea = $9, piloto = $10 
            WHERE codigo = $1 
            RETURNING codigo, numeroVoo, origem, destino, dataPartida, horaPartida, dataChegada, horaChegada, companhiaAerea, piloto`,
            [codigo, numeroVoo, origem, destino, dataPartida, horaPartida, dataChegada, horaChegada, companhiaAerea, piloto]
        );        
        if (results.rowCount === 0) {
            throw `Nenhum voo encontrado com o código ${codigo} para ser alterado`;
        }
        const voo = results.rows[0];
        return new Voo(voo.codigo, voo.numerovoo, voo.origem, voo.destino, voo.datapartida, voo.horapartida, voo.datachegada, voo.horachegada, voo.companhiaaerea, "", voo.piloto, ""); 
    } catch (err) {
        throw "Erro ao alterar dados do voo: " + err;
    }      
}

const deleteVooDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM voos where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Voo removido com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover voo: " + err;
    }     
}

const getVooPorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`SELECT v.codigo, v.numerovoo, v.origem, v.destino, v.datapartida, 
                v.horapartida, v.datachegada, v.horachegada, v.companhiaaerea, v.piloto, ca.nome AS companhiaaerea_nome, p.nome AS piloto_nome FROM 
                voos v JOIN companhiasaereas ca ON v.companhiaaerea = ca.codigo JOIN pilotos p ON v.piloto = p.codigo
                WHERE v.codigo = $1`, [codigo]);
        if (results.rowCount === 0) {
            throw new Error(`Nenhum voo encontrado com o código: ${codigo}`);
        } else {
            const voo = results.rows[0];
            return new Voo(voo.codigo, voo.numerovoo, voo.origem, voo.destino, voo.datapartida, 
            voo.horapartida, voo.datachegada, voo.horachegada, voo.companhiaaerea, voo.companhiaaerea_nome, 
            voo.piloto, voo.piloto_nome); 
        }       
    } catch (err) {
        throw "Erro ao recuperar dados do voo:  " + err;
    }     
}
module.exports = {
    getVoosDB, addVooDB, updateVooDB, deleteVooDB, getVooPorCodigoDB
}

