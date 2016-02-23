"use strict";

(function() {

    class GradeController {

        constructor( $http, $scope, $log, $mdSidenav ) {
            var con = this;

            $scope.components = [
                {
                    done: false,
                    force: false,
                    title: "Contrução de algoritmos e ",
                    description: "Matéria bacana"
                },
                {
                    done: false,
                    force: false,
                    title: "Contrução de algoritmos e ",
                    description: "Matéria bacana"
                },
                {
                    done: false,
                    force: false,
                    title: "Contrução de algoritmos e ",
                    description: "Matéria bacana"
                },
                {
                    done: false,
                    force: false,
                    title: "Contrução de algoritmos e ",
                    description: "Matéria bacana"
                },
                {
                    done: false,
                    force: false,
                    title: "Contrução de algoritmos e ",
                    description: "Matéria bacana"
                },
                {
                    done: false,
                    force: false,
                    title: "Contrução de algoritmos e ",
                    description: "Matéria bacana"
                },
                {
                    done: false,
                    force: false,
                    title: "Contrução de algoritmos e ",
                    description: "Matéria bacana"
                },
                {
                    done: false,
                    force: false,
                    title: "Contrução de algoritmos e ",
                    description: "Matéria bacana"
                },
                {
                    done: false,
                    force: false,
                    title: "Contrução de algoritmos e ",
                    description: "Matéria bacana"
                },
                {
                    done: false,
                    force: false,
                    title: "Contrução de algoritmos e ",
                    description: "Matéria bacana"
                }
            ];

            $scope.itemClick = function( item ) {
                item.done = !item.done;
            };

            $scope.getIcon = function( item ) {
                if ( item.done ) {
                    return "check_box";
                }
                // if ( item.force ) {
                //     return "star_half";
                // }

                return "check_box_outline_blank";
            };

            $scope.openLeftMenu = function() {
                $mdSidenav( "left" ).toggle();
            };
        }
    }

    angular.module("Agrade")
        .controller( "GradeController", GradeController );

})();
