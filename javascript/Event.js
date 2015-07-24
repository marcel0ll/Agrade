(function () {

    function Handler ( callback, context ){
        this.callback = callback;
        this.context = context;
    }

    function Event ( sender ) {
        this._sender = sender;
        this._handlers = [];
    }

    Event.prototype.onEventCall = function ( callback, context ) {
        context = context || this;
        // console.log("Event:", this, "onEventCall: ", callback, "context:", context);

        this._handlers.push(new Handler(callback, context));
    }

    Event.prototype.notify = function () {
        // console.log("Notify:", this);
        var i;

        for( i = 0; i < this._handlers.length; i++){
            var handler = this._handlers[i];
            handler.callback.apply(handler.context, arguments);
        }
    }

    window.Pogad = window.Pogad || { };
    window.Pogad.Event = Event;
})();
