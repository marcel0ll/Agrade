var PESQUISA_INICIAL = "";

export default class Controlador {
    constructor(modelo, visao) {
        this.modelo = modelo;
        this.visao = visao;

        this.visao.iniciarEvent.onEventCall(this.aoIniciar, this);
        this.visao.carregarCursoEvent.onEventCall(this.aoSelecionarCurso, this);
        this.visao.checkboxCliqueEvent.onEventCall(
            this.aoClicarEmDisciplina,
            this
        );
        this.visao.infoCliqueEvent.onEventCall(this.aoClicarEmInfo, this);
        this.visao.desfazerTodosEvent.onEventCall(
            this.aoDesfazerTodosConfirmado,
            this
        );
        this.visao.mudarPesquisaEvent.onEventCall(this.aoMudarPesquisa, this);

        this.modelo.carregarCursoEvent.onEventCall(this.aoCarregarCurso, this);
        this.modelo.carregarListaDeCursosEvent.onEventCall(
            this.aoCarregarListaDeCursos,
            this
        );
        this.modelo.pesquisaProcessadaEvent.onEventCall(
            this.aoProcessarPesquisa,
            this
        );
        this.modelo.itemsModificadosEvent.onEventCall(
            this.aoModificarDisciplina,
            this
        );
        this.modelo.cabecalhoModificadoEvent.onEventCall(
            this.aoModificarCabecalho,
            this
        );
    }

    aoIniciar(caminho) {
        if (caminho) {
            this.aoSelecionarCurso(caminho);
        } else {
            this.modelo.carregarListaDeCursos();
        }
    }

    aoCarregarListaDeCursos(sucesso, listaDeCursos) {
        if (sucesso) {
            this.visao.iniciarSelecaoDeCurso(listaDeCursos);
        } else {
            throw new Error(
                "Erro: Arquivo de setup não encontrado ou inválido.\nPor favor reporte esse em https://github.com/0tho/Agrade/issues"
            );
        }
    }

    aoCarregarCurso(sucesso, curso) {
        if (sucesso) {
            this.visao.iniciarListagemDoCurso(curso);
            this.visao.definirPesquisa(PESQUISA_INICIAL);
            this.modelo.processarPesquisa(PESQUISA_INICIAL);
        } else {
            this.modelo.carregarListaDeCursos();
        }
    }

    aoSelecionarCurso(caminho) {
        this.modelo.carregarCurso(caminho);
    }

    aoClicarEmDisciplina(id) {
        this.modelo.interagirComDisciplina(id);
    }
    aoClicarEmInfo(id) {
        this.modelo.interagirComInfo(id);
    }

    aoProcessarPesquisa(obj, id) {
        this.visao.fazerLista(obj, id);
    }
    aoModificarDisciplina(disciplinas) {
        this.visao.atualizarDisciplinas(disciplinas);
    }
    aoModificarCabecalho(curso) {
        this.visao.atualizarCabecalho(curso);
    }
    aoDesfazerTodosConfirmado() {
        this.modelo.desfazerTodos();
    }
    aoMudarPesquisa(pesquisa) {
        this.modelo.processarPesquisa(pesquisa);
    }
}
