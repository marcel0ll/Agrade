/**
    @file Arquivo define modulo Utilitário para o programa Agrade

    @author Otho
*/
(function () {

    /**
        Classe estatica com funções utéis ao programa Agrade

        @author Otho
    */
    function Util () {

    }

    /**
        Função mistura atributos de dois objetos. Não sobreescreve
    atributos já existentens a menos que seja forçado

        @param {Object}
        @param {Object}
        @param {Boolean}
    */
    Util.prototype.mixInto = function ( obj, extra, force) {
        var x;

        for( x in extra ) {
            if( typeof obj[x] === 'undefined' || force ) {
                if( typeof extra[x] === 'function' ) {
                    obj[x] = extra[x];
                } else {
                    obj[x] = extra[x];
                }
            }
        }
    };

    /**
        Função pesquisa todas as insidencias de uma string em outra
    e as substitui por um valor

        @param {String}
        @param {String}
        @param {String}
    */
    Util.prototype.replaceAll = function ( original, from, to ) {
        return original.replace( new RegExp( from, 'g' ), to );
    };

    window.Agrade = window.Agrade || {};
    window.Agrade.Util = Util.prototype;
})();
