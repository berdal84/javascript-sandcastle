

/**
 * Get elements by id
 */
{
    console.log("Exercise #1 - Get elements by id");

    const title = document.getElementById("title");
    const text  = document.getElementById("text");

    console.log(title !== null);
    console.log(text !== null);
}

/**
 * Get elements by selector
 */
 {
    console.log("Exercise #2 - Get elements by selector");

    const title = document.querySelector("#title");
    const text  = document.querySelector("#text");

    console.log(title !== null);
    console.log(text !== null);
}

/**
 * Get elements by selector
 */
 {
    console.log("Exercise #3 - Get elements by tag");

    const html  = document.getRootNode();
    const body  = html.getElementsByTagName("body")[0];
    const title = body.getElementsByTagName("h1")[0];
    const text  = body.getElementsByTagName("p")[0];

    console.log(title !== null);
    console.log(text !== null);
}

/**
 * Get elements by class
 */
 {
    console.log("Exercise #4 - Get elements by tag");

    const title = document.body.getElementsByClassName("title")[0];
    const text  = document.body.getElementsByClassName("paragraph")[0];

    console.log(title !== null);
    console.log(text !== null);
}

/**
 * Change paragraph by text content
 */
 {
    console.log("Exercise #4 - Change paragraph by text content");

    const title = document.getElementById("title");
    const oldContent = title.textContent;
    console.log(title.textContent === oldContent);
    title.textContent += " (title changed)";
    console.log(title.textContent !== oldContent);
}

/**
 * Change paragraph by text innerHTML
 */
 {
    console.log("Exercise #5 - Change paragraph by text innerHTML");

    const title = document.getElementById("title");
    const oldContent = title.textContent;
    console.log(title.textContent === oldContent);
    title.innerHTML += " <i>(title changed)</i>";
    console.log(title.textContent !== oldContent);
}