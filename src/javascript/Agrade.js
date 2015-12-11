/**
 @file Arquivo define class App

 @author Otho
 */
(function () {

    /**
     Classe do programa Agrade

     @class
     @author Otho
     */
    function App() {
        //this.modelo = new Agrade.Modelo();
        this.modelo = {};
        this.visao = new Agrade.Visao(this.template);
        this.controlador = new Agrade.Controlador(this.modelo, this.visao);
    }

    App.prototype.versao = '0.1.0-beta';
    window.Agrade = window.Agrade || {};
    window.Agrade.App = new App();
})();
