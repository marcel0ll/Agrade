( function ( ) {

    function Template ( ) {
        // this.separadores = ['<h3 class="col-md-12 col-sm-12 col-xs-12">', '<h4 class="col-md-12 col-sm-12 col-xs-12">', '<p class="col-md-12 col-sm-12 col-xs-12">'];
        this.separadores = ['<h3 class="titulo row">', '<h4 class="titulo row">', '<p class="titulo row">'];
        // this.separadorConteudo = '<div class="separador-conteudo col-md-12 col-sm-12 col-xs-12">';
        this.separadorConteudo = '<div class="separador-conteudo row">';
        this._itemCurso;

        this.caregarItemCursoEvent = new Pogad.Event ( this );

        this.requisitarArquivosHtml( );
    }

    Template.prototype.requisitarArquivosHtml = function ( ) {
        var _this = this;
        $.ajax({
            url : './assets/html/itemCurso.html',
            datatype: 'html'
        })
        .success(function ( data ) {
            _this._itemCurso = data;
            _this.caregarItemCursoEvent.notify( true );
        })
        .error(function ( ) {
            _this.caregarItemCursoEvent.notify( false );
            throw new Error( 'Error: Falha ao carregar "itemCurso.html", favor reporte esse erro' );
        });
    }

    Object.defineProperty(Template.prototype, 'itemCurso', {
        get: function ( ) { 
            if( this._itemCurso ){
                return this._itemCurso;
            }else{
                return false;
            }
        }
    });

    window.Pogad = window.Pogad || { };
    window.Pogad.Template = Template;
} )( );