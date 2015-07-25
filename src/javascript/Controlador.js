/**
    @file Arquivo define a classe para Controlador do programa 'Agrade'

    @author Otho
*/
(function ( ) {

    /**
        Valor da pesquisa iniciar a listagem de disciplinas

        @const
    */
    var PESQUISA_INICIAL = 'perfil conjunto';

    /**
        Classe do controlador do programa Agrade.
            As instancias dessa classe servirão de ponte entre o modelo e a
        visão do programa.

        @param {Agrade.Modelo} modelo
        @param {Agrade.Visao} visao
        @author Otho
        @class

    */
    function Controlador ( modelo, visao ) {
        this.modelo = modelo;
        this.visao = visao;

        //
        this.ultimoCaminhoDeUniversidade = '';

        this.ultimaPesquisa = PESQUISA_INICIAL;
        this.ultimoInfoSelecionada = '';

        // Damos bind nas funções para que a varíavel this dentro da função
        //de callback faça referência a esse Controlador
        // Escute os eventos da Visao do programa
        this.visao.ao( 'iniciar', this.aoIniciar.bind(this) );
        this.visao.ao( 'selecionarCurso', this.aoSelecionarCurso.bind(this) );
        this.visao.ao( 'selecionarUniversidade', this.aoSelecionarUniversidade.bind(this) );
        this.visao.ao( 'cliqueEmDisciplina', this.aoCliqueEmDisciplina.bind(this) );
        this.visao.ao( 'cliqueEmInformacao', this.aoCliqueEmInformacao.bind(this) );
        this.visao.ao( 'confirmaDesfazerTodos', this.aoConfirmaDesfazerTodos.bind(this) );
        this.visao.ao( 'mudarPesquisa', this.aoMudarPesquisa.bind(this) );
        this.visao.ao( 'sairDeCurso', this.aoSairDeCurso.bind(this) );

        // Escute os eventos do Modelo do programa
        this.modelo.ao( 'carregarListaDeUniversidades', this.aoCarregarListaDeUniversidades.bind(this) );
        this.modelo.ao( 'carregarListaDeCursosDeUniversidade', this.aoCarregarListaDeCursosDeUniversidade.bind(this) );
        this.modelo.ao( 'carregarCurso', this.aoCarregarCurso.bind(this) );

        this.modelo.ao( 'processarListaDeDisciplinas', this.aoProcessarListaDeDisciplinas.bind(this) );
        this.modelo.ao( 'modificarDisciplinas', this.aoModificarDisciplinas.bind(this) );
        this.modelo.ao( 'modificarCabecalho', this.aoModificarCabecalho.bind(this) );
    }

    /**
        Quando o html estiver carregado verificamos se existe um caminho de
    curso na url.
        Se esse caminho existir, mandamos o modelo carregá-lo sem ter que
    selecionar manualmente o curso.
        Caso não exista o caminho mandamos o modelo carregar a lista de
    universidades registradas no sistema.

        @param {string}
    */
    Controlador.prototype.aoIniciar = function ( caminho ) {
        console.info( 'Controlador: Programa iniciado com url#' + caminho );

        if( typeof caminho !== 'undefined' ) {
            this.modelo.carregarCursoDaUrl( caminho );
        } else {
            this.modelo.carregarListaDeUniversidades();
        }
    };

    /**
        Ao mandar carregar um curso mudamos a visao para a tela de carregamento
    e mandamos o modelo carregar o curso selecionado.

        @param {string}
    */
    Controlador.prototype.aoSelecionarCurso = function ( caminho ) {
        console.info( 'Controlador: Curso Selecionado: ' + caminho );

        this.visao.mudarTelaParaCarregar();
        this.modelo.carregarCurso( caminho );
    };

    /**
        Ao selecionar uma universidade das opções mandamos o modelo carregar
    a lista de cursos dessa universidade

        @param {string}
    */
    Controlador.prototype.aoSelecionarUniversidade = function ( caminho ) {
        console.info( 'Controlador: Universidade Selecionada: ' + caminho );

        if(this.ultimoCaminhoDeUniversidade !== caminho) {
            this.modelo.carregarListaDeCursosDeUniversidade( caminho );
            this.ultimoCaminhoDeUniversidade = caminho;
        }
    };

    /**
        Ao clicar em uma disciplina mandamos o modelo alternar se a disciplina
    foi feita ou não.

        @param {string}
    */
    Controlador.prototype.aoCliqueEmDisciplina = function ( disciplinaId ) {
        console.info( 'Controlador: Disciplina selecionada: ' + disciplinaId );

        //toggleDisciplina
        this.modelo.alternarDisciplina( disciplinaId );
    };

    /**
        Ao clicar na informação de uma disciplina verificamos o id da informação
        Se for o mesmo Id da última informação selecionada, mandamos o modelo
    refazer a última pesquisa, para voltar ao estado anterior do programa.

        @param {string}
    */
    Controlador.prototype.aoCliqueEmInformacao = function ( infoId ) {
        console.info( 'Controlador: Informação Selecionada: ' + infoId );

        if( infoId !== this.ultimoInfoSelecionada ) {
            this.modelo.informacoesDaDisciplina( infoId );
            this.ultimoInfoSelecionada = infoId;
        } else {
            this.modelo.pesquisar( this.ultimaPesquisa );
        }
    };

    /**
        Ao confirmar que o usuário deseja desfazer todas as suas disciplinas,
    mandamos o modelo desfazer todas as disciplinas.
    */
    Controlador.prototype.aoConfirmaDesfazerTodos = function ( ) {
        console.info( 'Controlador: "desfazerTodos" Selecionado' );

        this.modelo.desfazerTodos();
    };

    /**
        Ao interagir com a barra de pesquisa verificamos se a nova pesquisa é
    diferente da última. Removemos os espaços do começo e do fim da nova
    pesquisa para evitar consultas desnecessárias. Ao confirmar que a pesquisa
    é diferente, mandamos o modelo pesquisa-la.

        @param {string}
    */
    Controlador.prototype.aoMudarPesquisa = function ( pesquisa ) {
        console.info( 'Controlador: Nova pesquisa: ' + pesquisa );

        // Verificamos se a mudança foi relevante antes de mandar o modelo
        //reprocessar a pesquisa
        var pesquisaSemEspacos = pesquisa.trim();

        if( ultimaPesquisa !== pesquisaSemEspacos ) {
            this.modelo.pesquisar( pesquisa );

            // Para não bugar quando selecionar uma informação, mudar a pesquisa
            //e tentar selecionar a mesma informação
            this.infoId = '';
        }
    };

    /**
        Ao clicar sair do curso mandamos o modelo descarregar o curso atual.
    */
    Controlador.prototype.aoSairDeCurso = function( ) {
        console.info( 'Controlador: Sair do curso' );

        this.modelo.descarregarCurso();
        this.visao.mudarTelaParaSelecao();
        this.visao.definirUrl('');
    };

    /**
        Quando o modelo termina de carregar a lista de universidades, mandamos
    a visao exibi-la

        @param {Array.<Object>}
    */
    Controlador.prototype.aoCarregarListaDeUniversidades = function ( sucesso, listaDeUniversidades ) {
        console.info( 'Controlador: Universidades carregadas:', listaDeUniversidades );

        if( sucesso ) {
            this.visao.listarUniversidades( listaDeUniversidades );
        } else {
            console.error('Controlador: Falha ao carregar lista de universidades');
        }
    };

    /**
        Quando o modelo termina de carregar a lista de cursos de uma
    universidade, mandamos a visao exibi-la

        @param {Array.<Object>}
    */
    Controlador.prototype.aoCarregarListaDeCursosDeUniversidade = function ( sucesso, listaDeCursos ) {
        console.info( 'Controlador: Lista de cursos carregado:', listaDeCursos );

        if( sucesso ) {
            this.visao.listarCursos( listaDeCursos );
        } else {
            console.error( 'Controlador: Falha ao carregar lista de cursos da universidade:' + this.ultimoCaminhoDeUniversidade );
        }
    };

    /**
        Quando o modelo termina de o curso repassamos para o a visao seu
    cabeçalho e mandamos o modelo pesquisar a pesquisa inicial

        @param {Object}
    */
    Controlador.prototype.aoCarregarCurso = function ( sucesso, cabecalho ) {
        console.info( 'Controlador: Curso Carregado, cabeçalho:', cabecalho );

        if( sucesso ) {
            this.visao.mudarTelaParaCurso();
            this.visao.preencherCabecalho( cabecalho );
            this.modelo.pesquisar( PESQUISA_INICIAL );
        } else {
            console.error('Controlador: Falha ao carregar arquivo de curso ou arquivo inválido');
            this.visao.definirUrl('');
        }
    };

    /**
        Quando o modelo tiver uma nova lista de disciplinas para ser exposta,
    nós repassamos ela para a visao exibi-la.

        @param {Array.<Disciplina>}
    */
    Controlador.prototype.aoProcessarListaDeDisciplinas = function( listaDeDisciplinas ) {
        console.info( 'Controlador: Nova lista de disciplinas:', listaDeDisciplinas );

        this.visao.preencherDisciplinas( listaDeDisciplinas );
    };

    /**
        Quando houver somente um conjunto de disciplinas alterada, repassamos
    isso para a visão somente atualizá-las. Sem ter que refazer a lista.

        @param {Array.<Disciplina>}
    */
    Controlador.prototype.aoModificarDisciplinas = function ( disciplinas ) {
        console.info( 'Controlador: Disciplinas modificadas:', disciplinas );

        this.visao.atualizarDisciplinas( disciplinas );
    };

    /**
        Quando houver alguma alteração do cabeçalho, mandamos a visão
    atualiza-lo

        @param {Object}
    */
    Controlador.prototype.aoModificarCabecalho = function ( cabecalho ) {
        console.info( 'Controlador: Cabecalho modificado:', cabecalho );

        this.visao.preencherCabecalho( cabecalho );
    };

    //Deixar exposto o construtor da classe 'Controlador'
    window.Agrade = window.Agrade || {};
    window.Agrade.Controlador = Controlador;
})();
