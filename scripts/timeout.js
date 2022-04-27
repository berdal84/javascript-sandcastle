

const f = () => {
    console.log("Hello world!")
}

// 1 - setTimeout and clearTimeout

{
    const id = setTimeout( f, 500 );
    clearTimeout(id);                            // cleared before timeout

    const id2 = setTimeout( f, 500 );
    setTimeout( ()=>{ clearTimeout(id2) }, 499); // cleared 1ms before

    const id3 = setTimeout( f, 500 );
    setTimeout( ()=>{ clearTimeout(id3) }, 500); // too late to clear !
}

// 2 - override setTimeout to be able to clearTimeOutAll()

setTimeout( () => {
    const _setTimeout   = setTimeout;   // backup original
    const _clearTimeout = clearTimeout; // backup original

    const ids = new Set();

    // override with our custom
    setTimeout = ( func, delay ) => {
        const id = _setTimeout(func, delay);
        ids.add(id);
        console.log("setTimeout(%i)", id)
        return id;     
    }

    // override with our custom
    clearTimeout = ( id ) => {
        console.log("clearTimeout(%i)", id)
        _clearTimeout(id);     
    }

    // clear can now be done globally !
    const clearTimeOutAll = () => {
        console.log("clearTimeOutAll() ...")
        ids.forEach( clearTimeout );
        ids.clear()
    }


    setTimeout( f, 100 );
    setTimeout( f, 150 );
    setTimeout( f, 200 );
    setTimeout( f, 300 );

    clearTimeOutAll();
}, 600);