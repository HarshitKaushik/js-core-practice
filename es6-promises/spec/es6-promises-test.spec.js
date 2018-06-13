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

// todo - This is a little doubtful right now. Will come back to it later.
it('you can use Promise.resolve() to wrap values or promises'
  , (done) => {
    function iMayReturnAPromise() {
      return Math.random() >= 0.5 ? Promise.resolve() : 5;
    }
    Promise.resolve(iMayReturnAPromise()).then(done);
  });

// 1. Understand that both .then() success and fail methods are executed asynchronously
// 2. The executor function is executed synchronously and is executed even before the object is returned
// Output of below test
// test begins
// below the promise as code runs synchronously
// Inside the promise.then() method handler
// [1, 2]
// Inside the timeout method
// [1, 2]
it('you can use Promise.resolve() to execute something just after', (done) => {
  console.log('test begins');
  let arr = [];
  Promise.resolve().then(() => {
    arr.push(2);
    console.log('Inside the promise .then() method handler');
    console.log(arr);
  });
  console.log('below the promise as code runs synchronously');
  arr.push(1);
  setTimeout(() => {
    console.log('Inside the timeout method');
    console.log(arr);
    expect(arr).toEqual([1, 2]);
    done();
  }, 1);
});

/** @see
https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules
 **/
// Understood by the same logic as in the above test
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

// Promise.reject() is a wrapper around a rejected promise.
it('you can create rejected promises', (done) => {
  Promise.reject('reason').catch(done);
});

// Uncaught (in promise)
it('pay attention to "Uncaught (in promise) ..."', () => {
  Promise.reject('The error');
  // Outputs in the console Uncaught (in promise) The error
});

// Chaining promises vs.creating new ones
// Although new Promise(...) is a way to create a promise, 
// you should avoid using it.Most of the time, functions / libraries return a promise, so you should chain promises and not create new ones

// The point of promises is to give us back functional composition and error bubbling in the async world.They do this by saying that your functions should return a promise, which can do one of two things:

// Become fulfilled by a value
// Become rejected with an exception
// A good read at https://gist.github.com/domenic/3889970

// When your method can be synchronous(simple data transformation), then use synchronous code in that method

it("Don't use new Promise(...), prefer chaining", (done) => {
  const url = 'https://jsonplaceholder.typicode.com/posts/1';

  function badlyDesignedCustomFetch() {
    return new Promise((resolve, reject) => {
      fetch(url).then((response) => {
        if (response.ok) {
          resolve(response);
        } else {
          reject('Fetch failed');
        }
      });
    });
  }

  function wellDesignedCustomFetch() {
    return fetch(url).then((response) => {
      if (!response.ok) {
        return Promise.reject('Fetch failed');
      }
      return (response);
    });
  }

  // Promise.all
  // Creates a Promise that is resolved with an array of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
  // done will not be called if any one of the below two promises in the array fails.
  Promise.all([
    badlyDesignedCustomFetch(),
    wellDesignedCustomFetch()
  ]).then(done);
});

// Parallel execution
// Promise chaining is nice, but what about executing asynchronous operations in parallel ? Below is all you need to know:
it('you can use Promise.all([...]) to execute promises in parallel'
  , (done) => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const p1 = fetch(`${url}/1`);
    const p2 = fetch(`${url}/2`);

    Promise.all([p1, p2])
      .then(([res1, res2]) => {
        return Promise.all([res1.json(), res2.json()])
      })
      .then(([post1, post2]) => {
        expect(post1.id).toBe(1);
        expect(post2.id).toBe(2);
      })
      .then(done);
  });

// Promise.all([...]) will fail if any of the promises fails
it('Promise.all([...]) will fail if any of the promises fails'
  , (done) => {
    const p1 = Promise.resolve(1);
    const p2 = Promise.reject('Error');
    // In this test, as p2 promise is rejected which fulfils the condition of any one promise failing
    // .catch() is executed.
    Promise.all([p1, p2])
      .then(() => {
        fail('I will not be executed')
      })
      .catch(done);
  });

it("if you don't want Promise.all() to fail, wrap the promises " +
  "in a promise that will not fail", (done) => {
    function iMayFail(val) {
      return Math.random() >= 0.5 ?
        Promise.resolve(val) :
        Promise.reject(val);
    }

    function promiseOr(p, value) {
      return p.then(res => res, () => value);
    }

    const p1 = iMayFail(10);
    const p2 = iMayFail(9);

    // Both promises can fail but are wrapped by a promise each

    Promise.all([promiseOr(p1, null), promiseOr(p2, null)])
      .then(([val1, val2]) => {
        expect(val1 === 10 || val1 === null).toBe(true);
        expect(val2 === 9 || val2 === null).toBe(true);
      })
      .catch(() => {
        fail('I will not be executed')
      })
      .then(done);
  });

it('Promise.race([...]) will resolve as soon as ' +
  'one of the promises resolves o rejects', (done) => {
    const timeout =
      new Promise((resolve, reject) => setTimeout(reject, 100));
    const data =
      fetch('https://jsonplaceholder.typicode.com/posts/1');

    Promise.race([data, timeout])
      .then(() => console.log('Fetch OK'))
      .catch(() => console.log('Fetch timeout'))
      .then(done);
  });

// New await/async syntax
it('you can use the new await/async syntax', async () => {
  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const start = Date.now();
  const delay = 200;

  await timeout(delay + 2); // Just some ms tolerance

  expect(Date.now() - start).toBeGreaterThanOrEqual(delay);
});

it('an async function returns a promise', (done) => {
  async function iAmAsync() {
    return 1;
  }

  iAmAsync()
    .then((val) => expect(val).toBe(1))
    .then(done);
});

it('await just awaits a promise resolution', async (done) => {
  await Promise.resolve();
  done();
});

it('await will throw an error if the promise fail', async (done) => {
  try {
    await Promise.reject();
    fail('I will not be executed');
  } catch (err) {
    done();
  }
});