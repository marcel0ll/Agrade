"use strict";

(function() {

    class HomeController {

        constructor( $http, $scope, $log ) {
            var con = this;

            $scope.universidades = [
                {
                    name: "Ufscar",
                    campus: [
                        {
                            name: "São Carlos",
                            cursos: [
                                {
                                    name: "Ciências da Computação"
                                },
                                {
                                    name: "Engenharia da Computação"
                                },
                                {
                                    name: "Matemática"
                                }
                            ]
                        },
                        {
                            name: "Sorocaba"
                        },
                        {
                            name: "Araras"
                        }
                    ]
                },
                {
                    name: "USP"
                }
            ];

            this.findByKey = function( array, key, value ) {
                var found = [];
                for ( var i = 0; i < array.length; i++ ) {
                    if ( array[ i ][ key ].includes( value ) ) {
                        found.push( array[ i ] );
                    }
                }

                return found;
            };

            $scope.getUniversidades = function( searchText ) {
                searchText = searchText || "";
                return con.findByKey( $scope.universidades, "name", searchText );
            };

            $scope.getCampus = function( searchText ) {
                searchText = searchText || "";
                return con.findByKey( $scope.universidade.campus, "name", searchText );
            };

            $scope.getCursos = function( searchText ) {
                searchText = searchText || "";
                return con.findByKey( $scope.campus.cursos, "name", searchText );
            };

        }
    }

    angular.module("Agrade")
        .controller( "HomeController", HomeController );

})();
