function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

$(document).ready(function(){

    var cursos = [],
        $seletor =  $('#cursoSelector'),
        $camadaCarregando = $('#carregando'),
        $camadaSeletor = $('#seletor'),
        $camadaLista = $('#lista'),
        $camadaQuery = $('#query'),
        $queryInput = $('#query-input'),
        query,
        disciplinas = [];


    function aplicarQuery ( ) {        
        var i, j,
            queryTokens,
            token,
            tokenString,
            elements = ['<h3 class="separador">', '<h4 class="separador">', '<p class="separador">'];

        $('.separador').remove();
        query = $queryInput.val();
        console.log(query);
        queryTokens = [];
        valuesRaw = [];
        values = [];
        queryTokensRaw = query.split(' ');
        $.each(queryTokensRaw, function(i, rawToken){
            var token = rawToken.split('=')[0],
                value = rawToken.split('=')[1];

            queryTokens.push(token);
            valuesRaw.push(value);
        });
        uniqueTokens = [];

        $.each(queryTokens, function(i, el){
            if($.inArray(el, uniqueTokens) === -1) {
                uniqueTokens.push(el);
                values.push(valuesRaw[i]);
            }
        });

        disciplinas = disciplinas.sort(function(a, b) {

                    for(i=0;i<uniqueTokens.length;i++){
                        var token = uniqueTokens[i];
                        if(a.taxonomia[token] && b.taxonomia[token]){
                            if(a.taxonomia[token] < b.taxonomia[token])
                                return -1;
                            if(a.taxonomia[token] > b.taxonomia[token])
                                return 1;
                        }
                    };

                    var x3 = a.nome.toLowerCase(),
                        y3 = b.nome.toLowerCase();
                    
                    if (x3 < y3) return -1;
                    if (x3 > y3) return 1;

                    return 0;
                });
        $('.disciplinas').empty();

        for(i=0;i<disciplinas.length;i++){
                    var disciplina = disciplinas[i];                    

                    var $disciplina = $('<div class="checkbox disciplina" data-id="' + disciplina.id + '">'
                                    +   '<input type="checkbox">'
                                    +   '   <label>'
                                    +   disciplina.id + ' - ' + disciplina.nome
                                    +   '   </label>'
                                    +   '</div>');

                    $('.disciplinas', $camadaLista).append($disciplina);                   
                }
       

        for(j = 0; j<uniqueTokens.length;j++){
            var element = j < elements.length ? elements[j] : elements[elements.length-1];

            token = uniqueTokens[j];
            tokenString = token.charAt(0).toUpperCase() + token.slice(1);

            if(disciplinas[0].taxonomia[token]){
                $('.checkbox[data-id='+ disciplinas[0].id +']').before($(element).text(tokenString + ": " + disciplinas[0].taxonomia[token]));
                for(i=1; i<disciplinas.length;i++){
                    var disciplina = disciplinas[i],
                        outraDisciplina = disciplinas[i-1];

                    if(disciplina.taxonomia[token] != outraDisciplina.taxonomia[token]){
                        $('.checkbox[data-id='+ disciplina.id +']').before($(element).text(tokenString + ": " + disciplina.taxonomia[token]))
                    }
                }
            }

            if(values[j]){
                for(i=0; i<disciplinas.length;i++){
                    var disciplina = disciplinas[i];
                    if(disciplinas[i].taxonomia[token]){
                        if(disciplinas[i].taxonomia[token].toLowerCase().search(values[j].toLowerCase()) == -1)
                            $('.checkbox[data-id='+ disciplina.id +']').hide();
                    }else if(disciplinas[i][token]){
                        if(disciplinas[i][token].toLowerCase().search(values[j].toLowerCase()) == -1)
                            $('.checkbox[data-id='+ disciplina.id +']').hide();
                    }
                }
                
            }
        }

        $('.disciplina', $camadaLista).click(
                      function() {
                        //mouseEnter
                        var $disciplina,
                            disciplina,
                            requisitos,
                            libera,
                            jaSelecionado,
                            id;

                        jaSelecionado = $(this)[0] === $('.checkbox.selected')[0];
                            
                        $('.checkbox')
                        .removeClass('selected')
                        .removeClass('requisito')
                        .removeClass('libera');

                        if(!jaSelecionado){
                            $disciplina = $(this);
                            $disciplina.addClass( 'selected' );


                            id = $disciplina.attr('data-id');

                            disciplina = $.grep(disciplinas, function(e){ return e.id == id; })[0];
                            // debugger;
                            disciplina.requisitos.forEach(function(element){                           
                                var $requisito = $('.checkbox[data-id="'+ element + '"]');

                                $requisito.addClass( 'requisito' );

                            });
                            libera = $.grep(disciplinas, function(e){ return $.inArray(id, e.requisitos) !== -1});
                            console.log(libera);
                            libera.forEach(function(disciplina){
                                var $libera = $('.checkbox[data-id="'+ disciplina.id + '"]');

                                $libera.addClass( 'libera' );
                            });
                        }

                      });
    }

    $.ajax({
        url:'./config/setup.json',
        datatype: 'json'
    }).done(function ( json ) {
        // console.log(json);

        var data = typeof json === 'string' ? JSON.parse(json) : json;

        for(x in data){
            cursos.push({nomeCurso: x, url:data[x]+'.json'});
        }
        cursos = sortByKey(cursos, 'nomeCurso');
        // debugger;
       
       $seletor.selectize({
                    maxItems: 1,
                    valueField: 'url',
                    labelField: 'nomeCurso',
                    searchField: 'nomeCurso',
                    options: cursos,
                    create: false
                });

        // $seletor[0].selectize.addItem( 2, true);

         $camadaCarregando.hide();

         $('#carregar').click(function(){                    
            var i;

            cursoJsonPath = $seletor[0].selectize.getValue();

            $.ajax({
                url:'./config/cursos/'+cursoJsonPath,
                datatype: 'json'
            }).done(function ( json ) {
                var data = typeof json === 'string' ? JSON.parse(json) : json;

                // console.log(data.nome);

                
                $camadaSeletor.hide();
                $camadaLista.show();
                $camadaQuery.show();

                $('.nomeCurso', $camadaLista).text(data.nome);

                // debugger;
                disciplinas = data.disciplinas.sort(function(a, b) {
                    var x1 = a.taxonomia.perfil,
                        y1 = b.taxonomia.perfil,
                        x2 = a.taxonomia.conjunto,
                        y2 = b.taxonomia.conjunto,
                        x3 = a.nome.toLowerCase(),
                        y3 = b.nome.toLowerCase();

                    if (x1 < y1) return -1;
                    if (x1 > y1) return 1;
                    if (x2 < y2) return -1;
                    if (x2 > y2) return 1;
                    if (x3 < y3) return -1;
                    if (x3 > y3) return 1;

                    return 0;
                });

                for(i=0;i<disciplinas.length;i++){
                    var disciplina = disciplinas[i];
                    disciplina.feito = false;

                    var $disciplina = $('<div class="checkbox disciplina" data-id="' + disciplina.id + '">'
                                    +   '<input type="checkbox">'
                                    +   '   <label>'
                                    +   disciplina.id + ' - ' + disciplina.nome
                                    +   '   </label>'
                                    +   '</div>');

                    $('.disciplinas', $camadaLista).append($disciplina);                   
                }

                $('.disciplina', $camadaLista).click(
                      function() {
                        //mouseEnter
                        var $disciplina,
                            disciplina,
                            requisitos,
                            libera,
                            jaSelecionado,
                            id;

                        jaSelecionado = $(this)[0] === $('.checkbox.selected')[0];
                            
                        $('.checkbox')
                        .removeClass('selected')
                        .removeClass('requisito')
                        .removeClass('libera');

                        if(!jaSelecionado){
                            $disciplina = $(this);
                            $disciplina.addClass( 'selected' );


                            id = $disciplina.attr('data-id');

                            disciplina = $.grep(disciplinas, function(e){ return e.id == id; })[0];
                            // debugger;
                            disciplina.requisitos.forEach(function(element){                           
                                var $requisito = $('.checkbox[data-id="'+ element + '"]');

                                $requisito.addClass( 'requisito' );

                            });
                            libera = $.grep(disciplinas, function(e){ return $.inArray(id, e.requisitos) !== -1});
                            console.log(libera);
                            libera.forEach(function(disciplina){
                                var $libera = $('.checkbox[data-id="'+ disciplina.id + '"]');

                                $libera.addClass( 'libera' );
                            });
                        }

                      });

                // $queryInput.change(aplicarQuery);
                $queryInput.keyup(aplicarQuery);
               
                aplicarQuery();


            });

         });

    });

    
});
