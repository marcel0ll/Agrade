(function () {

    function ControladorDeEvento ( ) {
        this._handlers = {};
    }

    ControladorDeEvento.prototype.ao = function ( evento, callback ) {
        if( typeof this._handlers[evento] === 'undefined' &&  typeof callback === 'function')
            this._handlers[evento] = [];

        this._handlers[evento].push( callback );
    };

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
