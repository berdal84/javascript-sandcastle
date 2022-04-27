
import { it, expect, describe } from './testing.js'

// fake lib to test
const LyLib = {
    add: (a, b) => { return a + b; }
}

describe( "failure for sure", () => {

    it( "should fail", () => {
        expect( 10 == 10).toBeTruthy("ten is alwas ten");
        expect( 1 == -1).toBeTruthy("negative is also positive");
    })
});

describe( "LyLib.add() function", () => {

    it( "should add", () => {
        expect( LyLib.add(10,10) ).toBe(20, "ten plus ten is twenty.");
        expect( LyLib.add(10,50) ).toBe(60, "ten plus fifty is sixty.");
    })

    it( "should add negative", () => {
        expect( LyLib.add(-10,10)).toBe(0, "minus ten plus ten is zero");
        expect( LyLib.add(-10,-5)).toBe(-15, "minus ten plus minus five is minus fifteen");
    })

});