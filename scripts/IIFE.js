/**
 * IIFE : Immediately Invoked Function Expression
 * https://developer.mozilla.org/en-US/docs/Glossary/IIFE
 */

// exercise 01
(function main(){
    console.log(`main(): I am invoked when defined!`)
})()

// exercise 02
const main2 = (function(){
    console.log(`main2: I am invoked when instantiated!`)
})();

main2;