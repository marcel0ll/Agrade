(function ( ) {

    function App ( ) {
        this.version = '0.0.2';
        this.template = new Pogad.Template ( );
        this.storage = new Pogad.Storage ( );
        this.model = new Pogad.Model ( this.storage );
        this.view = new Pogad.View ( this.template, this.version );
        this.controller = new Pogad.Controller ( this.model, this.view);
    }

    window.Pogad = window.Pogad || { };
    window.Pogad.app = new App();
})();