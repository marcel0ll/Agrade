(function () {

    var rSEPARATORS = /(?= \/ | \. | \- )/g;
    function Modelo () {
        //Use o construtor do Controlador de eventos para que o Modelo tenha
        //os atributos necessários para usar suas funções
        Agrade.ControladorDeEvento.apply( this );


    }

    //Adicionar as funções do prototipo de controlador de eventos no prototipo
    //de Modelo
    Agrade.Util.mixInto( Modelo.prototype, Agrade.ControladorDeEvento.prototype );

    /**
        @TODO carregarListaDeUniversidades
    */
    Modelo.prototype.carregarListaDeUniversidades = function () {
        var evento = {
            sucesso: false,
            listaDeUniversidades: []
        };

        $.ajax({
                url:'./config/universidades/universidades.json',
                datatype: 'json'
            })
        .success(function ( json ) {
            var x,
            listaDeUniversidades = [],
            parser = typeof json === 'string' ? JSON.parse(json) : json;


            for(x in parser){
                var curso = {
                    nome : x,
                    url : parser[x]
                };

                listaDeUniversidades.push(curso);
            }

            //Ordene a lista de universidades pelo nome dela
            listaDeUniversidades = listaDeUniversidades.sort(function(a,b){
                var x = a.nome.toLowerCase(),
                    y = b.nome.toLowerCase();

                if(x < y) return -1;
                if(x > y) return 1;

                return 0;
            });

            evento.sucesso = true;
            evento.listaDeUniversidades = listaDeUniversidades;

            this.emitir( 'carregarListaDeUniversidades', evento );
        }.bind( this ) )
        .error(function ( ) {
            this.emitir( 'carregarListaDeUniversidades', evento );
        }.bind( this ) );
    };

    /**
        @TODO carregarListaDeCampusDeUniversidade
    */
    Modelo.prototype.carregarListaDeCampusDeUniversidade = function ( universidade ) {
        var evento = {
            sucesso: false,
            listaDeCampus: []
        };

        $.ajax({
                url:'./config/universidades/' + universidade +'/campus.json',
                datatype: 'json'
            })
        .success(function ( json ) {
            var x,
            listaDeCampus = [],
            parser = typeof json === 'string' ? JSON.parse(json) : json;


            for(x in parser){
                var curso = {
                    nome : x,
                    url : parser[x]
                };

                listaDeCampus.push(curso);
            }

            //Ordene a lista de universidades pelo nome dela
            listaDeCampus = listaDeCampus.sort(function(a,b){
                var x = a.nome.toLowerCase(),
                    y = b.nome.toLowerCase();

                if(x < y) return -1;
                if(x > y) return 1;

                return 0;
            });

            evento.sucesso = true;
            evento.listaDeCampus = listaDeCampus;

            this.emitir( 'carregarListaDeCampusDeUniversidade', evento );
        }.bind( this ) )
        .error(function ( ) {
            this.emitir( 'carregarListaDeCampusDeUniversidade', evento );
        }.bind( this ) );
    };

    /**
        @TODO carregarListaDeCampusDeUniversidade
    */
    Modelo.prototype.carregarListaDeCursosDeCampus = function ( universidade, campus ) {
        var evento = {
            sucesso: false,
            listaDeCursos: []
        };

        $.ajax({
                url:'./config/universidades/' + universidade + '/' + campus + '/cursos.json',
                datatype: 'json'
            })
        .success(function ( json ) {
            var x,
            listaDeCursos = [],
            parser = typeof json === 'string' ? JSON.parse(json) : json;


            for(x in parser){
                var curso = {
                    nome : x,
                    url : parser[x]
                };

                listaDeCursos.push(curso);
            }

            //Ordene a lista de universidades pelo nome dela
            listaDeCursos = listaDeCursos.sort(function(a,b){
                var x = a.nome.toLowerCase(),
                    y = b.nome.toLowerCase();

                if(x < y) return -1;
                if(x > y) return 1;

                return 0;
            });

            evento.sucesso = true;
            evento.listaDeCursos = listaDeCursos;

            this.emitir( 'carregarListaDeCursosDeCampus', evento );
        }.bind( this ) )
        .error(function ( ) {
            this.emitir( 'carregarListaDeCursosDeCampus', evento );
        }.bind( this ) );
    };

    /**
        @TODO carregarCurso
    */
    Modelo.prototype.carregarCurso = function ( universidade, campus, curso ) {
        var evento = {
            sucesso: false,
            curso: {}
        };

        $.ajax({
                url:'./config/universidades/' + universidade + '/' + campus + '/cursos/' + curso + '.json',
                datatype: 'json'
            })
        .success(function ( json ) {
            var x,
            parser = typeof json === 'string' ? JSON.parse(json) : json;

            this._processarJsonDeCurso( parser );

            evento.sucesso = true;
            evento.cabecalho = this.cabecalho;

            this.emitir( 'carregarCurso', evento );
        }.bind( this ) )
        .error(function ( ) {
            this.emitir( 'carregarCurso', evento );
        }.bind( this ) );
    };

    /**
        @TODO alternarDisciplina
    */
    Modelo.prototype.alternarDisciplina = function () {

    };

    /**
        @TODO informacoesDaDisciplina
    */
    Modelo.prototype.informacoesDaDisciplina = function () {

    };

    /**
        @TODO desfazerTodos
    */
    Modelo.prototype.desfazerTodos = function () {

    };

    /**
        @TODO descarregarCurso
    */
    Modelo.prototype.descarregarCurso = function () {

    };

    /**

        Exemplos de pesquisa:

            '.propriedade = "valor"' - Seleciona objetos que tem propriedade identica ao valor
            '.propriedade _ "valor"' - Seleciona objetos que propriedade corresponde parcialmente com valor

            '/propriedade [(=|_) "valor"]' - Divide a pesquisas pelos objetos que tem propriedade igual ( cria um grupo outros para objetos que não tiverem a propriedade)
            '-proriedade [(=|_) "valor"]' - Remove da pesquisa todos os objetos que tem aquela propriedade

            '.propriedade<' - Ordena objetos pelo valor de propriedade do menor para o maior
            '.propriedade>' - Ordena objetos pelo valor de propriedade do maior para o menor

        @TODO pesquisar
    */
    Modelo.prototype.pesquisar = function ( pesquisa ) {
        var evento = {
            disciplinas : this.disciplinas
        },
        tokens = pesquisa.split( rSEPARATORS );
        debugger;



        this.emitir('processarListaDeDisciplinas', evento);
    };

    /**

    */
    Modelo.prototype._processarJsonDeCurso = function ( curso ) {
        this.disciplinas = curso.disciplinas;
        delete curso.disciplinas;

        this._processarPalavrasChave();

        this.cabecalho = curso;

        listaDeConjuntosComCreditosNaoCalculados = [];

        //Número total de disciplinas
        this.cabecalho.totalDeDisciplinas = 0;
        //Número total de créditos do curso
        this.cabecalho.totalDeCreditos = 0;
        //Número total de disciplinas feitas
        this.cabecalho.totalDeDisciplinasFeitas = 0;
        //Número total de créditos feitos do curso
        this.cabecalho.totalDeCreditosFeitos = 0;

        for( i = 0; i < this.cabecalho.conjuntos.length; i++ ) {
            conjunto = this.cabecalho.conjuntos[i];

            conjunto.disciplinasFeitas = 0;
            conjunto.creditosFeitos = 0;

            this.cabecalho.totalDeDisciplinas += conjunto.disciplinas;
            this.cabecalho.totalDeCreditos += conjunto.creditos;

            if(conjunto.creditos === 0) {
                listaDeConjuntosComCreditosNaoCalculados.push( conjunto );
            }
        }

        for( i = 0; i < this.disciplinas.length; i++ ) {
            var disciplina = this.disciplinas[i],
            creditosPrecisamSerCalculados = false;

            disciplina.feita = false;
            disciplina.liberada = false;

            for( j = 0; j < listaDeConjuntosComCreditosNaoCalculados.length; j++ ) {
                conjunto = listaDeConjuntosComCreditosNaoCalculados[j];
                if(conjunto.nome === disciplina.conjunto ){
                    console.log( conjunto.nome );
                    creditosPrecisamSerCalculados = true;
                    conjunto.creditos += disciplina.creditos;
                }
            }

            if(creditosPrecisamSerCalculados) {
                this.cabecalho.totalDeCreditos += disciplina.creditos;
            }
        }
    };

    Modelo.prototype._processarPalavrasChave = function () {
        var i, key;
        this.palavrasChave = [];

        for( i = 0; i < this.disciplinas.length; i++ ) {
            var disciplina = this.disciplinas[i];
            for( key in disciplina ) {
                if( $.inArray( key, this.palavrasChave ) === -1 ) {
                    this.palavrasChave.push( key );
                }
            }
        }
    };


    window.Agrade = window.Agrade || {};
    window.Agrade.Modelo = Modelo;
})();
