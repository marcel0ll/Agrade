(function ( ) {

    function Persistencia ( ) {

    }
    
    Persistencia.prototype.carregar = function ( chave ) {
        if(typeof localStorage[chave] !== 'undefined' ){
            return JSON.parse(localStorage[chave]);
        }else{
            return false;
        }
    }

    Persistencia.prototype.salvarLocalmente = function ( disciplinas, chave ) {        
        localStorage[chave] = JSON.stringify(disciplinas);        
    }

    window.Pogad = window.Pogad || { };
    window.Pogad.Persistencia = Persistencia;
})();