/**
    @file Arquivo define class App

    @author Otho
 */
(function ( ) {

    /**
        Classe do programa Agrade

        @class
        @author Otho
    */
    function App ( ) {
        this.template = new Pogad.Template ( );
        this.persistencia = new Pogad.Persistencia ( );
        this.modelo = new Pogad.Modelo ( this.persistencia );
        this.visao = new Pogad.Visao ( this.template );
        this.controlador = new Pogad.Controlador ( this.modelo, this.visao);
    }

    App.prototype.versao = '0.1.0-beta';

    window.Agrade = window.Pogad || { };
    window.Agrade.App = App;
})();
