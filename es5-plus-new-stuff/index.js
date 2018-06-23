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

// In the tagged literal, you can write a function to receive the hardcoded parts of the string literal, for example[‘Hello ‘, ‘!’ ],
// and the replacement variables, for example, ['Raja'], as parameters into a custom function (for example greet), and return whatever 
// you want from that custom function.

// The below example shows that our custom “Tag” function greet appends time of the day like “Good Morning!” “Good afternoon” 
// and so on depending on the time of the day to the string literal and returns a custom string.

//A "Tag" function returns a custom string literal.
//In this example, greet calls timeGreet() to append Good //Morning/Afternoon/Evening depending on the time of the day.

function greet(hardCodedPartsArray, ...replacementPartsArray) {
  console.log(hardCodedPartsArray); 
  console.log(replacementPartsArray); 
  let str = '';
  hardCodedPartsArray.forEach((string, i) => {
    if (i < replacementPartsArray.length) {
      str += `${string} ${replacementPartsArray[i] || ''}`;
    } else {
      str += `${string} ${timeGreet()}`; //<-- append Good morning/afternoon/evening here
    }
  });
  return str;
}
//🚀Usage:
const firstNameObj = 'Raja';
const greetings = greet`Hello ${firstNameObj}!`;  //👈🏼<-- Tagged literal
console.log(greetings); //'Hello  Raja! Good Morning!' 🔥
function timeGreet() {
  const hr = new Date().getHours();
  return hr < 12
    ? 'Good Morning!'
    : hr < 18 ? 'Good Afternoon!' : 'Good Evening!';
}

// ⚠️The problem with Tagged String literal

// The problem is that ES2015 and ES2016 specs doesn’t allow using escape characters like “\u” (unicode), “\x”(hexadecimal) 
// unless they look exactly like`\u00A9` or \u{ 2F804 } or \xA9.

// So if you have a Tagged function that internally uses some other domain’s rules (like Terminal’s rules),
// that may need to use \ubla123abla that doesn’t look like \u0049 or \u{ @F804}, then you would get a syntax error.

// In ES2018, the rules are relaxed to allow such seemingly invalid escape characters as long as the Tagged function returns the values in an object with a “cooked” property (where invalid characters are “undefined”), and then a “raw” property (with whatever you want).

// function myTagFunc(str) {
//   return { "cooked": "undefined", "raw": str.raw[0] }
// }

// var str = myTagFunc`hi \ubla123abla`; //call myTagFunc

// str // { cooked: "undefined", raw: "hi \\unicode" }

// 11. “dotall” flag for Regular expression
console.log(chalk.green('\n11. “dotall” flag for Regular expression\n'));

// Currently in RegEx, although the dot(“.”) is supposed to match a single character, it doesn’t match new line characters like \n \r \f etc.

// Before
console.log('/first.second/.test(\'first\nsecond\')' + /first.second/.test('first\nsecond')); //false
// PRINTS
// /first.second/.test('first
// second')false

// This enhancement makes it possible for the dot operator to match any single character. In order to ensure this doesn’t break anything,
//  we need to use \s flag when we create the RegEx for this to work.

//ECMAScript 2018
console.log('There inside: ' + /first.second/s.test('first\nsecond'));  //true   Notice: /s

// 12. RegExp Named Group Captures 🔥
console.log(chalk.green('\n12. RegExp Named Group Captures 🔥\n'));

// This enhancement brings a useful RegExp feature from other languages like Python, Java and so on called “Named Groups.” 
// This feature allows developers writing RegExp to provide names (identifiers) in the format(?<name>...) for different parts of the group in the RegExp. 
// They can then use that name to grab whichever group they need with ease.

// 12.1 Basic Named group example

// BEFORE
let regex1 = /(\d{4})-(\d{2})-(\d{2})/;
let result1 = regex1.exec('2015-01-02');
console.log(result1);
// ['2015-01-02', '2015', '01', '02', index: 0, input: '2015-01-02']

// AFTER

