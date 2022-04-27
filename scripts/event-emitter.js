import { assert } from "console";
import { it, describe, expect } from "./testing.js" // this lib is the result of an exercise too!

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


describe( "EventEmitter", () => {


    it( "addListener", () => {

        let receivedEvents = []; 
        const emitter = new EventEmitter()        
        const listener = emitter.addListener( ( event ) => {
            receivedEvents.push(event);
            console.log(`Event received!`);
        })
        emitter.emit("event")

        expect( emitter.listeners.length).toBe(1, "1 listener must be present");
        expect( receivedEvents.length).toBe(1, "listener should catch the event");
        expect( receivedEvents[0] ).toBe("event", "data should be reveived by listener");
    });

    it( "removeListener", () => {

        let receivedEvents = []; 
        const emitter = new EventEmitter()        
        const listener = emitter.addListener( ( event ) => {
            receivedEvents.push(event);
            console.log(`Event received!`);
        })
        expect( emitter.listeners.length).toBe(1, "1 listener must be present");
        emitter.removeListener(listener);
        expect( emitter.listeners.length).toBe(1, "no listener must be present");
        emitter.emit("event")
        expect( receivedEvents.length).toBe(0, "listener should receive no event after have been removed from emitter");
    });

    it( "Multiple listeners", () => {

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

        expect( receivedEvents1.length).toBe(1, "should only catch the second event");
        expect( receivedEvents1[0] ).toBe("2 - Hello world!");

        expect( receivedEvents2.length).toBe(2);
        expect( receivedEvents2[0]).toBe("2 - Hello world!");
        expect( receivedEvents2[1]).toBe("3 - Hello world!");
    });

});






