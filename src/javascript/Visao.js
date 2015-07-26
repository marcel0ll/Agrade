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

    //Adicionar as funções do prototipo de controlador de eventos no prototipo
    //da Visao
    Agrade.Util.mixInto( Visao.prototype, Agrade.ControladorDeEvento.prototype );

    /**
        Assim que o html tiver carregado, pegamos o endereço hash da url e
    avisamos que a Visao foi iniciada
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

        //Adicione eventos aos botões e inputs
        this.$universidadesDropdown[0].selectize.on( "change", this._aoSelecionarUniversidade.bind( this ) );
        this.$carregarCurso.click( this._aoSelecionarCurso.bind( this ) );

        this.$sanfonaMestre.click( this._aoClicarSanfonaMestre.bind( this ) );
        this.$desfazerTodos.click( this._aoClicarDesfazerTodos.bind( this ) );
        this.$maisDetalhes.click( this._aoClicarMaisDetalhes.bind( this ) );
        this.$sairDeCurso.click( this._aoClicarSair.bind( this ) );
        this.$barraDePesquisa.keyup( this._aoAlterarPesquisa.bind( this ) );

        //Avise que o programa foi iniciado
        this.emitir( 'iniciar', caminho );
    };

    /**
        Define o endereço hash da url
    */
    Visao.prototype.definirUrl = function ( url ) {
        //Define a hash da url
        window.location.hash = url;
    };

    /**
        Muda para a tela de carregamento
    */
    Visao.prototype.mudarTelaParaCarregar = function () {
        this.$camadaCarregando.show();

        this.$camadaSeletor.hide();

        this.$camadaLista.hide();
        this.$camadaBarraDoTopo.hide();
    };

    /**
        Muda para a tela de seleção de curso
    */
    Visao.prototype.mudarTelaParaSelecao = function () {
        this.$camadaSeletor.show();

        this.$camadaCarregando.hide();

        this.$camadaLista.hide();
        this.$camadaBarraDoTopo.hide();
    };

    /**
        Muda a tela para a exibição de disciplinas
    */
    Visao.prototype.mudarTelaParaCurso = function () {
        this.$camadaLista.show();
        this.$camadaBarraDoTopo.show();

        this.$camadaCarregando.hide();

        this.$camadaSeletor.hide();
    };

    /**
        Coloca na lista de universidades as opções de universidades existentes
    */
    Visao.prototype.listarUniversidades = function ( listaDeUniversidades) {
        this.$universidadesDropdown[0].selectize.clearOptions();
        this.$universidadesDropdown[0].selectize.addOption( listaDeUniversidades );
        this.$universidadesDropdown[0].selectize.enable();
    };

    /**
        Coloca na lista de cursos as opções de cursos existentes
    */
    Visao.prototype.listarCursos = function ( listaDeCursos ) {
        this.$cursosDropdown[0].selectize.clearOptions();
        this.$cursosDropdown[0].selectize.addOption( listaDeUniversidades );
        this.$cursosDropdown[0].selectize.enable();
    };

    /**
        Coloca as informações do cabeçalho do curso na barra de informações
    no topo da tela
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
        Coloca os grupos e as disciplinas em tela para que o usuário possa
    interagir
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
        Minimiza todos os grupos de disciplinas
    */
    Visao.prototype.minimizarTodosGrupos = function ( ) {
        this._minimizarGrupos( this.$listaDeDisciplinas );
    };

    /**
        Expande todos os grupos de disciplinas
    */
    Visao.prototype.expandirTodosGrupos = function ( ) {
        this._expandirGrupos( this.$listaDeDisciplinas );
    };


    /**
        Cria grupo e lista todas as disciplinas desse grupo
    */
    Visao.prototype._adicionarGrupo = function ( id, disciplinas, $pai ) {
        var
        template = this.template.grupo;


        if( disciplinas instanceof Array ) {
            for( i = 0; i < disciplinas.length; i++ ) {
                var disciplina = disciplinas[i];

                this._adicionarDisciplina( disciplina );
            }
        } else {
            var
            $grupo,
            $conteudoDoGrupo,
            $sanfona;

            template.replace( '{{id}}', id );

            $grupo = $( template );
            $conteudoDoGrupo = $( '.conteudo', $grupo );
            $sanfona = $( '.sanfona', $grupo );

            // Adicionar evento ao clique em $sanfona
            $sanfona.click( this._aoClicarSanfona );

            for( id in disciplinas ) {
                this._adicionarGrupo( id, disciplinas[id], $conteudoDoGrupo );
            }
        }
    };

    /**
        Adiciona uma disciplina em tela a partir do template para itemDisciplina
    e o preenche com as informações recebidas
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
        Atualiza uma lista de disciplinas
    */
    Visao.prototype.atualizarDisciplinas = function ( disciplinas ) {
        var i;

        for( i = 0; i< disciplinas.length; i++ ) {
            this._atualizarDisciplina( disciplinas[i] );
        }
    };

    /**
        É feita uma pesquisa na lista de disciplinas pelo id da disciplina que
    deverá ser alterada e sem remover elementos do dom e somente alterando
    algumas classes é atualizada a disciplina
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
        Pesquisa pelo elemento de disciplina com o id passado
    */
    Visao.prototype._get$disciplina = function( id ) {
        return $( $( '.checkbox[data-id=' + id + ']')[0] );
    };

    /**
        Minimiza todos os grupos dentro de um contexo. Um contexto é um elemento
    pai onde estarão os grupos filhos para serem minimizados
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
        Minimiza o grupo trocando a classe do icone e escondendo o conteudo do
    grupo
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
        Expande todos os grupos dentro de um contexo. Um contexto é um elemento
    pai onde estarão os grupos filhos para serem minimizados
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
        Expande o grupo trocando a classe do icone e mostrando o conteudo do
    grupo
    */
    Visao.prototype._expandirGrupo = function ( $grupo ) {
        var
        $sanfona = $( '.sanfona', $grupo ),
        $conteudo = $( '.conteudo', $grupo );

        $sanfona.removeClass('glyphicon-plus');
        $sanfona.addClass('glyphicon-minus');

        $conteudo.show();
    };

    /**
        Se o grupo estiver minimizado ele expande e vice versa.
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
        Quando clicar no botão sair, emitimos o evento 'cliqueEmSairDeCurso'
    */
    Visao.prototype._aoClicarSair = function ( evento ) {
        this.emitir('cliqueEmSairDeCurso');
    };

    /**
        Quando clicar no botão desfazer todos, emitimos o evento
    'cliqueEmDesfazerTodos'
    */
    Visao.prototype._aoClicarDesfazerTodos = function ( evento ) {
        this.emitir('cliqueEmDesfazerTodos');
    };

    /**
        Quando clicar no botão de minimizar todos, emitimos o evento
    'cliqueEmSanfonaMestre'
    */
    Visao.prototype._aoClicarSanfonaMestre = function ( evento ) {
        this.emitir('cliqueEmSanfonaMestre');
    };

    /**
        Quando o usuário altera o valor da barra de pesquisa, emitimos o evento
    'alterarPesquisa'
    */
    Visao.prototype._aoAlterarPesquisa = function ( evento ) {
        var
        pesquisa = $barraDePesquisa.val();

        this.emitir( 'alterarPesquisa', pesquisa );
    };

    /**
        Quando o usuário clica em uma disciplina emitimos o evento
    'cliqueEmDisciplina', com o id da disciplina em questão
    */
    Visao.prototype._aoClicarDisciplina = function ( evento ) {
        var
        $disciplina = $( evento.target ),
        id = $disciplina.attr('data-id');

        this.emitir( 'cliqueEmDisciplina', id );
        evento.stopPropagation();
    };

    /**
        Quando o usuário clica em uma informação emitimos o evento
    'cliqueEmInformacao', com o id da disciplina em questão
    */
    Visao.prototype._aoClicarInformacao = function ( evento ) {
        var
        $info = $( evento.target ),
        id = $info.attr('data-id');

        this.emitir( 'cliqueEmInformacao', id );
        evento.stopPropagation();
    };

    /**
        Quando o usuário clica no síbolo de minimizar/maximizar grupo
    Alternamos o estado da 'sanfona' do grupo
    */
    Visao.prototype._aoClicarSanfona = function ( evento ) {
        var
        $this = $( this ),
        $grupo = $this.parent().parent();

        this._alternarGrupo( $grupo );
        evento.stopPropagation();
    };

    /**
        Quando o usuário clica o no botão de mais detalhes do curso alternamos
    o estado dele. Se estiver aberto, fecha. Se estiver fechado, abre.
    */
    Visao.prototype._aoClicarMaisDetalhes = function ( evento ) {
        this.$maisDetalhes.toggleClass('glyphicon-minus');
        this.$maisDetalhes.toggleClass('glyphicon-plus');

        this.$camadaBarraDoTopo.toggleClass( 'aberta' );
        this.$camadaBarraDoTopo.toggleClass( 'fechada' );
    };

    /**
        Quando for alterado o valor selecionado da lista de universidades emite
    o evento 'selecionarUniversidade' com o caminho da universidade selecionada
    */
    Visao.prototype._aoSelecionarUniversidade = function ( evento ) {
        var caminho = this.$universidadesDropdown[0].selectize.getValue( );

        //Desabilite seletor de curso enquanto estiver carregando nova lista
        //de universidade
        this.$cursosDropdown[0].selectize.disable();

        this.emitir( 'selecionarUniversidade', caminho );
    };

    /**
        Quando for mandado carregar o curso emitimos o evento 'selecionarCurso'
    com o caminho do curso selecionado
    */
    Visao.prototype._aoSelecionarCurso = function ( evento ) {
        var caminho = this.$cursosDropdown[0].selectize.getValue( );

        this.emitir( 'selecionarCurso', caminho );
    };

    window.Agrade = window.Agrade || { };
    window.Agrade.Visao = Visao;
})();
