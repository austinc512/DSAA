// We'll be using ES 2015 class implementations to create data structures.

/*
JavaScript doesn’t really have classes. 
“JavaScript classes… are primary syntactical sugar over JavaScript’s 
existing prototype-based inheritance. The class syntax does not 
introduce a new object-oriented inheritance model to JavaScript.” 
- MDN
*/

class Musician {
  constructor(firstName, lastName, axe) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.instrument = axe;
  }
}

const jim = new Musician('Jimi', 'Hendrix', 'Strat');
/*
console.log(jim);
When you define an instance field inside of the constructor, 
this will become a field of the class instance.
Musician {
  firstName: 'Jimi',
  lastName: 'Hendrix',
  instrument: 'Strat'
}
*/

/*
In JavaScript classes, you do not need to explicitly define properties 
before using them in the constructor. When you assign a value to a 
property within the constructor, it automatically becomes a property 
of the instance.
*/
class Person {
  // Instance field
  age;

  // Static field
  static species = 'Homo sapiens';

  constructor(name, age) {
    this.name = name; // Another instance field
    this.age = age;
  }

  // Getter for the 'info' property
  get info() {
    return `${this.name} is ${this.age} years old.`;
  }

  // Setter for the 'age' property
  set age(value) {
    if (value < 0) {
      console.error('Age cannot be negative.');
    } else {
      this.age = value;
    }
  }

  // A regular method, also a property of the class
  // Also called instance method
  greet() {
    return `Hello, my name is ${this.name}.`;
  }

  // Static method
  static describeSpecies() {
    return `Humans are classified as ${this.species}.`;
  }

  // Instance method
}

// Using the class
const person1 = new Person('Terry', 30);

console.log(person1.info); // Using getter
// ^^ notice this is accessed as a property, not as a method.
// 'Terry is 30 years old.'
person1.age = 35; // Using setter
console.log(person1.greet()); // Regular (or Instance) method

console.log(Person.species); // Accessing static field
// Homo sapiens
console.log(Person.describeSpecies()); // Static method
// Humans are classified as Homo sapiens.

/*
Question:
Do static methods only use static fields, or can the value from the instance 
of the object be used in a static method?

GPT:

In JavaScript, static methods are typically designed to work with static fields 
or perform operations that are independent of instance-specific data. However, 
it is technically possible for a static method to access instance properties, 
but it requires an instance of the class to be explicitly passed to it. A static 
method cannot directly access instance properties on its own because it does not 
have a reference to this in the context of an instance.
*/
class MyClass {
  static staticField = 'static value';

  constructor(instanceField) {
    this.instanceField = instanceField;
  }

  static staticMethod(instance = null) {
    if (instance) {
      // Accessing instance property
      console.log(`Instance field: ${instance.instanceField}`);
    }
    // Accessing static field
    console.log(`Static field: ${this.staticField}`);
  }
}

const myInstance = new MyClass('instance value');

// Calling static method with an instance
MyClass.staticMethod(myInstance); // Outputs both instance and static field values

// Calling static method without an instance
MyClass.staticMethod(); // Outputs only the static field value

/*
“The static keyword defines a static method for a class. Static methods are called 
without instantiating their class and cannot be called through a class instance. 
Static methods are often used to create utility functions for an application.”
- MDN

So, in other words, static methods are meant to be called from the class, not
from the instance of the class. 

For the purposes of this course, we will be using the constructor and instance methods
quite a bit, but we will almost never be using static methods.

*/

class DataStructure {
  constructor() {
    // what default properties should it have?
  }

  someInstanceMethod() {
    // what should each object created from this class be able to do?
  }
}
