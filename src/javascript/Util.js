(function () {
    function Util () {

    }

    Util.prototype.mixInto = function ( obj, extra, force) {
        var x;

        for( x in extra ) {
            if( typeof obj[x] === 'undefined' || force ) {
                if( typeof extra[x] === 'function' ) {
                    obj[x] = extra[x];
                } else {
                    obj[x] = extra[x];
                }
            }
        }
    };

    window.Agrade = window.Agrade || {};
    window.Agrade.Util = new Util();
})();