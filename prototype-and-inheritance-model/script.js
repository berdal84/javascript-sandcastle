

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

const john = new Person("Jon", 38);
old_age = john.age;
john.age++;
console.log(john.age !== old_age);

console.log("Script finished.");