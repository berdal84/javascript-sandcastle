
import { it, expect, describe } from './testing.js'

function add(a, b) {
    return a + b;
}

describe( "failure for sure", () => {

    it( "should fail", () => {
        expect( 10 == 10);
        expect( 1 == -1, "negative is also positive");
    })
});

describe( "add() function", () => {

    it( "should add", () => {
        expect( add(10,10) == 20);
        expect( add(10,50) == 60);
    })

    it( "should add negative", () => {
        expect( add(-10,10) == 0);
        expect( add(-10,-5) == -15);
    })

});