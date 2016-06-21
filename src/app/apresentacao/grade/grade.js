"use strict";

angular.module("Agrade")
    .config(function( $stateProvider ) {
        $stateProvider
            .state("grade", {
                url: "/grade",
                templateUrl: "app/screen_grade/grade.html",
                controller: "GradeController",
                controllerAs: "grade"
            });
    });
