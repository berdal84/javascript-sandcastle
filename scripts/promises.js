function Promise()
{
    this.resolve_cb = ()=>{};
    this.reject_cb  = ()=>{};

    this.then = function ( resolve, reject )
    {
        this.resolve_cb = resolve;
        this.reject_cb  = reject;
        return this;
    }

    this.resolve = function( val )
    {
        this.resolve_cb(val);
    }

    this.reject = function( val )
    {
        this.reject_cb(val);
    }
}

function Process(data)
{
    this.data       = data;
    this.promise    = new Promise();
    this.response   = null;
    this.fake_delay = 500;

    this.process = () =>
    {
        if(  data == null )
        {
            this.promise.reject("No data to process! data is null!");
            return;
        }
        this.result = `I processed ${data}`;
        this.promise.resolve(this.result);
    }
        
    this.then = ( resolve, reject ) =>
    {
        this.promise.then( resolve, reject );
    }

    setTimeout(this.process, this.fake_delay);
}

(function main() {

    console.log('############################################################################')
    let process1 = new Process();
    let process2 = new Process("coucou");

    process1.then( (message)=> {
        console.log("process1 resolved: ", message)
    }, (message)=> {
        console.log("process1 rejected: ", message)
    });    

    process2.then( (message)=> {
        console.log("process2 resolved: ", message)
    }, (message)=> {
        console.log("process2 rejected: ", message)
    });    
 
}());