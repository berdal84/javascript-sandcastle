
let Testing = function (){

    this.suite = {};
    this.suiteRes = new Map();
    this.test;

    /**
     * Begin a new test suite.
     * endSuite() must be called after all suite tests.  
     * @param {string} _name suite name
     */
    this.beginSuite = (_name) => {
        this.suite = {
            name: _name,
            failures: [],
            success: []
        };
        console.log(`# Suite "${_name}": testing ...`);

        this.suiteRes.set( _name, this.suite );
    }

    /**
     * End the current suite and display results.
     * A suite begins by calling beginSuite("suite name")
     */
    this.endSuite = () => {
        const failed  = this.suite.failures.length;
        const success = this.suite.success.length;
        const total   = failed + success;

        const resultStr = failed === 0 ? `${total}/${total} OK` : `${failed}/${total} failed!`;

        console.log(`# Suite "${this.suite.name}": results >>>-------------------------- ${resultStr}`);        
        this.suite.failures.forEach( each => { console.log(`     o "${each.name}" failed !`) })
        console.log("\n")
    }

    /**
     * Begin a new test in current test suite.
     * A suite must exist, start a new suite with beginSuite("my suite")
     * @param {string} _name test name 
     */
    this.beginTest = ( _name ) => {
        this.test = {
            name: _name,
            failures: [],
            success: []
        };
        console.log(`-- Test: ${this.test.name}`);
    }

    /**
     * End the current test.
     * A test must be started, (@see {@link Testing.beginTest})
     */
    this.endTest = () => {
        

        let failed  = this.test.failures.length;
        let success = this.test.success.length;
        let total   = success + failed;

        if( failed === 0)
        {
            this.suite.success.push(this.test);
        }
        else
        {
            this.suite.failures.push(this.test)
            this.test.failures.forEach( ({ result, reason }) => {
                console.error(`     Expecting: ${result} to be true. ${reason}`)
            })
        }
    }
}

let testing;

/**
 * Declare a next expectation.
 * 
 * @param {any} expectation an expression evaluated as boolean 
 * @param {string} reason the reason why expectation must be true
 */
let expect = ( expectation, reason ) => {
    if( Boolean(expectation) ) {
        let failure = {
            result: expectation,
            reason: reason ? reason : "no reason"
        }
        testing.test.failures.push( failure );
    }
}

/**
 * Describe a test suite
 * @param {string} name the suite name
 * @param {function} tests a function containing a set of tests (@see {@link it()} )
 */
let describe = ( name, tests ) => {
    testing = new Testing();
    testing.beginSuite(name);
    tests();
    testing.endSuite();
}

/**
 * Describe a new test inside a test suite
 * @param {string} test_name 
 * @param {function} test a function containing a set of expectations (@see {@link expect()})
 */
let it = ( test_name, test ) => {
    testing.beginTest(test_name);
    test();
    testing.endTest();
}

export { it, expect, describe };