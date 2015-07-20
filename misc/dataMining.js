(function ( ) {

    var context = document;

    //Protótipo para Disciplina
    function Disciplina (id) {
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

    //Função que auxilia na mineração de elementos do DOM. Sintaxe similar ao Jquery
    function $ (selector, element){
        return (element || context).querySelectorAll(selector);
    }

    //Temos que mudar o contexto do documento para dentro do frame onde estão as informações do curso
    context = $('frame')[1].contentWindow.document.body;


    //Objeto que conterá todas as informações que forem mineradas
    var curso = {
        nome : '',
        disciplinas : []
    };

    
    //Minerar tabelas onde estão o conteúdo
    var tableCurso  = $('table')[1],
        tableDisciplinas = $('table')[2],
        tableExtra  = $('table')[2];
    
    //Minerar nome do curso
    curso.nome = $('b', tableCurso)[0].innerHTML;
    
    
    //Minerar linhas da tabela de cursos
    // debugger;
    var rows = tableDisciplinas.children[0].children;

    //Minerar disciplinas
    //Pular o header da tabela -> i = 1
    //Cada 2 linhas da tabela é uma disciplina -> i += 2
    for(i=1; i<rows.length; i+=2){
        var row1 = rows[i],
            row2 = rows[i+1],
            row1Data = $('td', row1),
            row2Data = $('td', $('td', row2)[0]),
            id = row1Data[1].innerText;
            disciplina = new Disciplina(id);

        // debugger;
        disciplina.nome = row1Data[2].innerText;
        disciplina.creditos = parseInt(row1Data[3].innerText);
        disciplina.aulas = parseInt(row1Data[4].innerText);
        disciplina.laboratorios = parseInt(row1Data[5].innerText);
        disciplina.estagio = parseInt(row1Data[6].innerText);

        // debugger;
        disciplina.requisitos = row2Data[4].innerText.split(' OU ');
        disciplina.coRequisitos = row2Data[5].innerText.split(' OU ');
        disciplina.equivalencia = row2Data[6].innerText.split(' OU ');
        disciplina.dispensadaPor = row2Data[7].innerText.split(' OU ');

        disciplina.taxonomia.perfil = parseInt(row1Data[0].innerText);
        disciplina.taxonomia.conjunto = row1Data[7].innerText;

        curso.disciplinas.push(disciplina);
        
        // console.log(disciplina.id, disciplina.nome);
    }

    //TODO: Ler data da ultima tabela que contem os conjuntos e a quantidade de creditos de cada um

   
    // console.log(curso)
    console.clear();
    console.log(JSON.stringify(curso, null, 4));
})();