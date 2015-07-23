(function ( ) {

    // Protótipo para objeto do Modelo do programa
    function Modelo ( persistencia ) {
        this.listaDeCursos;
        this.curso;
        this.persistencia = persistencia;
        this.ultimaPesquisa;
        this._disciplinasObj;
        this.infoSelected;
        this.ultimoInfo;

        this.carregarCursoEvent = new Pogad.Event(this);
        this.carregarListaDeCursosEvent = new Pogad.Event(this);

        this.pesquisaProcessadaEvent = new Pogad.Event( this );
        this.itemsModificadosEvent = new Pogad.Event( this );

        this.cabecalhoModificadoEvent = new Pogad.Event( this );
    };

    // Função que carrega arquivo json com informações do curso
    Modelo.prototype.carregarCurso = function ( caminho ) {
        var _this = this;

        //Caso estejam mandando carregar o major já carregado, só retorne o major sem fazer outra requisição
        if(this.curso && this.curso.id === caminho){
            _this.carregarCursoEvent.notify( true, this.curso );
        }else{
            $.ajax({
                    url:'./config/cursos/' + caminho + '.json',
                    datatype: 'json'
                })
            .success(function ( json ) {
                var curso = typeof json === 'string' ? JSON.parse(json) : json;

                curso.id = caminho;
                _this.prepararDadosDeCurso ( curso );

                _this.curso = curso;

                var carregar = _this.persistencia.carregar( caminho );
                if( carregar ){
                    carregar.forEach(function ( id ) {
                        var disciplina = $.grep(_this.curso.disciplinas, function(e){ return e.id == id; })[0];

                        if(typeof disciplina !== 'undefined')
                            disciplina.feita = true;
                    });
                }


                _this.curso.disciplinas.forEach(function( disciplina ) {
                    disciplina.liberada = _this._deveLiberar( disciplina );
                });
                _this.processarCabecalho( false );
                _this.curso.disciplinas.forEach(function( disciplina ) {
                    disciplina.liberada = _this._deveLiberar( disciplina );
                });

                _this.carregarCursoEvent.notify( true, _this.curso );
            })
            .error(function ( ) {
                _this.carregarCursoEvent.notify( false );
            });
        }
    };

    //Função que carrega lista de cursos do arquivo 'setup.json'
    Modelo.prototype.carregarListaDeCursos = function ( ) {
        var _this = this;

        //Caso estejam mandando carregar a lista já carregada, só retorne a lista sem fazer outra requisição
        if(this.listaDeCursos){
            _this.carregarListaDeCursosEvent.notify( true, _this.listaDeCursos );
        }else{
            $.ajax({
                    url:'./config/setup.json',
                    datatype: 'json'
                })
            .success(function ( json ) {
                var listaDeCursos = typeof json === 'string' ? JSON.parse(json) : json;

                _this.listaDeCursos = [];
                for(x in listaDeCursos){
                    var curso = {
                        nome : x,
                        url : listaDeCursos[x]
                    }

                    _this.listaDeCursos.push(curso);
                }
                _this.listaDeCursos = _this.listaDeCursos.sort(function(a,b){
                    var x = a.nome.toLowerCase(),
                        y = b.nome.toLowerCase();

                    if(x < y) return -1;
                    if(x > y) return 1;

                    return 0;
                });

                _this.carregarListaDeCursosEvent.notify( true, _this.listaDeCursos );
            })
            .error(function ( ) {
                _this.carregarListaDeCursosEvent.notify( false );
            });
        }
    }

    //Função que processa as pesquisas da barra de pesquisa
    Modelo.prototype.processarPesquisa = function ( pesquisa ) {

        var tokens,
            seletores,
            valores,
            propriedades,
            disciplinas,
            disciplinasObj,
            devePesquisar,
            taxonomias,
            grupos;

        pesquisa = pesquisa.trim();
        pesquisa = pesquisa.toLowerCase();

        devePesquisar = pesquisa != this.ultimaPesquisa

        if(typeof this.infoSelected === 'undefined' && typeof this.ultimoInfo !== 'undefined'){
            devePesquisar = true;
        }
        if( devePesquisar ){
                this.ultimoInfo = undefined;

                this.ultimaPesquisa = pesquisa;
                tokens = pesquisa.split( ' ' );
                seletores = [];
                valores = [];

                tokens.forEach( function ( token ) {
                    var leitor,
                        seletor,
                        valor;

                    leitor = token.split( '=' );

                    seletor = leitor[0];

                    if(leitor.length >= 2)
                        valor = leitor[1];

                    if(seletor !== 'taxonomia'){
                        seletores.push( seletor );
                        if(valor == '') valor = undefined;
                        valores.push( valor );
                    }
                });

                //Garanta que as disciplinas serão ordenadas ao menos alfabeticamente
                seletores.push('nome');
                valores.push(undefined);

                //Garanta que não há dois seletores iguais
                for( i = 0; i < seletores.length; i++ ){
                    if(     typeof this.curso.disciplinas[0][seletores[i]] === 'undefined'
                        &&  typeof this.curso.disciplinas[0].taxonomia[seletores[i]] === 'undefined' ){
                        seletores.splice(i, 1);
                        valores.splice(i, 1);
                        i--;
                        continue;
                    }

                    for( j = i+1; j < seletores.length -1; j++ ){
                        if(seletores[i] === seletores[j]){
                            seletores.splice(j, 1);
                            valores.splice(j, 1);
                            j--;
                            continue;
                        }
                    }
                }

                taxonomias = [];

                for( i = 0; i < seletores.length - 1; i++ ){
                    var seletor = seletores[i];

                    if( typeof this.curso.disciplinas[0].taxonomia[seletor] !== 'undefined' ){
                        taxonomias.push( seletor );
                    }
                }

                //Ordena as disciplinas pelos seletores que são propriedades dela. Ignora taxonomias
                this.curso.disciplinas = this.curso.disciplinas.sort( function ( a, b ) {

                    for(i=0; i<seletores.length;i++){
                        var seletor = seletores[i];

                        if(typeof a.taxonomia[seletor] !== 'undefined'){
                            if(a.taxonomia[seletor] < b.taxonomia[seletor]) return -1;
                            if(a.taxonomia[seletor] > b.taxonomia[seletor]) return 1;
                        }

                        if(typeof a[seletor] !== 'undefined' ){
                            if(a[seletor] < b[seletor]) return -1;
                            if(a[seletor] > b[seletor]) return 1;
                        }

                    }

                    return 0;
                });

                disciplinas = [];

                this.curso.disciplinas.forEach( function (disciplina) {
                    disciplinas.push(disciplina);
                });

                //Remove da lista de disciplinas todas as discplinas que não correspondem aos valores dos seletores com '='
                for( i = 0; i < valores.length; i++ ) {
                    if( typeof valores[i] !== 'undefined' ){
                        var seletor = seletores[i];
                        for( j = 0; j < disciplinas.length; j++ ) {
                            var disciplina = disciplinas[j];

                            if(typeof disciplina[seletor] !== 'undefined'){
                                if(String(disciplina[seletor]).toLowerCase().search(valores[i].toLowerCase()) === -1){
                                    disciplinas.splice(j, 1);
                                    j--;
                                    continue;
                                }
                            }else if(typeof disciplina.taxonomia[seletor] !== 'undefined'){
                                if(String(disciplina.taxonomia[seletor]).toLowerCase().search(valores[i].toLowerCase()) === -1){
                                    disciplinas.splice(j, 1);
                                    j--;
                                    continue;
                                }
                            }
                        }
                    }
                }

                if(taxonomias.length > 0)
                    disciplinasObj = { };
                else
                    disciplinasObj = [];



                disciplinas.forEach( function ( disciplina ) {
                    var obj = disciplinasObj;

                    if(taxonomias.length > 0){
                        for( i = 0; i < taxonomias.length; i++){
                            var seletor = taxonomias[i];
                            if(typeof disciplina.taxonomia[seletor] !== 'undefined' ){
                                var chave = seletor + ' ' + disciplina.taxonomia[seletor];

                                if(typeof obj[chave] === 'undefined' ){
                                    if(i === taxonomias.length - 1){
                                        obj[chave] = [ ];
                                    } else {
                                        obj[chave] = { };
                                        obj = obj[chave];
                                    }
                                }else{
                                    if(!(obj[chave] instanceof Array))
                                        obj = obj[chave];
                                }

                                if(i === taxonomias.length - 1) {
                                    obj[chave].push( disciplina );
                                }
                            }
                        }
                    }else{
                        obj.push( disciplina )
                    }
                });

                this._disciplinasObj = disciplinasObj;

        }

        this.pesquisaProcessadaEvent.notify( this._disciplinasObj );
    }

    //Função que adiciona varriáveis ao objeto curso
    Modelo.prototype.prepararDadosDeCurso = function ( curso ) {
        var listaDeConjuntosComCreditosNaoCalculados,
            _this = this;

        listaDeConjuntosComCreditosNaoCalculados = [];

        //Número total de disciplinas
        curso.totalDeDisciplinas = 0;
        //Número total de créditos do curso
        curso.totalDeCreditos = 0;
        //Número total de disciplinas feitas
        curso.totalDeDisciplinasFeitas = 0;
        //Número total de créditos feitos do curso
        curso.totalDeCreditosFeitos = 0;

        curso.conjuntos.forEach( function ( conjunto ) {
            conjunto.disciplinasFeitas = 0;
            conjunto.creditosFeitos = 0;

            curso.totalDeDisciplinas += conjunto.disciplinas;
            curso.totalDeCreditos += conjunto.creditos;

            if(conjunto.creditos === 0)
                listaDeConjuntosComCreditosNaoCalculados.push( conjunto );
        } );

        curso.disciplinas.forEach(function( disciplina ) {
            var creditosPrecisamSerCalculados;


            creditosPrecisamSerCalculados = false;

            disciplina.feita = false;
            disciplina.liberada = false;

            listaDeConjuntosComCreditosNaoCalculados.forEach( function ( conjunto ) {
                if(conjunto.nome === disciplina.taxonomia.conjunto ){
                console.log(conjunto.nome)
                    creditosPrecisamSerCalculados = true;
                    conjunto.creditos += disciplina.creditos;
                }
            } );

            if(creditosPrecisamSerCalculados){
                curso.totalDeCreditos += disciplina.creditos;
            }
        });
    }

    Modelo.prototype.salvarLocalmente = function ( ) {
        var dicsciplinasFeitas = [];

        this.curso.disciplinas.forEach(function( disciplina ) {

            if(disciplina.feita){
               dicsciplinasFeitas.push(disciplina.id);
            }
        });

        this.persistencia.salvarLocalmente( dicsciplinasFeitas, this.curso.id );
    };

    Modelo.prototype.processarCabecalho = function ( notify ) {
        var _this = this;
        //Número total de disciplinas feitas
        this.curso.totalDeDisciplinasFeitas = 0;
        //Número total de créditos feitos do curso
        this.curso.totalDeCreditosFeitos = 0;

        this.curso.conjuntos.forEach( function ( conjunto ) {
            conjunto.disciplinasFeitas = 0;
            conjunto.creditosFeitos = 0;
        } );

        this.curso.disciplinas.forEach(function( disciplina ) {

            if(disciplina.liberada && disciplina.feita){
                var conjunto = $.grep(_this.curso.conjuntos, function(e){ return e.nome == disciplina.taxonomia.conjunto; })[0];

                if(typeof conjunto !== 'undefined'){
                    if(conjunto.disciplinas <= 0 || conjunto.disciplinasFeitas < conjunto.disciplinas){
                        conjunto.disciplinasFeitas++;
                        conjunto.creditosFeitos += disciplina.creditos;
                    }
                }
            }
        });

        this.curso.conjuntos.forEach( function ( conjunto ) {
            _this.curso.totalDeDisciplinasFeitas += conjunto.disciplinasFeitas;
            _this.curso.totalDeCreditosFeitos += Math.min(conjunto.creditosFeitos, conjunto.creditos);
        } );

        if(typeof notify === 'undefined' || !notify)
            this.cabecalhoModificadoEvent.notify( this.curso );
    };

    Modelo.prototype.desfazerTodos = function ( ) {
        var _this = this;

        this.curso.disciplinas.forEach( function ( disciplina ) {
            disciplina.feita = false;

            libera = $.grep(_this.curso.disciplinas, function(e){ return $.inArray(disciplina.id, e.requisitos) !== -1});
            libera.forEach(function(disciplina){
                disciplina.liberada = false;
            });
        });

        this.salvarLocalmente();
        this.processarCabecalho( );
        this.pesquisaProcessadaEvent.notify( this._disciplinasObj );
    };

    Modelo.prototype.interagirComDisciplina = function ( id ) {
        var disciplina,
            disciplinasModificadas,
            _this = this;

        disciplina = $.grep(this.curso.disciplinas, function(e){ return e.id == id; })[0];

        disciplinasModificadas = [];
        if( typeof disciplina !== 'undefined' ){

            if( disciplina.liberada ) {
                disciplina.feita = !disciplina.feita;
                disciplinasModificadas.push( disciplina );
                if( disciplina.feita ) {
                    libera = $.grep(this.curso.disciplinas, function(e){ return $.inArray(id, e.requisitos) !== -1});
                    libera.forEach(function(disciplina){
                        disciplinasModificadas.push( disciplina );
                        disciplina.liberada = _this._deveLiberar( disciplina );
                    });
                }else{
                    libera = $.grep(this.curso.disciplinas, function(e){ return $.inArray(id, e.requisitos) !== -1});
                    libera.forEach(function(disciplina){
                        disciplinasModificadas.push( disciplina );
                        disciplina.liberada = false;
                    });
                }
            }
        }
        if(disciplinasModificadas.length > 0)
            this.processarCabecalho( );

        _this._verificarDisciplinasComCreditosMinimos( disciplinasModificadas );

        this.salvarLocalmente( );

        this.itemsModificadosEvent.notify( disciplinasModificadas )
    };

    Modelo.prototype.interagirComInfo = function ( id ) {

        this.ultimoInfo = this.infoSelected;
        if(this.infoSelected == id){
            this.infoSelected = undefined;
        }else{
            this.infoSelected = id;
        }

        if(typeof this.infoSelected !== 'undefined'){
            var disciplina,
                disciplinas;

            disciplina = $.grep(this.curso.disciplinas, function(e){ return e.id == id; })[0];

            disciplinas = {
                requisitos: [],
                disciplina: [disciplina],
                desbloqueia: []
            };

            for(var i = 0; i < disciplina.requisitos.length; i++) {
                var idRequisito = disciplina.requisitos[i];
                var requisito = $.grep(this.curso.disciplinas, function(e){ return e.id == idRequisito; })[0];

                if(typeof requisito !== 'undefined')
                    disciplinas.requisitos.push(requisito);
            }

            disciplinas.desbloqueia = $.grep(this.curso.disciplinas, function(e){ return $.inArray(id, e.requisitos) !== -1});


            this._disciplinasObj = disciplinas;

            this.pesquisaProcessadaEvent.notify( this._disciplinasObj, id );
        }else{
            this.processarPesquisa( this.ultimaPesquisa );
        }

    };

    Modelo.prototype._deveLiberar = function ( disciplina ) {
        var requisitos = disciplina.requisitos,
            _this = this;



        for(var i = 0; i < requisitos.length; i++ ) {
            var id = requisitos[i];
            var disci = $.grep(_this.curso.disciplinas, function(e){ return e.id == id; })[0];

            if( typeof disci !== 'undefined' ){
                if( !disci.feita )
                    return false;
            }
        }

        if(typeof disciplina.minCreditos !== 'undefined')
            if(this.curso.totalDeCreditosFeitos < disciplina.minCreditos)
                return false;



        return true;
    };
    Modelo.prototype._verificarDisciplinasComCreditosMinimos = function ( modificadas ) {
        var libera = $.grep(this.curso.disciplinas, function(e){ return typeof e.minCreditos !== 'undefined' }),
            _this = this;
        libera.forEach(function(disciplina){
            modificadas.push( disciplina );
            disciplina.liberada = _this._deveLiberar( disciplina );
        });
    };

    window.Pogad = window.Pogad || { };
    window.Pogad.Modelo = Modelo
})();
