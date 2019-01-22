export default class Persistencia {
    carregar(chave) {
        if (typeof localStorage[chave] !== "undefined") {
            return JSON.parse(localStorage[chave]);
        } else {
            return false;
        }
    }

    salvarLocalmente(disciplinas, chave) {
        localStorage[chave] = JSON.stringify(disciplinas);
    }
}
