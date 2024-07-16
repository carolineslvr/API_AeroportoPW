class Piloto {
    constructor(codigo, nome, numeroLicenca, tipoLicenca, dataNascimento, anosExperiencia){
        this.codigo = codigo;
        this.nome = nome;
        this.numeroLicenca = numeroLicenca;
        this.tipoLicenca = tipoLicenca;
        this.dataNascimento = dataNascimento;
        this.anosExperiencia = anosExperiencia;
    }
}

module.exports = Piloto;