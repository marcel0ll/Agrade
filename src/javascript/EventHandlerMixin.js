/**
    @file Arquivo define classe com funcionalidades de evento para ser
adicionada nas classes que precisam emitir eventos e chamar callbacks.

    @author Otho
*/
(function () {

    /**
        Classe de mixin para controle de Eventos

        @mixin
        @class

        @author Otho
    */
    function ControladorDeEvento ( ) {
        this._handlers = {};
    }

    /**
        Adiciona uma função de callback para quando for emitido 'evento'

        @param {String}
        @param {Function}
    */
    ControladorDeEvento.prototype.ao = function ( evento, callback ) {
        if( typeof this._handlers[evento] === 'undefined' &&  typeof callback === 'function')
            this._handlers[evento] = [];

        this._handlers[evento].push( callback );
    };

    /**
        Emita 'evento' e chama todas as funções de callback passando o objeto
    de argumentos

        @param {String}
        @param {Object}
    */
    ControladorDeEvento.prototype.emitir = function ( evento, argumentos ) {
        if(typeof this._handlers[evento] !== 'undefined') {
            for( i = 0; i < this._handlers[evento].length; i++){
                var handler = this._handlers[evento][i];
                handler( argumentos );
            }
        }
    };

    window.Agrade = window.Agrade || { };
    window.Agrade.ControladorDeEvento = ControladorDeEvento;
})();
