class Voo {
    constructor(codigo, numeroVoo, origem, destino, dataPartida, horaPartida, dataChegada, horaChegada,
        companhiaAerea, companhiaAerea_nome, piloto, piloto_nome) {
        this.codigo = codigo;
        this.numeroVoo = numeroVoo;
        this.origem = origem;
        this.destino = destino;
        this.dataPartida = dataPartida;
        this.horaPartida = horaPartida;
        this.dataChegada = dataChegada;
        this.horaChegada = horaChegada;
        this.companhiaAerea = companhiaAerea;
        this.companhiaAerea_nome = companhiaAerea_nome;
        this.piloto = piloto;
        this.piloto_nome = piloto_nome;
    }
}

module.exports = Voo;
