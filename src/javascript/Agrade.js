(function ( ) {

    function App ( ) {
        this.versao = '0.0.15-beta';
        this.template = new Agrade.Template ( );
        this.persistencia = new Agrade.Persistencia ( );
        this.modelo = new Agrade.Modelo ( this.persistencia );
        this.visao = new Agrade.Visao ( this.template, this.versao );
        this.controlador = new Agrade.Controlador ( this.modelo, this.visao);
    }

    window.Agrade = window.Agrade || { };
    window.Agrade.app = new App();
})();
