"use strict";

angular.module("Agrade")
    .config(function( $stateProvider ) {
        $stateProvider
            .state("grade", {
                url: "/",
                templateUrl: "app/grade/grade.html",
                controller: "GradeController",
                controllerAs: "grade"
            });
    });
