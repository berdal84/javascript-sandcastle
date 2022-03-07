

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



/**
 * Inheritance using legacy syntax
 */
Shape = function(_name)
{
    this.name = _name;
}

Volume = function()
{
    /* in cm3 */
    this.volume = 0;

    this.volume_to_liter = function()
    {
        return this.volume / 1000;
    }
}

Surface = function()
{
    /* in cm3 */
    this.surface = parseFloat(0);
}

/**
 * We compose Cube with Volume and Shape.
 */

console.log("Inheritance using legacy syntax");
Cube = function(_name, _size)
{
    /* extends */
    Object.assign( this, new Shape(_name) );
    Object.assign( this, new Volume() )
    Object.assign( this, new Surface() )

    /** define a property with getter/setter */
    Object.defineProperty( this, 'size',{
        get: function() {
            return this._size;
        },
        set: function(_size)
        {
            this._size = parseFloat(_size);
            this.volume  = Math.pow(this._size, 3);
            this.surface = Math.pow(this._size, 2) * 6;
        }
    });
   
    /* in cm */
    this._size = 0;
    this.size = _size;   
}

console.log("Creating a cube ...");
const cube = new Cube("Litre", 10);

console.log("Check ...");
console.log( cube.name === "Litre");
console.log( cube.size === 10);
console.log( cube.volume === 1000);
console.log( cube.surface === 10*10*6);
console.log( cube.volume_to_liter() === 1);

console.log("Change size ...");
cube.size = 2;

console.log("Check again...");
console.log( cube.size === 2);
console.log( cube.volume === 8);
console.log( cube.surface === 2*2*6);
console.log( cube.volume_to_liter() === 8/1000);

console.log("Script finished.");