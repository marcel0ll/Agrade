(function ( ) {

    function Visao ( template, versao ) {        
        this.template = template;

        this.$camadaCarregando = $( '#carregando' );

        this.$camadaSeletor = $( '#seletor' );
        this.$cursosDropdown =  $( '#cursoSelector' );
        this.$carregarCurso = $( '#carregar' );

        this.$camadaLista = $( '#lista' );        
        this.$listaDeDisciplinas = $( '#lista-disciplinas' );
        this.$nomeDoCurso = $( '#lista-nomeCurso' );

        this.$camadaBarraDoTopo = $( '#query' );
        this.$maisDetalhes = $( '#more__plus' );
        this.$minimizar = $( '#topBar-minimizar' );
        this.$desfazerTodos = $( '#topBar-desfazer' );
        this.$porcentagemDoCurso = $( '#topBar-data__porcentagemDoCurso-conteudo' );
        this.$creditosFeitos = $( '#topBar-data__creditosFeitos' );
        this.$creditosParaFazer = $( '#topBar-data__creditosTotais' );
        this.$barraDoTopoNomeDoCurso = $( '#topBar-data__nomeCurso' );
        this.$barraDePesquisa = $('#query-input');

        this.minimizar = true;
        this.desejaDesfazer = false;
        
        this.iniciarEvent = new Pogad.Event( this );
        this.carregarCursoEvent = new Pogad.Event( this );

        this.checkboxCliqueEvent = new Pogad.Event( this );
        this.infoCliqueEvent = new Pogad.Event( this );
        
        this.separadorCliqueEvent = new Pogad.Event( this );

        this.desfazerTodosEvent = new Pogad.Event( this );
        this.mudarPesquisaEvent = new Pogad.Event( this );

        $( '.footer-version' ).text( versao );

        $(document).ready( this.iniciar.bind(this) );
    }

    Visao.prototype.iniciar = function ( ) {
        var caminhoInteiro,
            caminho;

        //Pegue a URL inteira do browser
        caminhoInteiro = window.location.href;

        //Separe ela pelo '#'' e pegue a segunda parte        
        caminho = caminhoInteiro.split('#')[1];

        //Notifique que o aplicativo foi iniciado com esse caminho        
        this.iniciarEvent.notify( caminho );
    };

    Visao.prototype.iniciarSelecaoDeCurso = function ( listaDeCursos ) {
        console.log("iniciarSelecaoDeCurso");

        this.$cursosDropdown.selectize({
                    maxItems: 1,
                    valueField: 'url',
                    labelField: 'nome',
                    searchField: 'nome',
                    options: listaDeCursos,
                    items: [listaDeCursos[0].url],
                    create: false
                });  

        this.$camadaCarregando.hide();  

        this.$carregarCurso.click( this.carregarCurso.bind(this) );  
    };

    Visao.prototype.iniciarListagemDoCurso = function ( curso ) {
        var _this = this;
        console.log( curso );
        if( this.template.itemCurso ){
            this.$camadaCarregando.hide( );
            this.$camadaSeletor.hide( );
            this.$camadaLista.show( );
            this.$camadaBarraDoTopo.show();

            this.atualizarCabecalho( curso );

            this.$nomeDoCurso.text( curso.nome );

            this.$maisDetalhes.click( function ( ) {
                var $this;

                $this = $(this);

                $this.toggleClass('glyphicon-minus');
                $this.toggleClass('glyphicon-plus');

                if(!(_this.$camadaBarraDoTopo.hasClass('aberta'))){
                    _this.$camadaBarraDoTopo.addClass( 'aberta' );
                    _this.$camadaBarraDoTopo.removeClass( 'fechada' );
                }else{
                    _this.$camadaBarraDoTopo.addClass( 'fechada' );
                    _this.$camadaBarraDoTopo.removeClass( 'aberta' );
                }
            });

            this.$minimizar.click( function ( ) {

                $('.separador>.titulo>span', this.$listaDeDisciplinas).each( function ( element ) {
                    var $this;

                    $this = $(this).parent().parent();

                    if(_this.minimizar){
                        $('.titulo>span', $this).removeClass('glyphicon-minus');
                        $('.titulo>span', $this).addClass('glyphicon-plus');
                        $('.separador-conteudo', $this).hide();
                    }else{
                        $('.titulo>span', $this).addClass('glyphicon-minus');
                        $('.titulo>span', $this).removeClass('glyphicon-plus');
                        $('.separador-conteudo', $this).show();
                    }
                });

                _this.minimizar = !_this.minimizar;
                if(_this.minimizar){
                    _this.$minimizar.text('Minimizar grupos');
                }else{
                    _this.$minimizar.text('Maximizar grupos');
                }
            });

            this.$desfazerTodos.click( function ( ) {

                if( !_this.desejaDesfazer ){
                    _this.desejaDesfazer = true;
                    $(this).toggleClass('btn-warning');
                    $(this).toggleClass('btn-danger');

                    $(this).text('Confirmar');

                    _$this = $(this);
                    setTimeout( function(){ 
                       _this.desejaDesfazer = false;
                        _$this.addClass('btn-warning');
                        _$this.removeClass('btn-danger');

                        _$this.text('Desfazer todos'); 
                    }
                    , 1500);
                }else {                    
                    _this.desejaDesfazer = false;
                    $(this).toggleClass('btn-warning');
                    $(this).toggleClass('btn-danger');

                    $(this).text('Desfazer todos');

                    _this.desfazerTodosEvent.notify();
                }
            });

            this.$barraDePesquisa.keyup( function ( ) {
                _this.mudarPesquisaEvent.notify( $(this).val().toLowerCase() );
            });
        }else{
            this.$camadaCarregando.show( );            
            this.template.caregarItemCursoEvent.onEventCall( function ( ) {
                _this.iniciarListagemDoCurso( );
            } );
        }
    }

    Visao.prototype.carregarCurso = function ( ) {
        var caminho = this.$cursosDropdown[0].selectize.getValue( );

        this.carregarCursoEvent.notify( caminho );
    }

    Visao.prototype.criarGrupo = function ( id, nivel, $pai ) {
        var separadorId = Math.min( nivel, this.template.separadores.length - 1);

        var $separador = $('<div class="separador">'),
            $titulo = $(this.template.separadores[separadorId]),
            $conteudo = $(this.template.separadorConteudo);

        id = id.charAt(0).toUpperCase() + id.slice(1);
        $titulo.text(id);
        $titulo.prepend($('<span class="glyphicon glyphicon-minus"></span>'));

        $separador.attr('data-id', id);
        $separador.addClass('col-md-12 col-sm-12 col-xs-12');
        $separador.append($titulo);
        $separador.append($conteudo);

        ($pai).append($separador);

        return $conteudo;
    }

    Visao.prototype.fazerLista = function ( disciplinasObj, infoId ) {
        // console.log( disciplinasObj );
        var _this = this;

        this.$listaDeDisciplinas.empty();

        function lookDown ( obj, id, nivel, pai ) { 
            if(id)
                pai = _this.criarGrupo ( id, nivel, pai )           
            if( !( obj instanceof Array ) ){                
                for( x in obj ) {                    
                    lookDown( obj[x], x, nivel+1, pai);
                }
            }else{
                obj.forEach( function ( disciplina ) {
                    _this.adicionarDisciplina( disciplina, pai );
                });
            }
        }

        lookDown(disciplinasObj, null, -1, this.$listaDeDisciplinas); 

        if(typeof infoId !== 'undefined')
            $($('.info[data-id='+ infoId + ']')[0]).addClass( 'selecionado' );

        //Adicione evento no checkbox de cada disciplina
        $('.checkbox', this.$listaDeDisciplinas).click(function ( ) {
            var $this,
                id;

            event.stopPropagation();

            $this = $( this );
            id = $this.attr('data-id');

            console.log( id );

            _this.checkboxCliqueEvent.notify( id );
        });

        //Adicione evento no info de cada disciplina
        $('.info', this.$listaDeDisciplinas).click(function ( ) {
            var $this,
                id;

            event.stopPropagation();

            $this = $( this );
            id = $this.attr('data-id');

            console.log( id );

            _this.infoCliqueEvent.notify( id );
        });

        $('.separador>.titulo>span', this.$listaDeDisciplinas).click(function ( event ) {
            var $this;

            event.stopPropagation();

            $this = $(this).parent().parent();

            $($('.titulo>span', $this)[0]).toggleClass('glyphicon-minus');
            $($('.titulo>span', $this)[0]).toggleClass('glyphicon-plus');
            $($('.separador-conteudo', $this)[0]).toggle();
        });
    }

    Visao.prototype.adicionarDisciplina = function ( disciplina, $pai ) {
        var $disciplina,
            html;

        html = this.template.itemCurso;
        html = html.replace(new RegExp('{{disciplina.id}}', 'g'), disciplina.id);
        html = html.replace(new RegExp('{{disciplina.nome}}', 'g'), disciplina.nome);

        $disciplina = $(html);
        $disciplina.attr('data-id', disciplina.id);

        if( !disciplina.liberada ) {
            $('.checkbox', $disciplina).addClass( 'trancada' );
        }else if( disciplina.feita ) {
            $('.checkbox', $disciplina).addClass( 'feita' );
        }

        $pai.append($disciplina);
    };

    Visao.prototype.definirPesquisa = function ( pesquisa ) {
        this.$barraDePesquisa.val( pesquisa );
    }

    Visao.prototype.atualizarDisciplinas = function ( disciplinas ) {
        console.log("longo caminho", disciplinas);

        disciplinas.forEach( function ( disciplina ) {
            $disciplina = $($('.checkbox[data-id='+ disciplina.id + ']')[0]);

            if(disciplina.liberada){
                $disciplina.removeClass( 'trancada' );
                if(disciplina.feita){
                    $disciplina.addClass( 'feita' );
                }else{
                    $disciplina.removeClass( 'feita' );                
                }
            }else{
                $disciplina.addClass( 'trancada' );
            }
        });
    };

    Visao.prototype.atualizarCabecalho = function ( curso ) {
        this.$porcentagemDoCurso.text( ( ( curso.totalDeCreditosFeitos * 100 ) / curso.totalDeCreditos ).toFixed( 2 ) + '%' );
        this.$creditosFeitos.text( curso.totalDeCreditosFeitos );
        this.$creditosParaFazer.text( curso.totalDeCreditos );
        this.$barraDoTopoNomeDoCurso.text( curso.nome );


    };

    window.Pogad = window.Pogad || { };
    window.Pogad.Visao = Visao;
})();