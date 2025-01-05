class Carro {
    constructor(car) {
        this.modelo = car.modelo;
        this.ano = car.ano;
        this.cor = car.cor;
    }

    info() {
        return `${this.modelo} ${this.cor} ano ${this.ano}`;
    }
}

/* Não modifique o código abaixo! */
export function execute(car) { return new Carro(car).info(); }
