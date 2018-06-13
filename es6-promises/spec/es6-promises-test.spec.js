// node_modules/jasmine/bin/jasmine.js spec/es6-promises-test.spec.js
// Above command to run the jasmine tests from jasmine file installed locally

// Writing tests and using them to understand the ES6 Promise concepts
// Reference article - https://medium.freecodecamp.org/learn-more-about-javascripts-promises-from-zero-to-hero-in-25-tests-ddaaf4d3c928
// Adding chalk repo for terminal styling and writing on terminal when the tests are run

const chalk = require('chalk');
const fetch = require('node-fetch');

it('Promise executor is run SYNCHRONOUSLY', () => {
  console.log(chalk.green('Test - Promise executor is run SYNCHRONOUSLY'));
  console.log(chalk.green('executorRun initialized as false'));
  let executorRun = false;
  new Promise(function executor() {
    // Try setting timeout
    // setTimeout(() => {}, 1000);
    // console.log(chalk.blue('below timeout function'));
    // Message:
    // Expected false to be true.
    // TLDR: the function passed to the promise is executed synchronously,
    // but subsequent then calls are always executed asynchronously.
    // For reference, https://stackoverflow.com/a/29964540/4102433
    console.log(chalk.green('Change executorRun to true inside the promise executor function'));
    executorRun = true;
  });
  console.log(chalk.green('Value of executorRun: ' + executorRun));
  expect(executorRun).toBe(true);
});

it('you can resolve a promise', (done) => {
  console.log(chalk.green('Test - you can resolve a promise'));
  new Promise((resolve) => setTimeout(resolve, 1))
    .then(done);
});

it('... or you can reject a promise', (done) => {
  console.log(chalk.green('Test - ... or you can reject a promise'));
  // the first handler in .then() is invoked when the promise is resolved
  // the second handler in .then() is invoked when the promise is rejected
  new Promise((resolve, reject) => setTimeout(reject, 1))
    .then(undefined, done);
});

it('An error inside the executor, rejects the promise', (done) => {
  console.log(chalk.green('Test - An error inside the executor, rejects the promise'));
  // done handler will be invoked if the promise is resolved.
  // but throwing an error rejects the promise.
  new Promise(function executor() {
    throw 'Error';
  }).catch(done);
});

// Chaining promises
// Let’s see more in detail what those then(...) and catch() functions are, and what “chaining promises” means
// The fetch API is not implemented in Node.You need to use an external module for that, and a good one is node - fetch.
// After installing the module in your Node application, simply put the line below at the top of the files where you are calling the fetch API:
// const fetch = require("node-fetch");
// Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL
// https://stackoverflow.com/a/25273095/4102433

it('you can chain promise because .then(...) returns a promise'
  , () => {
    console.log(chalk.green('Test - you can chain promise because .then(...) returns a promise'));
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => { console.log(response.json()); response.json(); })
      .then(json => { console.log(json); expect(json.userId).toBe(1); })
      .then();
  });

it('you can use the fail callback of .then(success, fail) to ' +
  'handle rejected promises', (done) => {
    console.log(chalk.green('Test - you can use the fail callback of .then(success, fail) to handle rejected promises'));
    Promise.reject()
      .then(function success() {
        throw 'I must not be executed';
      }, function fail() {
        done();
      });
  });

it('... or you can use .catch() to handle rejected promises'
  , (done) => {
    console.log(chalk.green('Test - ... or you can use .catch() to handle rejected promises'));
    Promise.reject()
      .then(function success() {
        throw 'I must not be executed';
      })
      .catch(done);
  });

// .catch() and .then() both return a promise and allow promise chaining
it('also .catch() returns a promise, allowing promise chaining', (done) => {
  console.log(chalk.green('Test - .catch() and .then() both return a promise and allow promise chaining'));
  Promise.reject()
    .catch(() => undefined)
    .then(done);
});

// Suppose a .catch() is chained to a .catch() method
// it will only execute if the first .catch() returns a rejected promise
// you must return a rejected promise
it('you must return a rejected promise if you want to ' +
  'execute the next fail callback', (done) => {
    console.log(chalk.green('Test - you must return a rejected promise if you want to execute the next fail callback'));
    function someApiCall() {
      return Promise.reject('Error');
    }

    someApiCall()
      .catch((err) => {
        console.error(err);

        // Without the line below, .catch gets not called
        return Promise.reject(err);
      })
      .catch(done);
  });

// If we don't return a rejected promise from a .catch() method
// we can throw an error, so that the next fail callback is called.
it('... or you can throw an error if you want to ' +
  'execute the next fail callback', (done) => {
    console.log(chalk.green('Test - ... or you can throw an error if you want to execute the next fail callback'));
    function someApiCall() {
      return Promise.reject('Error');
    }

    someApiCall()
      .catch((err) => {
        console.error(err);
        throw err; // Without this line, the next .catch() gets not called
      })
      .catch(done);
  });

// lambda functions are also used to write one line callbacks in a promise
// values returned inside .then()/.catch() callbacks are provided to the next callback
// it means that in below first Promise.resolve() method, the value in first .then() is 1
// the value is 2 for the second .then() method which is the returned value of the callback in first .then()
// similarly it works for reject handler 
it('values returned inside .then()/.catch() callbacks are provided to the next callback', (done) => {
  Promise.resolve(1)
    .then(value => value + 1)
    .then(value => expect(value).toBe(2));

  Promise.reject(1)
    .catch(value => value + 1)
    .then(value => expect(value).toBe(2));

  setTimeout(() => {
    done();
  }, 1);
});

it('you can use Promise.resolve() to wrap values or promises'
  , (done) => {
    function iMayReturnAPromise() {
      return Math.random() >= 0.5 ? Promise.resolve() : 5;
    }
    Promise.resolve(iMayReturnAPromise()).then(done);
  });

it('you can use Promise.resolve() to execute something just after'
  , (done) => {
    let arr = [];
    Promise.resolve().then(() => arr.push(2));
    arr.push(1);
    setTimeout(() => {
      expect(arr).toEqual([1, 2]);
      done();
    }, 1);
  });
/** @see
https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules
 **/
it('Promise.resolve() is normally executed before setTimeout(.., 0)'
  , (done) => {
    let arr = [];
    setTimeout(() => arr.push('timeOut'), 0);
    Promise.resolve().then(() => {
      arr.push('resolve');
    });
    setTimeout(() => {
      expect(arr).toEqual(['resolve', 'timeOut']);
      done();
    }, 1);
  });
it('you can create rejected promises', (done) => {
  Promise.reject('reason').catch(done);
});
it('pay attention to "Uncaught (in promise) ..."', () => {
  Promise.reject('The error');
  // Outputs in the console Uncaught (in promise) The error
});