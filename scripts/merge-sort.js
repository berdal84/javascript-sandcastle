import { describe, it, expect } from './testing.js'

/**
 * Merge sorted array
 * @param {Array<number>} _arr0 sorted array (won't be modified)
 * @param {Array<number>} _arr1 sorted array (won't be modified)
 * @returns {Array<number>} a sorted merge array
 */
function merge(_arr0, _arr1) {
    // arr0 and arr1 are sorted

    console.assert( _arr0 instanceof Array);
    console.assert( _arr1 instanceof Array);
    
    /**
     * - set two cursors on first item for both arrays.
     */
    let cursor0 = 0;
    let cursor1 = 0;
    const sorted = [];
    /*
    * Until both array items have been sorted (cursor reach the end), we:
    * - get the smaller pointed number from one or another array.
    * - increment the pointer from that array
    * - in case a pointer reach the end, we get the last item from the other
    */
    while( cursor0 < _arr0.length || cursor1 < _arr1.length ) {
        
        if ( cursor1 == _arr1.length) {
            sorted.push(_arr0[cursor0]);
            cursor0++;
        } else if ( cursor0 == _arr0.length) {
            sorted.push(_arr1[cursor1]);
            cursor1++;
        } else if( _arr0[cursor0] < _arr1[cursor1]) {
            sorted.push(_arr0[cursor0]);
            cursor0++;
        } else {
            sorted.push(_arr1[cursor1]);
            cursor1++;
        }
    }

    console.assert( sorted.length == _arr0.length + _arr1.length )

    return sorted;
};

/**
 * Sort an array using bubble sort technique.
 * @param {Array<number>} _array the array to sort (array won't be modified), can be empty but must be defined. 
 * @returns {Array<number>} a sorted array
 */
function mergeSort( _array ) {

    console.assert( _array !== undefined);
    console.assert( _array instanceof Array);

    if( _array.length <= 1) {
        return _array;
    } else if( _array.length == 2 ) {
        if( _array[0] > _array[1]) {
            return _array.reverse();
        }
        return _array;
    } else {
        
        // split array in two
        const middleIdx = Math.round(_array.length / 2);
        const arrcpy    = [..._array];    
        const left      = arrcpy.splice(0, middleIdx );
        const right     = arrcpy;
        // sort separately an merge
        return merge( mergeSort(left), mergeSort(right));
    }
}


describe( "Merge sort (divide and conquer)",  ()  => {

    it( "Should sort empty array", ()=> {
        expect( mergeSort([]) ).toBe([], "An empty table is returned as-is")
    })

    it( "Should sort one item", ()=> {
        expect( mergeSort([15])).toBe([15], "A single item array must be returned as-is")
    })

    it( "Should sort two items", ()=> {
        expect( mergeSort([19,0])).toBe( [0,19], "Should sort two items")
    })

    it( "Should sort many items", ()=> {
        expect( mergeSort([9,0,10,15,-2,3,4])).toBe( [-2,0,3,4,9,10,15], "7 length array should be sorted")
    })
});

