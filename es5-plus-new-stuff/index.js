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

// 7. Add trailing commas in the function parameters
console.log(chalk.green('\n7. Add trailing commas in the function parameters\n'));

// This is a minor update that allows us to have trailing commas
// after the last function parameter.

// Trailing commas in a function call will not throw an error

function add(a,b,) {
  return (a + b);
}

const c = add(10,20,);
console.log('c: ' + c);
// Prints
// c: 30
// Trailing commas in both the function parameters and function invocation
// do not throw an error.

// 8. Aysnc/Await
console.log(chalk.green('\n8. Aysnc/Await\n'));

// This, by far, is the most important and most useful feature 
// if you ask me. Async functions allows us to not deal with 
// callback hell and make the entire code look simple.

// The async keyword tells the JavaScript compiler to treat the function differently. The compiler pauses
// whenever it reaches the await keyword within that function.
// It assumes that the expression after await returns a promise and 
// waits until the promise is resolved or rejected before moving further.

// In the example below, the getAmount function is calling two asynchronous functions 
// getUser and getBankBalance. We can do this in promise, but using async await is more elegant and simple.

function getUser(userId) {
  return new Promise(resolve => {
      setTimeout(() => {
        resolve('john');
      }, 1000);
  });
}

function getBankBalance(user) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (user === 'john') {
        resolve('$1,000');
      } else {
        reject('Unknown user');
      }
    }, 1000);
  });
}

// Instead of
// ES2015 Promise
function getAmount1(userId) {
  getUser(userId)
  .then(getBankBalance)
  .then(amount => {
    console.log(amount);
  });
}

// Use ES2017 async await
async function getAmount2(userId) {
  var user = await getUser(userId);
  var amount = await getBankBalance(user);
  console.log(amount);
}

getAmount1(1); 
// $ 1,000

getAmount2(2);
// $ 1,000

// Async functions themselves return a Promise
// If you are waiting for the result from an async function, you need
// to use Promise’s then syntax to capture its result.

// In the following example, we want to log the result using console.log
// but not within the doubleAndAdd. So we want to wait and 
// use then syntax to pass the result to console.log

// Async functions themselves return a Promise object

async function doubleAndAdd(a,b) {
  a = await doubleAfter1Sec(a);
  b = await doubleAfter1Sec(b);

  return (a + b);
}

// Usage
doubleAndAdd(1,2)
  .then(c => console.log(c));

function doubleAfter1Sec(param) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(param * 2);
    }, 1000);
  });
}

// prints 
// 6

// Calling async / await in parallel

// In the previous example we are calling await twice, but each time we are waiting for one second(total 2 seconds).
// Instead we can parallelize it since a and b are not dependent on each other using Promise.all

// Async functions themselves return a Promise
async function doubleAndAdd2(a, b) {
  // Notice that I'm using Promise.all and array destructuring
  [a, b] = await Promise.all([doubleAfter1Sec(a), doubleAfter1Sec(b)]);
  return a + b;
}

// Usage

doubleAndAdd2(1,2)
  .then(c => console.log(c));
// Prints
// 6 (but takes one second due to parallelisation)

// Error handling async/await functions

// There are various ways to handle errors when using async await

// Option 1 — Use try catch within the function

async function doubleAndAdd3(a, b) {
  try {
    a = await doubleAfter1Sec2(a);
    b = await doubleAfter1Sec2(b);
  } catch (err) {
    return NaN; 
    // return something
  }
  return (a + b); 
}

// Usage
doubleAndAdd3('one', 2).then(console.log);
doubleAndAdd3(1,3).then(console.log);

function doubleAfter1Sec2(param) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let val = 2 * param;
      isNaN(val) ? reject(NaN) : resolve(val);
    }, 1000);
  });
}

// prints
// NaN
// 8

// Option 2 — Catch every await expression
// Since every await expression returns a Promise, you can catch
// errors on each line as shown below.

//Option 2 - *Catch* errors on  every await line
//as each await expression is a Promise in itself
async function doubleAndAdd4(a, b) {
  a = await doubleAfter1Sec3(a).catch(e => console.log('"a" is NaN')); // 👈
  b = await doubleAfter1Sec3(b).catch(e => console.log('"b" is NaN')); // 👈
  if (!a || !b) {
    return NaN;
  }
  return a + b;
}

// 🚀 Usage:
doubleAndAdd4('one', 2).then(console.log); 
// NaN  and logs:  "a" is NaN
doubleAndAdd4(1, 2).then(console.log); 
// 6

function doubleAfter1Sec3(param) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      let val = param * 2;
      isNaN(val) ? reject(NaN) : resolve(val);
    }, 1000);
  });
}

// Option 3 — Catch the entire async - await function
// Dont do anything but handle outside the function
// since async / await returns a promise, we can catch the whole function's error
async function doubleAndAdd5(a, b) {
  a = await doubleAfter1Sec4(a);
  b = await doubleAfter1Sec4(b);
  return a + b;
}

// 🚀 Usage:
doubleAndAdd5('one', 2)
  .then(console.log)
  .catch(console.log);  // 👈👈🏼<------- use "catch"

function doubleAfter1Sec4(param) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      let val = param * 2;
      isNaN(val) ? reject(NaN) : resolve(val);
    }, 1000);
  });
}

// 9. Shared memory and atomics
console.log(chalk.green('\n9. Shared memory and atomics\n'));

// This is a huge, pretty advanced feature and is a core enhancement to JS engines.

// The main idea is to bring some sort of multi - threading feature to JavaScript so that JS developers 
// can write high - performance, concurrent programs in the future by allowing to manage memory by themselves
// instead of letting JS engine manage memory.

// This is done by a new type of a global object called SharedArrayBuffer that essentially stores data in a shared memory space. 
// So this data can be shared between the main JS thread and web - worker threads.

// Until now, if we want to share data between the main JS thread and web - workers, we had to copy the data
// and send it to the other thread using postMessage. Not anymore!

// You simply use SharedArrayBuffer and the data is instantly accessible by both the main thread and multiple
// web - worker threads.

// But sharing memory between threads can cause race conditions. To help avoid race conditions, 
// the “Atomics” global object is introduced. Atomics provides various methods to lock the shared memory when a
// thread is using its data. It also provides methods to update such data in that shared memory safely.

// The recommendation is to use this feature via some library, but right now there are no libraries built 
// on top of this feature.


// 10. Tagged Template literal restriction removed
console.log(chalk.green('\n10. Tagged Template literal restriction removed\n'));

// In ES2015+, there is a feature called a tagged template literal that allows developers to customize how strings are interpolated.
// For example, in the standard way strings are interpolated like below.

// Standard string literal interpolation
const firstName = 'Harshit';
const fullName = `Hello! ${firstName} Kaushik`;

console.log('fullName: ' + fullName);
// Hello! Harshit Kaushik

