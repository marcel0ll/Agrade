"use strict";

angular.module("Agrade")
    .directive( "toptoolbar",
        () => ({
            templateUrl: "components/topToolbar/topToolbar.html",
            restrict: "E",
            controller: "TopToolbarController",
            controllerAs: "topToolbar"
        })
    );
