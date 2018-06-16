// “this” inside functions - not in the strict mode

const chalk = require('chalk');

// The value of this inside a function is usually defined by the function’s call. 
// So, this can have different values inside it for each execution of the function.

exports.testThisInFunctionsNotInStrictMode = function () {

  console.log(chalk.blue('\n========================================'));
  console.log(chalk.blue('========================================\n'));

  // if we create a method to save a superhero's name and real name.

  function testThis() {
    console.log(chalk.yellow('this => ' + this));
    console.log(chalk.yellow('this === global => ' + (this === global)));
  }

  // If we run this code using node, we will the output as true.
  // But we add "use strict" at the top of the file and run it again, 
  // we will get a false output because now the value of this is undefined
  testThis();

  console.log(chalk.blue('\n========================================'));
  console.log(chalk.blue('========================================\n'));
};