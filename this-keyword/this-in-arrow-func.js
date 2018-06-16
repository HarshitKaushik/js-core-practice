// “this” inside arrow functions

const chalk = require('chalk');

// Using this with an arrow function is quite different from using it with any other kind of JavaScript function.
// An arrow function uses the this value from its enclosing execution context, since it does have one of its own.

// An arrow function permanently captures the this value, preventing apply or call from changing it later on.

// To explain how this works with regards to the arrow functions, let’s write the arrow function shown below.

const batman = this;
const bruce = () => {
  console.log(this === batman);
};

function testThisInsideArrowFunctions() {
  // invoke the arrow function bruce
  // Here, we are storing the value of a this in a variable and then comparing the value with a this value
  // that is inside an arrow function. Running this method in our terminal should give us true as output.
  bruce();
  // An arrow function’s this value cannot be set explicitly.
  // Also, the arrow function will ignored any attempt from us at passing a value to this using methods like call, apply, and bind.
  // An arrow function will refer to the this value that was set when the arrow function was created.

  // An arrow function can also not be used as a constructor.
  // Hence, we cannot assign properties to this inside an arrow function.

  
}

// Export the function to test "this" with arrow functions
exports.testThisInsideArrowFunctionsMethod = function () {
  console.log(chalk.blue('\n========================================'));
  console.log(chalk.blue('========================================\n'));
  console.log(chalk.green('Test "this" with arrow functions '));
  testThisInsideArrowFunctions();
  console.log(chalk.blue('\n========================================'));
  console.log(chalk.blue('========================================\n'));
}