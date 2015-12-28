/**
    @file Arquivo define a classe para Controlador do programa 'Agrade'

    @author Otho
*/
(function ( ) {

    /**
        Valor da pesquisa iniciar a listagem de disciplinas

        @const
    */
    var PESQUISA_INICIAL = '/perfil /conjunto .perfil< testando issaQui';

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
        console.info( 'Controlador: Controlador criado' );
        this.modelo = modelo;
        this.visao = visao;

        //
        this.ultimoCaminhoDeUniversidade = '';
        this.ultimoCaminhoDeCampus = '';
        this.ultimoCaminhoDeCurso = '';

        this.ultimaPesquisa = PESQUISA_INICIAL;
        this.minimizar = true;
        this.ultimoInfoSelecionada = '';

        // Damos bind nas funções para que a varíavel this dentro da função
        //de callback faça referência a esse Controlador
        // Escute os eventos da Visao do programa
        this.visao.ao( 'iniciar', this.aoIniciar.bind(this) );
        this.visao.ao( 'selecionarCurso', this.aoSelecionarCurso.bind(this) );
        this.visao.ao( 'selecionarCampus', this.aoSelcionarCampus.bind(this) );
        this.visao.ao( 'selecionarUniversidade', this.aoSelecionarUniversidade.bind(this) );
        this.visao.ao( 'alterarPesquisa', this.aoMudarPesquisa.bind(this) );
        this.visao.ao( 'cliqueEmDisciplina', this.aoCliqueEmDisciplina.bind(this) );
        this.visao.ao( 'cliqueEmInformacao', this.aoCliqueEmInformacao.bind(this) );
        this.visao.ao( 'cliqueEmDesfazerTodos', this.aoConfirmaDesfazerTodos.bind(this) );
        this.visao.ao( 'cliqueEmSanfonaMestre', this.aoCliqueEmSanfonaMestre.bind(this) );
        this.visao.ao( 'cliqueEmSairDeCurso', this.aoSairDeCurso.bind(this) );

        // Escute os eventos do Modelo do programa
        this.modelo.ao( 'carregarListaDeUniversidades', this.aoCarregarListaDeUniversidades.bind(this) );
        this.modelo.ao( 'carregarListaDeCampusDeUniversidade', this.aoCarregarListaDeCampusDeUniversidade.bind(this) );
        this.modelo.ao( 'carregarListaDeCursosDeCampus', this.aoCarregarListaDeCursosDeCampus.bind(this) );
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


        if( typeof caminho !== 'undefined' && caminho !== '' ) {
            var
            parser = caminho.split( '/' );

            this.modelo.carregarListaDeUniversidades();
            if( parser.length > 0) {
                this.ultimoCaminhoDeUniversidade = parser[0];
                this.modelo.carregarListaDeCampusDeUniversidade( this.ultimoCaminhoDeUniversidade );
                if(parser.length > 1) {
                   this.ultimoCaminhoDeCampus = parser[1];
                    this.modelo.carregarListaDeCursosDeCampus( this.ultimoCaminhoDeUniversidade, this.ultimoCaminhoDeCampus );
                    if(parser.length > 2) {
                        this.ultimoCaminhoDeCurso = parser[2];
                        this.modelo.carregarCurso( this.ultimoCaminhoDeUniversidade, this.ultimoCaminhoDeCampus, this.ultimoCaminhoDeCurso );
                    } else {

                    }
                }
            }

            if( parser.length >= 3 ) {

            } else if (parser.length == 2) {

            } else if (parser.length == 1) {

            } else {
                console.error ("Isso não deveria acontecer");
            }

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

        if( this.ultimoCaminhoDeCurso !== caminho ) {
            this.visao.mudarTelaParaCarregar();
            this.ultimoCaminhoDeCurso = caminho;
            this.modelo.carregarCurso( this.ultimoCaminhoDeUniversidade, this.ultimoCaminhoDeCampus, this.ultimoCaminhoDeCurso );
            this.visao.definirUrl(this.ultimoCaminhoDeUniversidade + '/' + this.ultimoCaminhoDeCampus + '/' + this.ultimoCaminhoDeCurso );
        }
    };

     /**
        Ao selecionar um Campus das opções mandamos o modelo carregar
    a lista de cursos desse Campus

        @param {string}
    */
    Controlador.prototype.aoSelcionarCampus = function ( caminho ) {
        console.info( 'Controlador: Campus Selecionado: ' + caminho );

        if(this.ultimoCaminhoDeCampus !== caminho) {
            this.ultimoCaminhoDeCampus = caminho;
            this.modelo.carregarListaDeCursosDeCampus( this.ultimoCaminhoDeUniversidade, this.ultimoCaminhoDeCampus );
            this.visao.definirUrl(this.ultimoCaminhoDeUniversidade + '/' + this.ultimoCaminhoDeCampus);
        }
    };

    /**
        Ao selecionar uma universidade das opções mandamos o modelo carregar
    a lista de campus dessa universidade

        @param {string}
    */
    Controlador.prototype.aoSelecionarUniversidade = function ( caminho ) {
        console.info( 'Controlador: Universidade Selecionada: ' + caminho );

        if(this.ultimoCaminhoDeUniversidade !== caminho) {
            this.ultimoCaminhoDeUniversidade = caminho;
            this.modelo.carregarListaDeCampusDeUniversidade( this.ultimoCaminhoDeUniversidade );
            this.visao.definirUrl(this.ultimoCaminhoDeUniversidade);
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
        Ao clicar na sanfona mestre mandar minimizar todos os grupos ou expandir
    todos os grupos, dependendo do estado atual.
    */
    Controlador.prototype.aoCliqueEmSanfonaMestre = function ( ) {
        if( minimizar ) {
            this.visao.minimizarTodos();
        } else {
            this.visao.expandirTodos();
        }
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
    Controlador.prototype.aoCarregarListaDeUniversidades = function ( evento ) {
        console.info( 'Controlador: Universidades carregadas:', evento.listaDeUniversidades );

        if( evento.sucesso ) {
            this.visao.mudarTelaParaSelecao();
            this.visao.listarUniversidades( evento.listaDeUniversidades );
        } else {
            console.error('Controlador: Falha ao carregar lista de universidades');
        }
    };

    /**
        Quando o modelo termina de carregar a lista de cursos de uma
    universidade, mandamos a visao exibi-la

        @param {Array.<Object>}
    */
    Controlador.prototype.aoCarregarListaDeCampusDeUniversidade = function ( evento ) {
        console.info( 'Controlador: Lista de cursos carregado:', evento.listaDeCampus );

        if( evento.sucesso ) {
            this.visao.listarCampus( evento.listaDeCampus );
        } else {
            console.error( 'Controlador: Falha ao carregar lista de campus da universidade:' + this.ultimoCaminhoDeUniversidade );
        }
    };

    /**
        Quando o modelo termina de carregar a lista de cursos de uma
    universidade, mandamos a visao exibi-la

        @param {Array.<Object>}
    */
    Controlador.prototype.aoCarregarListaDeCursosDeCampus = function ( evento ) {
        console.info( 'Controlador: Lista de cursos carregado:', evento.listaDeCursos );

        if( evento.sucesso ) {
            this.visao.listarCursos( evento.listaDeCursos );
        } else {
            console.error( 'Controlador: Falha ao carregar lista de cursos do campus:' + this.ultimoCaminhoDeUniversidade + '/' + this.ultimoCaminhoDeCampus );
        }
    };

    /**
        Quando o modelo termina de o curso repassamos para o a visao seu
    cabeçalho e mandamos o modelo pesquisar a pesquisa inicial

        @param {Object}
    */
    Controlador.prototype.aoCarregarCurso = function ( evento ) {
        console.info( 'Controlador: Curso Carregado, cabeçalho:', evento.cabecalho );

        if( evento.sucesso ) {
            this.visao.mudarTelaParaCurso();
            this.visao.preencherCabecalho( evento.cabecalho );
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
    Controlador.prototype.aoProcessarListaDeDisciplinas = function( evento ) {
        console.info( 'Controlador: Nova lista de disciplinas:', evento.disciplinas );

        this.visao.preencherDisciplinas( evento.disciplinas );
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
