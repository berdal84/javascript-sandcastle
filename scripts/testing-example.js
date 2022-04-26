
import { it, expect } from './testing.js'

it( "suite", "failing_test", () => {
    expect( 10 == 10);
    expect( 1 == -1, "negative is also positive");
})

it( "suite", "test", () => {
    expect( 10 == 10);
    expect( 1 == 1, "1 == 1");
})