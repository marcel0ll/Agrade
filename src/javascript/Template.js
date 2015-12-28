/**
    @file Arquivo define classe Template responsável por carregar os templates
em html para que sejam usadas pela Visao

    @author Otho
*/
(function () {

    /**
        Classe responsável por carregar templates html

        @author Otho
    */
    function Template () {
        //Use o construtor do Controlador de eventos para que o template tenha
        //os atributos necessários para usar suas funções
        Agrade.ControladorDeEvento.apply( this );

        this._conjuntoCabecalho = false;
        this._conjuntoLinha = false;

        this._grupo = false;

        this._disciplina = false;

        this.requisitarArquivosHtml();
    }

    //Adicionar as funções do prototipo de controlador de eventos no prototipo
    //de Template
    Agrade.Util.mixInto( Template.prototype, Agrade.ControladorDeEvento.prototype );

    /**

    */
    Template.prototype.requisitarTemplateConjuntoCabecalho = function () {
        $.ajax({
            url : './assets/html/conjuntoCabecalho.html',
            datatype: 'html'
        })
        .success(function ( data ) {
            this._conjuntoCabecalho = data;

            if( this._conjuntoLinha ) {
                this.emitir('carregarCabecalho');
            }
        }.bind( this ) )
        .error(function ( ) {
            throw new Error( 'Error: Falha ao carregar "conjuntoCabecalho.html", favor reporte esse erro' );
        }.bind( this ) );
    };

    /**

    */
    Template.prototype.requisitarTemplateConjuntoLinha = function () {
        $.ajax({
            url : './assets/html/conjuntoLinha.html',
            datatype: 'html'
        })
        .success(function ( data ) {
            this._conjuntoLinha = data;

            if( this._conjuntoCabecalho ) {
                this.emitir('carregarCabecalho');
            }
        }.bind( this ) )
        .error(function ( ) {
            throw new Error( 'Error: Falha ao carregar "conjuntoLinha.html", favor reporte esse erro' );
        }.bind( this ) );
    };

    /**

    */
    Template.prototype.requisitarTemplateGrupo = function () {
        $.ajax({
            url : './assets/html/grupo.html',
            datatype: 'html'
        })
        .success(function ( data ) {
            this._grupo = data;

            this.emitir('carregarGrupo');
        }.bind( this ) )
        .error(function ( ) {
            throw new Error( 'Error: Falha ao carregar "grupo.html", favor reporte esse erro' );
        }.bind( this ) );
    };

    /**

    */
    Template.prototype.requisitarTemplateDisciplina = function () {
        $.ajax({
            url : './assets/html/disciplina.html',
            datatype: 'html'
        })
        .success(function ( data ) {
            this._disciplina = data;

            this.emitir('carregarDisciplina');
        }.bind( this ) )
        .error(function ( ) {
            throw new Error( 'Error: Falha ao carregar "disciplina.html", favor reporte esse erro' );
        }.bind( this ) );
    };

    /**

    */
    Template.prototype.requisitarArquivosHtml = function () {
        this.requisitarTemplateConjuntoLinha();
        this.requisitarTemplateGrupo();
        this.requisitarTemplateConjuntoCabecalho();
        this.requisitarTemplateDisciplina();
    };

    Object.defineProperty(Template.prototype, 'conjuntoCabecalho', {
        get: function ( ) {
            return this._conjuntoCabecalho;
        }
    });

    Object.defineProperty(Template.prototype, 'conjuntoLinha', {
        get: function ( ) {
            return this._conjuntoLinha;
        }
    });

    Object.defineProperty(Template.prototype, 'grupo', {
        get: function ( ) {
            return this._grupo;
        }
    });

    Object.defineProperty(Template.prototype, 'disciplina', {
        get: function ( ) {
            return this._disciplina;
        }
    });

    window.Agrade = window.Agrade || {};
    window.Agrade.Template = new Template();
})();
