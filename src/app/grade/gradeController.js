"use strict";

(function() {

    class GradeController {

        constructor( $http, $scope, $log ) {
            var con = this;

            $scope.todos = [
                {
                    done: false,
                    title: "Contrução de algoritmos e programação",
                    description: "Matéria bacana"
                }
            ];
        }
    }

    angular.module("Agrade")
        .controller( "GradeController", GradeController );

})();
