(function ( ) {

    function View ( template, version ) {        
        this.template = template;

        this.$camadaCarregando = $('#carregando');

        this.$camadaSeletor = $('#seletor');
        this.$majorDropdown =  $('#cursoSelector');
        this.$loadMajor = $('#carregar');

        this.$camadaLista = $('#lista');
        this.$list = $('#lista-disciplinas');
        this.$majorName = $('#lista-nomeCurso');

        this.$camadaQuery = $('#query');
        this.$percentage = $('#topBar-data__porcentagemDoCurso-conteudo');
        this.$creditsDone = $('#topBar-data__creditosFeitos');
        this.$creditsToDo = $('#topBar-data__creditosTotais');
        this.$topBarMajorName = $('#topBar-data__nomeCurso');
        
        this.initEvent = new Pogad.Event( this );
        this.majorLoadEvent = new Pogad.Event( this );

        $(document).ready(this.init.bind(this));

        $('.footer-version').text(version);
    }

    View.prototype.init = function ( ) {
        var fullPath,
            path;

        //Pegue a URL inteira do browser
        fullPath = window.location.href;

        //Separe ela pelo '#'' e pegue a segunda parte        
        path = fullPath.split('#')[1];

        //Notifique que o aplicativo foi iniciado com esse caminho        
        this.initEvent.notify( path );
    };

    View.prototype.initMajorSelection = function ( majorList ) {
        console.log("initMajorSelection");

        this.$majorDropdown.selectize({
                    maxItems: 1,
                    valueField: 'url',
                    labelField: 'name',
                    searchField: 'name',
                    options: majorList,
                    items: [majorList[0].url],
                    create: false
                });  

        this.$camadaCarregando.hide();  

        this.$loadMajor.click(this.majorLoad.bind(this));  
    };

    View.prototype.initMajorList = function ( major ) {
        var _this = this;
        console.log(major);
        if(this.template.majorItem){
            this.$camadaCarregando.hide();
            this.$camadaSeletor.hide();
            this.$camadaLista.show();
            this.$camadaQuery.show();

            this.$percentage.text('0%');
            this.$creditsDone.text(0);
            this.$creditsToDo.text('?');
            this.$topBarMajorName.text(major.nome);

            this.doList( major.disciplinas );
        }else{
            this.$camadaCarregando.show();            
            this.template.majorItemLoadEvent.onEventCall(function ( ) {
                _this.initMajorList( );
            });
        }
    }

    View.prototype.majorLoad = function ( ) {
        var path = this.$majorDropdown[0].selectize.getValue();

        this.majorLoadEvent.notify( path );
    }

    View.prototype.doList = function ( disciplines ) {
        console.log(major);
    }

    View.prototype.updatePercentage = function ( ) { }
    View.prototype.updateCredits = function ( ) { }

    View.prototype.itemLock = function ( id ) {};
    View.prototype.itemUnlock = function ( id ) {};

    View.prototype.itemDo = function ( id ) {};
    View.prototype.itemUndo = function ( id ) {};

    window.Pogad = window.Pogad || { };
    window.Pogad.View = View;
})();