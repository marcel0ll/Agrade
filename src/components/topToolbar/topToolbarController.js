"use strict";

class TopToolbarController {

    constructor( $scope, $mdSidenav ) {
        $scope.context = "Ciência da Computação";
        $scope.toggleSidenav = function( side ) {
            $mdSidenav( side ).toggle();
        };
    }

}

angular.module("Agrade")
    .controller( "TopToolbarController", TopToolbarController );
