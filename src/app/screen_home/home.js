"use strict";

angular.module("Agrade")
    .config(function( $stateProvider ) {
        $stateProvider
            .state("home", {
                url: "/",
                templateUrl: "app/screen_home/home.html",
                controller: "HomeController",
                controllerAs: "home"
            });
    });
