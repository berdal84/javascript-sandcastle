
let DoubleCheck = function (){
    this.results = []
    this.last = () => {
        return this.results[ this.results.length - 1];
    }
    this.begin = ( test_suite, test_name) => {
        let last_result = {
            name: test_name,
            suite: test_suite,
            failures: [],
            count: 0
        };
        this.results.push( last_result );
        return last_result;
    }
}

let dbcheck = new DoubleCheck();

let expect = function ( result, reason )
{
    if( !result ) {
        dbcheck.last().failures.push({ result, reason: reason ? reason : "no reason" });
    }
}

let it = function ( test_suite, test_name, tests )
{
    dbcheck.begin(test_suite, test_name);

    tests();

    console.log(`${test_suite} | ${test_name}:`);
    let failed = dbcheck.last().failures.length;
    if( failed === 0) {
        console.log("  Test passed!");
    } else {
        console.error(`  ${failed} test failed!`);
        dbcheck.last().failures.forEach( ({ result, reason }) => {
            console.error(`  Expecting: ${result} to be true. ${reason}`)
        })
    }
}

export { it, expect, dbcheck };