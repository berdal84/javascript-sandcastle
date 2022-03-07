

/**
 * Get elements by id
 */
{
    console.log("Exercise #1 - Get elements by id");

    var title = document.getElementById("title");
    var text  = document.getElementById("text");

    console.log(`Title is "${title.textContent}"` );
    console.log(`Text is "${text.textContent}"` );
}

/**
 * Get elements by selector
 */
 {
    console.log("Exercise #2 - Get elements by selector");

    var title = document.querySelector("#title");
    var text  = document.querySelector("#text");

    console.log(`Title is "${title.textContent}"` );
    console.log(`Text is "${text.textContent}"` );
}

/**
 * Get elements by selector
 */
 {
    console.log("Exercise #3 - Get elements by tag");

    var html  = document.getRootNode();
    var body  = html.getElementsByTagName("body")[0];
    var title = body.getElementsByTagName("h1")[0];
    var text  = body.getElementsByTagName("p")[0];

    console.log(`Title is "${title.textContent}"` );
    console.log(`Text is "${text.textContent}"` );
}