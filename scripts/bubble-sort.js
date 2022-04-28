import { describe, it, expect } from './testing.js'

function bubbleSort( array ) {

    console.assert( array instanceof Array);

    if( array.length <= 1) {
        return array;
    } else if( array.length == 2 ) {
        if( array[0] > array[1]) {
            return [ array[1], array[0] ]
        }
        return array;
    } else {
        // TODO
        return array;
    }
}


describe( "bubble sort",  ()  => {

    it( "Should sort empty array", ()=> {
        expect( bubbleSort([]) ).toBe([], "An empty table is returned as-is")
    })

    it( "Should sort one item", ()=> {
        expect( bubbleSort([15])).toBe([15], "A single item array must be returned as-is")
    })

    it( "Should sort two items", ()=> {
        expect( bubbleSort([19,0])).toBe( [0,19], "Should sort two items")
    })

    it( "Should sort many items", ()=> {
        expect( bubbleSort([9,0,10,15,-2,3,4])).toBe( [-2,0,3,4,9,10,15])
    })
});

