
let Testing = function (){
    this.suite;
    this.suiteRes = new Map();
    this.test;

    this.beginSuite = (_name) => {
        this.suite = {
            name: _name,
            failures: [],
            success: []
        };
        console.log(`# Suite "${_name}": testing ...`);

        this.suiteRes.set( _name, this.suite );
    }

    this.endSuite = () => {
        let failed  = this.suite.failures.length;
        let success = this.suite.success.length;
        let total = failed + success;

        let result;
        if( failed !== 0) {
            result = `${failed}/${total} failed!`;
        } else {
            result = `${success+failed}/${total} OK`;
        }

        console.log(`# Suite "${this.suite.name}": results >>>-------------------------- ${result}`);
        
        this.suite.failures.forEach( each => {
            console.log(`     o "${each.name}" failed !`);
        })
        console.log("\n")
    }

    this.beginTest = ( _name ) => {
        this.test = {
            name: _name,
            failures: [],
            success: []
        };
        console.log(`-- Test: ${this.test.name}`);
    }

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

let expect = ( testResult, testReason ) => {
    if( !testResult ) {
        let failure = {
            result: testResult,
            reason: testReason ? testReason : "no reason"
        }
        testing.test.failures.push( failure );
    }
}

let describe = ( suite_name, tests ) => {
    testing = new Testing();
    testing.beginSuite(suite_name);
    tests();
    testing.endSuite();
}

let it = ( test_name, test ) => {
    testing.beginTest(test_name);
    test();
    testing.endTest();
}

export { it, expect, describe };