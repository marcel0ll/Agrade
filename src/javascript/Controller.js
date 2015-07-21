(function ( ) {

    function Controller ( model, view ) {
        this.model = model;
        this.view = view;

        this.view.initEvent.onEventCall(this.onInit, this);
        this.view.majorLoadEvent.onEventCall(this.onMajorSelect, this);

        this.model.loadMajorEvent.onEventCall(this.onMajorLoad, this);
        this.model.loadMajorListEvent.onEventCall(this.onMajorListLoad, this);
    }   

    Controller.prototype.onInit = function ( path ) {
        console.log("Controller: " + path);

        if( path ){
            this.onMajorSelect( path );            
        } else {
            this.model.loadMajorList();
        }
    };

    Controller.prototype.onMajorListLoad = function ( suceeded, majorList ) {
        if(suceeded){
            this.view.initMajorSelection( majorList );
        }else{
            alert('Erro: Arquivo de setup não encontrado ou inválido.\nPor favor reporte esse em https://github.com/0tho/Pogad/issues');
        }
    };

    Controller.prototype.onMajorLoad = function ( suceeded, major ) {
        if(suceeded){
            this.view.initMajorList( major );
        }else {
            this.model.loadMajorList();
        }
    }

    Controller.prototype.onMajorSelect = function ( path ) {
        this.model.loadMajor( path );        
    };
    Controller.prototype.onInfoSelect = function ( ) {};

    Controller.prototype.onGroupCollapse = function ( ) {};

    Controller.prototype.onQueryChange = function ( ) {};

    window.Pogad = window.Pogad || {};
    window.Pogad.Controller = Controller;
})();