

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

/**
 * define a PersonWithFunction
 */
function PersonWithFunction(_name, _age)
{
    console.log(`Create a new Person (name: "${_name}", age: ${_age}yo)`);
    this.name = _name;
    this.age  = _age;

    /**
     * Here we declare 2 functions or "methods" to the prototype.
     */
    this.getOlder = function(_years)
    {
        console.log(`"${_name}" is getting older ...`);
        this.age += _years;
    };

    this.getYounger = function (_years)
    {
        console.log(`"${_name}" is getting younger ...`);
        this.age -= _years;
    };
}

const gilles = new PersonWithFunction("Gilles", 38);
console.log(gilles.age === 38);
gilles.getYounger(1);
console.log(gilles.age === 37);
gilles.getOlder(2);
console.log(gilles.age === 39);

console.log("Script finished.");