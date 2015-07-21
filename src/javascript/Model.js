(function ( ) {

    function Model ( ) {
        this.majorList;
        this.major;

        this.loadMajorEvent = new Pogad.Event(this);
        this.loadMajorListEvent = new Pogad.Event(this);
    }

    Model.prototype.loadMajor = function ( path ) {
        var _this = this;

        //Caso estejam mandando carregar o major já carregado, só retorne o major sem fazer outra requisição
        if(this.major && this.major.key === path){
            _this.loadMajorEvent.notify( true, this.major );
        }else{            
            $.ajax({
                    url:'./config/cursos/' + path + '.json',
                    datatype: 'json'
                })
            .success(function ( json ) {
                var major = typeof json === 'string' ? JSON.parse(json) : json;
                
                major.key = path;
                _this.prepareData ( major.disciplinas );
                //TODO: Checar se o curso não está no local storage e tratar isso

                _this.major = major;

                _this.loadMajorEvent.notify( true, _this.major );
            })
            .error(function ( ) {
                _this.loadMajorEvent.notify( false );
            });
        }
    }

    Model.prototype.loadMajorList = function ( ) {
        var _this = this;

        //Caso estejam mandando carregar o a lista já carregada, só retorne a lista sem fazer outra requisição
        if(this.majorList){
            _this.loadMajorListEvent.notify( true, _this.majorList );
        }else{
            $.ajax({
                    url:'./config/setup.json',
                    datatype: 'json'
                })
            .success(function ( json ) {
                var majorList = typeof json === 'string' ? JSON.parse(json) : json;
                
                _this.majorList = [];
                for(x in majorList){
                    _this.majorList.push({name: x, url:majorList[x]});
                }
                _this.majorList = _this.majorList.sort(function(a,b){
                    var x = a.name.toLowerCase(),
                        y = b.name.toLowerCase();

                    if(x < y) return -1;
                    if(x > y) return 1;

                    return 0;
                });

                _this.loadMajorListEvent.notify( true, _this.majorList );
            })
            .error(function ( ) {
                _this.loadMajorListEvent.notify( false );
            });
        }
    }

    Model.prototype.prepareData = function ( data ){
        data.forEach(function( disciplina ) {
            disciplina.done = false;
        });
    }

    window.Pogad = window.Pogad || { };
    window.Pogad.Model = Model
})();