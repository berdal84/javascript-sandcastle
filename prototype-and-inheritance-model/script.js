

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



/**
 * Define a Dog class, using ECMAScript 2015 syntax.
 * 
 * from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Details_of_the_Object_Model
 * JavaScript classes, introduced in ECMAScript 2015, are primarily
 * syntactical sugar over JavaScript's existing prototype-based inheritance.
 * The class syntax does not introduce a new object-oriented inheritance
 * model to JavaScript.
 */
class Dog
{
    constructor(_name, _age)
    {        
        this.name = _name;
        this.age  = _age;
    }

    sayHello()
    {
        console.log(`- ${this.name}: Hello, I am a Dog, my name is ${this.name} and I am ${this.age}yo.`);
    }
}

/**
 * Extends the class Dog using ES2015 syntax.
 */
class SpecialDog extends Dog
{
    constructor(_name, _age, _speciality)
    {
        super(_name, _age);
        this.speciality = _speciality;               
    }

    sayHello()
    {
        // this is syntaxic sugar to call the prototype of Dog.
        super.sayHello();

        console.log(`- ${this.name}: Oh, and I was about to forget, I have the speciality "${this.speciality}".`);
    }
}
 
const dog = new Dog("Fluffy", 10);
dog.sayHello();

const dog_special = new SpecialDog("Dogue", 10, "Sleeper");
dog_special.sayHello();

console.log("Script finished.");