// let regex2 = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
// let result2 = regex2.exec('2015-01-02');
// console.log(result2);
// Does not work in Node version v9.3.0
// Prints
// ['2015-01-02', '2015', '01', '02', index:0, input '2015-01-02',
// groups: {year: '2015', month: '01', day: '02' }
// ]

// Say you want to know the year, you can do
// console.log(result2.groups.year);

// Reference link: https://github.com/tc39/proposal-regexp-named-groups

// 12.2 Using Named groups inside regex itself

// We can use the \k < group name > format to back reference the group within the regex itself.The following example shows how it works.

// let sameWords = /(?<fruit>apple|orange)==\k<fruit>/u;

// sameWords.test('apple==apple'); //true
// sameWords.test('orange==orange'); //true
// sameWords.test('apple==orange'); //true

// 12.3 Using named groups in String.prototype.replace

// The named group feature is now baked into String’s replace instance method. So we can easily swap words in the string.

// For example, change “firstName, lastName” to “lastName, firstName”.

// let regex3 = /(?<firstName>[A-Za-z]+)(?<lastName>[A-Za-z]+$)/u;

// 'Harshit Kaushik'.replace(regex3, '$<firstName>, <$lastName>');

// PRINTS
// "Kaushik, Harshit"

// 13. Rest properties for Objects
console.log(chalk.green('\n13. Rest properties for Objects 🔥\n'));

// Rest operator ... (three dots) allows us to extract Object properties that are not already extracted.

let {id, name, ...remaining} = {
  id: 699223,
  name: 'Harshit',
  lastName: 'Kaushik',
  company: 'Kwench', 
  city: 'Ghaziabad'
};

console.log(id);
console.log(name);
console.log(remaining);
// Prints output
// 699223
// Harshit
// { lastName: 'Kaushik', company: 'Kwench', city: 'Ghaziabad' }

// Even better, you can remove unwanted items! 🔥🔥

// Say you need to remove city from the object
let { city, ...cleanObj } = {
  id: 699223,
  name: 'Harshit',
  lastName: 'Kaushik',
  company: 'Kwench',
  city: 'Ghaziabad'
};

console.log(cleanObj);
// PRINTS
// {
//   id: 699223,
//   name: 'Harshit',
//   lastName: 'Kaushik',
//   company: 'Kwench'
// }

// 14. Spread properties for Objects
console.log(chalk.green('\n14. Spread properties for Objects 🔥\n'));

// Spread properties also look just like rest properties with three dots ...but the difference is that you use spread
//  to create(restructure) new objects.

// Tip: the spread operator is used in the right side of the equals sign. The rest are used in the left - side of the equals sign.

// Merge person and account object using spread operator
const person = {name: 'Harshit', lastName: 'Kaushik'};
const account = {balance: 100};
const personAndAccount = {...person, ...account};

console.log(personAndAccount);
// PRINTS
// { name: 'Harshit', lastName: 'Kaushik', balance: 100 }

// AWESOME!

// 15. Promise.prototype.finally()
console.log(chalk.green('\n15. Promise.prototype.finally()\n'));

// finally() is a new instance method that was added to Promise.
// The main idea is to allow running a callback after either resolve or reject to help clean things up.The finally callback is called without any value and is always executed no matter what.

// Let’s look at various cases.

// Resolve case

// let started = true;

// let myPromise = new Promise(function(resolve, reject) {
//   resolve('all good');
// }).then(val => {
//   console.log(val); // logs 'all good'
// }).catch(e => {
//   console.log(e); // Skipped
// }).finally(() => {
//   console.log('This function is never executed');
//   started = false; // cleanup
// });

// Stage 4 ES18 code. Not running in Node v9.3

// Further important new features coming to Javascript

// 1. .finally() handler in Promise
// 2. Aysnchronous code iteration by a new for-await-for loop

// For reference, read excellent article
// https://medium.freecodecamp.org/here-are-examples-of-everything-new-in-ecmascript-2016-2017-and-2018-d52fa3b5a70e