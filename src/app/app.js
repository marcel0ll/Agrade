/*
    Arquivo de configuração do aplicativo Agrade
*/
"use strict";

angular.module( "Agrade", [
        "ngMaterial",
        "ui.router"
    ]).config(function( $stateProvider, $urlRouterProvider ) {
        $urlRouterProvider.otherwise("/");
    });
