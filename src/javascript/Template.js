(function ( ) {

    function Template ( ) {
        this.separators = ['<h3 class="separador col-md-12 col-sm-12 col-xs-12">', '<h4 class="separador col-md-12 col-sm-12 col-xs-12">', '<p class="separador col-md-12 col-sm-12 col-xs-12">'];
        this._majorItem;

        this.majorItemLoadEvent = new Pogad.Event ( this );

        this.requestHtmlFiles();
    }

    Template.prototype.requestHtmlFiles = function ( ) {
        var _this = this;
        $.ajax({
            url : './assets/html/majorItem.html',
            datatype: 'html'
        })
        .success(function ( data ) {
            _this._majorItem = data;
            _this.majorItemLoadEvent.notify( true );
        })
        .error(function ( ) {
            _this.majorItemLoadEvent.notify( false );
            throw new Error('Error: Falha ao carregar modelos de html, favor reporte esse erro');
        });
    }

    Object.defineProperty(Template.prototype, 'majorItem', {
        get: function ( ) { 
            if(this._majorItem){
                return this._majorItem;
            }else{
                return false;
            }
        }
    });

    window.Pogad = window.Pogad || { };
    window.Pogad.Template = Template;
})( );