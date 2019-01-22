export default class Event {
    constructor(sender) {
        this._sender = sender;
        this._handlers = [];
    }

    onEventCall(callback, context) {
        context = context || this;

        this._handlers.push(new Handler(callback, context));
    }

    notify() {
        for (var i = 0; i < this._handlers.length; i++) {
            var handler = this._handlers[i];
            handler.callback.apply(handler.context, arguments);
        }
    }
}
class Handler {
    constructor(callback, context) {
        this.callback = callback;
        this.context = context;
    }
}
