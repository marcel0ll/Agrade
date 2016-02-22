/*
    Arquivo de configuração do aplicativo Agrade
*/
"use strict";

angular.module( "Agrade", [
        "ngMaterial",
        "ngMdIcons",
        "ui.router"
    ]).config(function( $stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider ) {
        $urlRouterProvider
            .otherwise( "/" );

        $locationProvider.html5Mode( true );
        $mdThemingProvider.theme("default")
            .primaryPalette("blue")
            .accentPalette("orange")
            .warnPalette("yellow")
            .backgroundPalette("grey");
    });

