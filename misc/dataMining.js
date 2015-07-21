/*
    Script para mineração de dados do site PROGRAD da universidade UFSCar

    O script minera dados do curso do aluno para ser usados no programa Pogad.
    O Pogad é um programa de auxílio ao planejamento das disciplinas que você está fazendo ou fará

    @author Otho
*/
( function ( ) {

    //Protótipo para Disciplina
    function Disciplina ( id ) {
        this.id = id;
        this.nome;

        this.creditos;
        this.aulas;
        this.laboratorios;
        this.estagio;

        this.requisitos = [];
        this.coRequisitos = [];
        this.equivalencia = [];
        this.dispensadaPor = [];

        this.taxonomia = {};
    }

    //Protótipo para Conjunto
    function Conjunto ( ) {
        this.nome;
        this.disciplinas;
        this.creditos;
    }

    //Protótipo de Curso
    function Curso ( ) {
        this.nome = '';
        this.conjuntos = [];
        this.disciplinas = [];
    }

    //Função que auxilia na mineração de elementos do DOM. Sintaxe similar a da biblioteca Jquery
    function $ ( seletor, elemento ) {
        return ( elemento || contexto ).querySelectorAll( seletor );
    }

    //Declaração de todas as variáveis que serão usadas no script
    var contexto,
        curso,
        tabelas,
        tabelaDeCurso,
        tabelaDeDisciplinas,
        linhasDaTabelaDeDisciplinas,
        tabelaDeConjuntos,
        linhasDaTabelaDeConjuntos;
   
    //Mudamos o contexto do documento para dentro do frame onde estão as informações do curso
    contexto = $( 'frame', document )[1].contentWindow.document.body;

    //Objeto que conterá todas as informações que forem mineradas
    curso =  new Curso( );
    
    //Minerar tabelas onde está o conteúdo
    tabelas = $( 'body>center>table' ), 
    tabelaDeCurso  = tabelas[1],
    tabelaDeDisciplinas = tabelas[2],
    tabelaDeConjuntos  = tabelas[3];
    
    //Minerar nome do curso
    curso.nome = $( 'b', tabelaDeDisciplinas )[0].innerHTML;
    
    
    //Minerar linhas da tabela de cursos
    linhasDaTabelaDeDisciplinas = tableDisciplinas.children[0].children;

    //Minerar disciplinas
    //Pular o header da tabela -> i = 1
    //Cada 2 linhas da tabela é uma disciplina -> i += 2
    for( i = 1; i < linhasDaTabelaDeDisciplinas.length; i += 2 ){
        var linha1,
            linha2,
            colunasLinha1,
            colunasLinha2,
            id,
            disciplina;

        linha1 = linhasDaTabelaDeDisciplinas[i],
        linha2 = linhasDaTabelaDeDisciplinas[i+1],
        colunasLinha1 = $( 'td', linha1 ),
        colunasLinha2 = $( 'td', $( 'td', linha2 )[0] ),
        id = colunasLinha1[1].innerText;
        disciplina = new Disciplina( id );

        disciplina.nome = colunasLinha1[2].innerText;
        disciplina.creditos = parseInt( colunasLinha1[3].innerText );
        disciplina.aulas = parseInt( colunasLinha1[4].innerText );
        disciplina.laboratorios = parseInt( colunasLinha1[5].innerText );
        disciplina.estagio = parseInt( colunasLinha1[6].innerText );

        disciplina.requisitos = colunasLinha2[4].innerText.split( ' OU ' );
        disciplina.coRequisitos = colunasLinha2[5].innerText.split( ' OU ' );
        disciplina.equivalencia = colunasLinha2[6].innerText.split( ' OU ' );
        disciplina.dispensadaPor = colunasLinha2[7].innerText.split( ' OU ' );

        disciplina.taxonomia.perfil = parseInt( colunasLinha1[0].innerText );
        disciplina.taxonomia.conjunto = colunasLinha1[7].innerText;

        curso.disciplinas.push( disciplina );
    }

    //Minerar tabela de conjuntos
    linhasDaTabelaDeConjuntos = $( 'tr', tabelaDeConjuntos );

    //Para cada linha da tabela conjunto minere o nome, o número de disciplinas e o número de créditos
    //Pular o header da tabela -> i = 1
    for( i = 1; i < linhasDaTabelaDeConjuntos.length; i++ ) {
        var linha,
            colunas,
            conjunto;

        linha  = linhasDaTabelaDeConjuntos[i];
        colunas = $( 'td', linha );
        conjunto = new Conjunto ( );

        conjunto.nome = colunas[0].innerText;
        conjunto.disciplinas = parseInt( colunas[1].innerText );
        conjunto.creditos = parseInt( colunas[2].innerText );

        curso.conjuntos.push( conjunto );
    }
   
    //Limpe o console
    console.clear( );

    //Escreva no console o objeto curso no formato json com identação de 4 espaços
    console.log( JSON.stringify( curso, null, 4 ) );
} )( );