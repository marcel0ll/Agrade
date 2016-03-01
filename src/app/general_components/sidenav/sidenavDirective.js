"use strict";

angular.module("Agrade")
    .directive( "sidenav",
        () => ({
            templateUrl: "components/sidenav/sidenav.html",
            restrict: "E",
            controller: "SidenavController",
            controllerAs: "sidenav"
        })
    );
