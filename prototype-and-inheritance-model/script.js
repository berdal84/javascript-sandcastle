

console.log("Starting script ...");

/**
 * define a Person
 */
function Person(_name, _age)
{
    console.log(`Create a new Person (name: "${_name}", age: ${_age}yo)`);
    this.name = _name;
    this.age  = _age;
}

/**
 * Modify its age
 */
const jon = new Person("Jon", 38);
old_age = jon.age;
jon.age++;
console.log(jon.age !== old_age);

/**
 * Add a new property size to the person prototype.
 * Set a size to Jon.
 */
console.log(jon.size === undefined);
Person.prototype.size = null;
console.log(jon.size !== undefined);
jon.size = 170;
console.log(jon.size === 170);

console.log("Script finished.");