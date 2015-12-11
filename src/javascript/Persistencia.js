/**
 @file Arquivo que define modulo de pesistencia do programa Agrade

 @author Otho
 */
(function () {

    /**
     Classe estatica de persistência do programa Agrade

     @author Otho
     */
    function Persistencia() {

    }

    /**
     Tentamos carregar do objeto localstorage a string com a chave passada

     @param {String}
     @returns {false | Object}
     */
    Persistencia.prototype.carregar = function (chave) {
        if (typeof localStorage[chave] !== 'undefined') {
            return JSON.parse(localStorage[chave]);
        } else {
            return false;
        }
    };

    /**
     Salvamos no objeto localstorage o conjunto de disciplinas alteradas na
     chave que representa o caminho do curso.

     @param {Array.{String}}
     @param {String}
     */
    Persistencia.prototype.salvarLocalmente = function (disciplinas, chave) {
        localStorage[chave] = JSON.stringify(disciplinas);
    };

    window.Agrade = window.Agrade || {};
    window.Agrade.Persistencia = new Persistencia();
})();
