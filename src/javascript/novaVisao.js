/**
    @file Esse arquivo define a classe para a Visao do programa 'Agrade'

    @author Otho
*/
(function ( ) {

    /**
        Lista de eventos da Visao

        @const
        @enum
        @author Otho
    */
    // var EVENTOS = {
    //     iniciar : 'iniciar',
    //     selecionarCurso: 'selecionarCurso',
    //     selecionarUniversidade: 'selecionarUniversidade',
    //     cliqueEmDisciplina: 'cliqueEmDisciplina',
    //     cliqueEmInformacao: 'cliqueEmInformacao',
    //     confirmarDesfazerTodos: 'confirmarDesfazerTodos',
    //     mudarPesquisa: 'mudarPesquisa',
    //     sairDeCurso: 'sairDeCurso'
    // };

    /**
        Classe da Visao do programa Agrade

        @class
        @author Otho
    */
    function Visao ( template ) {
        //Use o construtor do Controlador de eventos para que a visao tenha os
        //atributos necessários para usar suas funções
        Agrade.ControladorDeEvento.apply(this);

        this.template = template;

        $(document).ready(this.iniciar.bind(this));
    }

    //Adicionar as funções do prototipo de controlador de eventos no prototipo da Visao
    Agrade.Util.mixInto(Visao.prototype, Agrade.ControladorDeEvento.prototype);

    /**
    */
    Visao.prototype.iniciar = function () {
        var
        //Pegue a url após '#' do browser
        caminho = window.location.hash;

        //Pegue os elementos do DOM
        this.$camadaCarregando = $('#carregando');

        this.$camadaSeletor = $('#seletor');
        this.$cursosDropdown =  $('#cursoSeletor');
        this.$universidadesDropdown =  $('#universidadeSeletor');
        this.$carregarCurso = $('#carregar');

        this.$camadaLista = $('#lista');
        this.$listaDeDisciplinas = $('#lista-disciplinas');
        this.$nomeDoCurso = $('#lista-nomeCurso');

        this.$camadaBarraDoTopo = $('#query');
        this.$maisDetalhes = $('#more__plus');
        this.$minimizar = $('#topBar-minimizar');
        this.$desfazerTodos = $('#topBar-desfazer');
        this.$dadosDeConjuntos = $('#topBar-dataConjuntos');
        this.$porcentagemDoCurso = $('#topBar-data__porcentagemDoCurso-conteudo');
        this.$creditosFeitos = $('#topBar-data__creditosFeitos');
        this.$creditosParaFazer = $('#topBar-data__creditosTotais');
        this.$barraDoTopoNomeDoCurso = $( '#topBar-data__nomeCurso' );
        this.$barraDePesquisa = $('#query-input');

        this.$versao = $('.footer-version');

        //Iniciar seletores
        //Crie seletor de universidades
        this.$universidadesDropdown.selectize({
                    maxItems: 1,
                    valueField: 'url',
                    labelField: 'nome',
                    searchField: 'nome',
                    openOnFocus: false,
                    create: false
                });

        //Crie seletor de cursos
        this.$cursosDropdown.selectize({
                    maxItems: 1,
                    valueField: 'url',
                    labelField: 'nome',
                    searchField: 'nome',
                    openOnFocus: false,
                    create: false
                });

        //Desabilite seletor de universidades
        this.$universidadesDropdown[0].selectize.disable();

        //Desabilite seletor de cursos
        this.$cursosDropdown[0].selectize.disable();

        //Coloque a versao do programa do rodapé
        this.$versao.text( Agrade.prototype.versao );

        //TODO colocar os eventos nos botoes/seletores/inputs

        //Avise que o programa foi iniciado
        this.emitir( 'iniciar', caminho );
    };

    /**
    */
    Visao.prototype.definirUrl = function ( url ) {
        //Define a hash da url
        window.location.hash = url;
    };

    /**
    */
    Visao.prototype.mudarTelaParaCarregar = function () {
        this.$camadaCarregando.show();

        this.$camadaSeletor.hide();

        this.$camadaLista.hide();
        this.$camadaBarraDoTopo.hide();
    };
    /**
    */
    Visao.prototype.mudarTelaParaSelecao = function () {
        this.$camadaSeletor.show();

        this.$camadaCarregando.hide();

        this.$camadaLista.hide();
        this.$camadaBarraDoTopo.hide();
    };
    /**
    */
    Visao.prototype.mudarTelaParaCurso = function () {
        this.$camadaLista.show();
        this.$camadaBarraDoTopo.show();

        this.$camadaCarregando.hide();

        this.$camadaSeletor.hide();
    };

    /**
    */
    Visao.prototype.listarUniversidades = function ( listaDeUniversidades) {
        this.$universidadesDropdown[0].selectize.clearOptions();
        this.$universidadesDropdown[0].selectize.addOption( listaDeUniversidades );
        this.$universidadesDropdown[0].selectize.enable();
    };
    /**
    */
    Visao.prototype.listarCursos = function ( listaDeCursos ) {
        this.$cursosDropdown[0].selectize.clearOptions();
        this.$cursosDropdown[0].selectize.addOption( listaDeUniversidades );
        this.$cursosDropdown[0].selectize.enable();
    };

    /**
    */
    Visao.prototype.preencherCabecalho = function ( cabecalho ) {
        this.$porcentagemDoCurso.text( ( ( curso.totalDeCreditosFeitos * 100 ) / curso.totalDeCreditos ).toFixed( 2 ) + '%' );
        this.$creditosFeitos.text( curso.totalDeCreditosFeitos );
        this.$creditosParaFazer.text( curso.totalDeCreditos );
        this.$barraDoTopoNomeDoCurso.text( curso.nome );

        this.$dadosDeConjuntos.empty();

        this.$dadosDeConjuntos.append( this.template.conjuntoCabecalho );

        for( i = 0; i < curso.conjuntos.length; i++ ){
            var
            conjunto = curso.conjuntos[i],
            $conjunto = this.template.conjuntoLinha,
            porcentagemDoCurso = ( ( conjunto.creditosFeitos * 100 ) / conjunto.creditos ).toFixed( 2 );

            $conjunto.replace( '{{nome}}', conjunto.nome );
            $conjunto.replace( '{{creditosFeitos}}', conjunto.creditosFeitos );
            $conjunto.replace( '{{creditosTotais}}', conjunto.creditos );
            $conjunto.replace( '{{disciplinasFeitas}}', conjunto.disciplinasFeitas );
            $conjunto.replace( '{{disciplinasTotais}}', conjunto.disciplinas );
            $conjunto.replace( '{{disciplinasTotais}}', conjunto.disciplinas );
            $conjunto.replace( '{{porcentagem}}', porcentagemDoCurso );

            this.$dadosDeConjuntos.append( $conjunto );
        }
    };
    /**
        @TODO preencherDisciplinas
    */
    Visao.prototype.preencherDisciplinas = function ( disciplinas ) {
        //Garanta que a lista está vazia
        this.$listaDeDisciplinas.empty();


    };

    /**
        @TODO atualizarDisciplinas
    */
    Visao.prototype.atualizarDisciplinas = function ( disciplinas ) {

    };


    window.Agrade = window.Agrade || { };
    window.Agrade.Visao = Visao;
})();
