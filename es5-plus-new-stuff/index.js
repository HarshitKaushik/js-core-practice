// 18 New features in ES5+ onwards ES2015, ES2016 and ES2017

const chalk = require('chalk');

// 1. Array.prototype.includes
console.log(chalk.green('\n1. Array.prototype.includes\n'));

// includes is a simple instance method on the Array and helps 
// to easily find if an item is in the Array (including NaN unlike indexOf)

const numberArray = [1, 2, 3, 4, 5, NaN];

// Instead of
if (numberArray.indexOf(3) >= 0) {
  console.log(true);
}

// Use
if (numberArray.includes(3)) {
  console.log(true);
}

console.log(numberArray.includes(NaN)); 
// true

console.log(numberArray.indexOf(NaN));
// -1 (indexOf doesn't work for NaN)

// 2. Exponentiation infix operator
console.log(chalk.green('\n2. Exponentiation infix operator\n'));

// Math operations like addition and subtraction have infix operators like + and -  respectively.
// Similar to them, the ** infix operator is commonly used for exponent operation.
// In ECMAScript 2016, the ** was introduced instead of Math.pow

// Instead of
console.log(Math.pow(7,2)); // 49

// Use
console.log(7**2);

// 3. Object.values()
console.log(chalk.green('\n3. Object.values()\n'));

// Object.values() is a new function that’s similar to Object.keys()
// but returns all the values of the Object’s own properties
// excluding any value(s) in the prototypical chain.

const cars = {
  BMW: 3,
  Tesla: 2,
  Toyota: 1
};

// ES2015
// Instead of
const values = Object.keys(cars).map(key => cars[key]);
console.log(values); 
// [3,2,1]

// Use
const vals = Object.values(cars);
console.log();
// [3,2,1]

// 4. Object.entries()
console.log(chalk.green('\n4. Object.entries()\n'));

// Object.entries() is related to Object.keys, but instead of
// returning just keys, it returns both keys and values in the
// array fashion. This makes it very simple to do things 
// like using objects in loops or converting objects into Maps.

// Example 1

const againCars = {
  BMW: 3,
  Tesla: 2,
  Toyota: 1
};

// ES 5.1
// Instead of extracting keys and then again looping
Object.keys(againCars).forEach(function(key) {
  console.log('key: ' + key + ' value: ' + againCars[key]);
});

console.log('\n');

// ES8
// Use Object.entries
for (let [key, value] of Object.entries(againCars)) {
  console.log(`key: ${key} value: ${value}`);
}

// Example 2

// ES2015
// Instead of
// Get object keys and then add each item to Map in a loop
const map1 = new Map();
Object.keys(againCars).forEach(key => {
  map1.set(key, againCars[key]);
});
console.log(map1);
// Map { 'BMW' => 3, 'Tesla' => 2, 'Toyota' => 1 }

// ES2017 and onwards
// Use
const map2 = new Map(Object.entries(againCars));
console.log(map2);
// Map { 'BMW' => 3, 'Tesla' => 2, 'Toyota' => 1 }

// 5. String padding
console.log(chalk.green('\n4. String padding\n'));

// Two instance methods were added to String — String.prototype.padStart 
// and String.prototype.padEnd — that allow 
// appending / prepending either an empty string or some other string to 
// the start or the end of the original string.

console.log('5'.padStart(10));
// '         5'
console.log('5'.padStart(10, '=*'));
// '=*=*=*=*=5'

console.log('5'.padEnd(10));
// '5         '
console.log('5'.padEnd(10, '=*'));
// '5=*=*=*=*='

// This comes in handy when we want to align things in scenarios like pretty print display or terminal print.

// Example

// In the below example, we have a list of numbers of varying lengths.
// We want to prepend “0” so that all the items have the same length of 10 digits 
// for display purposes. We can use padStart(10, '0') to easily achieve this.

// ES8
// If you have a list of items of varying lengths and want to format them
// for display purposes. You can use padStart()

const formatted = [0, 2, 1, 123, 1234, 12345].map(num => {
  return num.toString().padStart(10, '0'); // Adds padding with '0'
});

console.log(formatted);

// Output:

// ['0000000000',
//   '0000000002',
//   '0000000001',
//   '0000000123',
//   '0000001234',
//   '0000012345']

// padStart and padEnd on Emojis and other double - byte chars
// Emojis and other double - byte chars are represented using multiple bytes of unicode. So padStart and padEnd might not work as expected!


// 6. Object.getOwnPropertyDescriptors()
console.log(chalk.green('\n6. Object.getOwnPropertyDescriptors()\n'));

// This method returns all the details (including getter get and setter set methods)
// for all the properties of a given object. The main motivation to add this is to allow 
// shallow copying / cloning an object into another object that also copies getter and setter functions
// as opposed to Object.assign

// Object.assign shallow copies all the details except getter and setter functions of the original source object.

// BEFORE
// Using Object.assign()

const newCar = {
  name: 'BMW',
  price: 1000000,
  set discount(x) {
    this.d = x;
  },
  get discount() {
    return this.d;
  }
};

// Print details of newCar object's discount property
console.log(Object.getOwnPropertyDescriptor(newCar, 'discount'));
// Prints:
// {
//   get: [Function: get discount],
//   set: [Function: set discount],
//   enumerable: true,
//   configurable: true
// }

// Copy newCar's properties to electricCar using Object.assign()
const electricCar = Object.assign({}, newCar);

// Print details of the electricCar object's discount property
console.log(Object.getOwnPropertyDescriptor(electricCar, 'discount'));
// prints
// {
//   value: undefined,
//   writable: true,
//   enumerable: true,
//   configurable: true
// }

// Notice that the getters and setters are missing in electricCar object
// for 'discount' property

// AFTER

// Copy newCar's properties to electricCar2 using Object.defineProperties
// and extract Car's properties using Object.getOwnPropertyDescriptors()
const electricCar2 = Object.defineProperties({}, Object.getOwnPropertyDescriptors(newCar));

// Print details of electricCar2 object's 'discount' property
console.log(Object.getOwnPropertyDescriptor(electricCar2, 'discount'));
// prints
// {
//   get: [Function: get discount],
//   set: [Function: set discount],
//   enumerable: true,
//   configurable: true
// }

// Notice that getters and setters are present in the electricCar2 object for 'discount' property