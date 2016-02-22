"use strict";

angular.module("Agrade")
    .config(function( $stateProvider ) {
        $stateProvider
            .state("home", {
                url: "/a",
                templateUrl: "app/home/home.html",
                controller: "HomeController",
                controllerAs: "home"
            });
    });
