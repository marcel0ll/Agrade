/**
    @file Esse arquivo define a classe para a Visao do programa 'Agrade'

    @author Otho
*/
(function ( ) {

    /**
        Classe da Visao do programa Agrade

        @class
        @author Otho
    */
    function Visao ( template ) {
        //Use o construtor do Controlador de eventos para que a visao tenha os
        //atributos necessários para usar suas funções
        Agrade.ControladorDeEvento.apply( this );

        this.template = template;

        $(document).ready(this.iniciar.bind( this ));
    }

    //Adicionar as funções do prototipo de controlador de eventos no prototipo da Visao
    Agrade.Util.mixInto( Visao.prototype, Agrade.ControladorDeEvento.prototype );

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
        this.$sanfonaMestre = $('#topBar-minimizar');
        this.$desfazerTodos = $('#topBar-desfazer');
        this.$sairDeCurso = $('#topBar-sair');
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

        this.$sanfonaMestre.click( this._aoClicarSanfonaMestre.bind(this) );
        this.$desfazerTodos.click( this._aoClicarDesfazerTodos.bind(this) );
        this.$maisDetalhes.click( this._aoClicarMaisDetalhes.bind(this) );
        this.$sairDeCurso.click( this._aoClicarSair.bind(this) );
        this.$barraDePesquisa.keyup( this._aoAlterarPesquisa.bind(this) );

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
        var i;

        this.$porcentagemDoCurso.text( ( ( curso.totalDeCreditosFeitos * 100 ) / curso.totalDeCreditos ).toFixed( 2 ) + '%' );
        this.$creditosFeitos.text( curso.totalDeCreditosFeitos );
        this.$creditosParaFazer.text( curso.totalDeCreditos );
        this.$barraDoTopoNomeDoCurso.text( curso.nome );

        this.$dadosDeConjuntos.empty();

        this.$dadosDeConjuntos.append( this.template.conjuntoCabecalho );

        for( i = 0; i < curso.conjuntos.length; i++ ) {
            var
            conjunto = curso.conjuntos[i],
            template = this.template.conjuntoLinha,
            porcentagemDoCurso = ( ( conjunto.creditosFeitos * 100 ) / conjunto.creditos ).toFixed( 2 );

            template.replace( '{{nome}}', conjunto.nome );
            template.replace( '{{creditosFeitos}}', conjunto.creditosFeitos );
            template.replace( '{{creditosTotais}}', conjunto.creditos );
            template.replace( '{{disciplinasFeitas}}', conjunto.disciplinasFeitas );
            template.replace( '{{disciplinasTotais}}', conjunto.disciplinas );
            template.replace( '{{disciplinasTotais}}', conjunto.disciplinas );
            template.replace( '{{porcentagem}}', porcentagemDoCurso );

            this.$dadosDeConjuntos.append( $( template ) );
        }
    };

    /**
    */
    Visao.prototype.preencherDisciplinas = function ( disciplinas ) {
        var i, id;

        //Garanta que a lista está vazia
        this.$listaDeDisciplinas.empty();

        if( disciplinas instanceof Array ) {
            for( i = 0; i < disciplinas.length; i++ ) {
                var disciplina = disciplinas[i];

                this._adicionarDisciplina( disciplina );
            }
        } else {
            for( id in disciplinas ) {
                this._adicionarGrupo( id, disciplinas[id], $conteudoDoGrupo );
            }
        }
    };

    /**

    */
    Visao.prototype.minimizarTodosGrupos = function ( ) {
        this._minimizarGrupos( this.$listaDeDisciplinas );
    };

    /**

    */
    Visao.prototype.expandirTodosGrupos = function ( ) {
        this._expandirGrupos( this.$listaDeDisciplinas );
    };


    /**
    */
    Visao.prototype._adicionarGrupo = function ( id, grupo, $pai ) {
        var
        template = this.template.grupo;
        $grupo,
        $conteudoDoGrupo,
        $sanfona;

        if( disciplinas instanceof Array ) {
            for( i = 0; i < disciplinas.length; i++ ) {
                var disciplina = disciplinas[i];

                this._adicionarDisciplina( disciplina );
            }
        } else {
            template.replace( '{{id}}', id );

            $grupo = $( template );
            $conteudoDoGrupo = $( '.conteudo', $grupo );
            $sanfona = $( '.sanfona', $grupo );

            // Adicionar evento ao clique em $sanfona
            $sanfona.click( this._aoClicarSanfona );

            for( id in disciplinas ) {
                this._adicionarGrupo( grupo.id, disciplinas[id], $conteudoDoGrupo );
            }
        }
    };

    /**
    */
    Visao.prototype._adicionarDisciplina = function ( disciplina, $pai ) {
        var
        template = this.template.disciplina,
        $disciplina,
        $checkbox,
        $info;

        template = Util.replaceAll( template, '{{id}}', disciplina.id);
        template = Util.replaceAll( template, '{{nome}}', disciplina.nome);

        $disciplina = $( template );

        // Adicionar evento ao clique em $checkbox
        $checkbox.click( this._aoClicarDisciplina );

        // Adicionar evento ao clique em $info
        $info.click( this._aoClicarInformacao );

        $pai.append( $disciplina );
    };

    /**
    */
    Visao.prototype.atualizarDisciplinas = function ( disciplinas ) {
        var i;

        for( i = 0; i< disciplinas.length; i++ ) {
            this._atualizarDisciplina( disciplinas[i] );
        }
    };

    /**
    */
    Visao.prototype._atualizarDisciplina = function ( disciplina ) {
        var $disciplina = this._get$disciplina( disciplina.id );

        if( disciplina.liberada ) {
            $disciplina.removeClass('trancada');
            if( disciplina.feita ) {
                $disciplina.addClass('feita');
            } else {
                $disciplina.removeClass('feita');
            }
        } else {
            $disciplina.removeClass('feita');
            $disciplina.addClass('trancada');
        }
    };

    /**
    */
    Visao.prototype._get$disciplina = function( id ) {
        return $( $( '.checkbox[data-id=' + id + ']')[0] );
    };

    /**

    */
    Visao.prototype._minimizarGrupos = function( $contexto ) {
        var i,
        $grupos = $( '.grupo', $contexto );

        for( i = 0; i < $grupos.length; i++ ) {
            $grupo = $grupos[i];

            this._minimizarGrupo( $grupo );
        }
    };

    /**

    */
    Visao.prototype._minimizarGrupo = function ( $grupo ) {
        var
        $sanfona = $( '.sanfona', $grupo ),
        $conteudo = $( '.conteudo', $grupo );

        $sanfona.addClass('glyphicon-plus');
        $sanfona.removeClass('glyphicon-minus');

        $conteudo.hide();
    };

    /**

    */
    Visao.prototype._expandirGrupos = function( $contexto ) {
        var i,
        $grupos = $( '.grupo', $contexto );

        for( i = 0; i < $grupos.length; i++ ) {
            $grupo = $grupos[i];

            this._expandirGrupo( $grupo );
        }
    };

    /**

    */
    Visao.prototype._expandirGrupo = function ( $grupo ) {
        var
        $sanfona = $( '.sanfona', $grupo ),
        $conteudo = $( '.conteudo', $grupo );

        $sanfona.removeClass('glyphicon-plus');
        $sanfona.addClass('glyphicon-minus');

        $conteudo.show();
    }

    /**

    */
    Visao.prototype._alternarGrupo = function ( $grupo ) {
        var
        $sanfona = $( '.sanfona', $grupo ),
        $conteudo = $( '.conteudo', $grupo );

        $sanfona.toggleClass('glyphicon-plus');
        $sanfona.toggleClass('glyphicon-minus');

        $conteudo.toggle();
    };


    /**
    */
    Visao.prototype._aoClicarSair = function ( evento ) {
        this.emitir('cliqueEmSairDeCurso');
    };

    /**
    */
    Visao.prototype._aoClicarDesfazerTodos = function ( evento ) {
        this.emitir('cliqueEmDesfazerTodos');
    };

    /**
    */
    Visao.prototype._aoClicarSanfonaMestre = function ( evento ) {
        this.emitir('cliqueEmSanfonaMestre');
    };

    /**
    */
    Visao.prototype._aoAlterarPesquisa = function ( evento ) {
        var
        pesquisa = $barraDePesquisa.val();

        this.emitir( 'alterarPesquisa', pesquisa );
    };

    /**
    */
    Visao.prototype._aoClicarDisciplina = function ( evento ) {
        var
        $disciplina = $( evento.target ),
        id = $disciplina.attr('data-id');

        this.emitir( 'cliqueEmDisciplina', id );
        evento.stopPropagation();
    };

    /**
    */
    Visao.prototype._aoClicarInformacao = function ( evento ) {
        var
        $info = $( evento.target ),
        id = $info.attr('data-id');

        this.emitir( 'cliqueEmInformacao', id );
        evento.stopPropagation();
    };

    /**
    */
    Visao.prototype._aoClicarSanfona = function ( evento ) {
        var
        $this = $( this ),
        $grupo = $this.parent().parent();

        this._alternarGrupo( $grupo );
        evento.stopPropagation();
    };

    /**

    */
    Visao.prototype._aoClicarMaisDetalhes = function ( evento ) {
        this.$maisDetalhes.toggleClass('glyphicon-minus');
        this.$maisDetalhes.toggleClass('glyphicon-plus');

        this.$camadaBarraDoTopo.toggleClass( 'aberta' );
        this.$camadaBarraDoTopo.toggleClass( 'fechada' );
    };

    window.Agrade = window.Agrade || { };
    window.Agrade.Visao = Visao;
})();
