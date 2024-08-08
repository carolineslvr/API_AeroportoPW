const { pool } = require('../config')
const Usuario = require('../entities/Usuario')

const autenticaUsuarioDB = async (body) => {
    try {           
        const { nomeUser, senha } = body
        const results = await pool.query(`SELECT * FROM usuarios WHERE nomeuser = $1 AND senha = $2`,
        [nomeUser, senha]);
        
        if (results.rowCount == 0) {
            throw "Usuário ou senha inválidos";
        }
        const usuario = results.rows[0];
        return new Usuario(usuario.nomeUser, usuario.tipo, usuario.telefone, usuario.nome);
    } catch (err) {
        throw "Erro ao autenticar o usuário: " + err;
    }    
}

module.exports = {
    autenticaUsuarioDB
}
