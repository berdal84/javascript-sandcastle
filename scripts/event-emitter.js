const { assert } = require("console");

let EventEmitter = function() {
    console.log(`new EventEmitter`);
    this.listeners = [];

    this.addListener = ( _callback ) => {
        console.log(`Add listener`);
        let listener = new EventListener(_callback);
        this.listeners.push( listener )
        return listener;
    }

    this.removeListener = ( _listener ) => {
        console.log(`Remove listener`);
        let index = this.listeners.indexOf( _listener );
        if ( index != -1 ) {
            this.listeners.splice( index, 1 );
        } else {
            console.error("listener not found!");
        }
       
    }

    this.emit = ( _event ) => {
        console.log(`Event emitted: ${_event}`);
        this.listeners.forEach( eachListener => {
            eachListener.callback( _event );
        });
    }
}

let EventListener = function( _callback ) {
    console.log(`new EventListener`);
    this.callback = _callback;
}



console.log("=============================");
console.log("Program:");

let receivedEvents1 = [];
let receivedEvents2 = [];

let emitter = new EventEmitter()
emitter.emit("1 - Hello world!")     // should not be received by listener
let listener1 = emitter.addListener( ( event ) => {
    receivedEvents1.push(event);
    console.log(`Event received!`);
})
let listener2 = emitter.addListener( ( event ) => {
    receivedEvents2.push(event);
    console.log(`Event received!`);
})
emitter.emit("2 - Hello world!")     // should be received by listener
emitter.removeListener( listener1 );
emitter.emit("3 - Hello world!")     // should not be received by listener

console.log("=============================");
console.log("Tests:");

assert( receivedEvents1.length === 1);
assert( receivedEvents1[0] === "2 - Hello world!");

assert( receivedEvents2.length === 2);
assert( receivedEvents2[0] === "2 - Hello world!");
assert( receivedEvents2[1] === "3 - Hello world!");

console.log("=============================");



