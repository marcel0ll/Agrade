(function ( ) {

    function App ( ) {
        this.versao = '0.0.12-beta';
        this.template = new Pogad.Template ( );
        this.persistencia = new Pogad.Persistencia ( );
        this.modelo = new Pogad.Modelo ( this.persistencia );
        this.visao = new Pogad.Visao ( this.template, this.versao );
        this.controlador = new Pogad.Controlador ( this.modelo, this.visao);
    }

    window.Pogad = window.Pogad || { };
    window.Pogad.app = new App();
})();