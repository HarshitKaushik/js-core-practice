// “this” inside constructors

const chalk = require('chalk');

// JavaScript does not have any special constructor functions.
// All we can do is convert a function call into a constructor call using new operator

// When a constructor call is made, a new object is created and set as the function’s this argument.
// The object is then implicitly returned from the function, unless we have another object 
// that is being returned explicitly.

function testThisInsideConstructor() {
  this.firstName = "Chandrashekhar";
  this.lastName = "Azad";
}

// Export the function to test "this" inside a constructor
exports.testThisInsideConstructorMethod = function () {
  console.log(chalk.blue('\n========================================'));
  console.log(chalk.blue('========================================\n'));
  console.log(chalk.green('Test "this" inside a constuctor'));
  // We make a constructor call
  const resultObj = new testThisInsideConstructor();
  console.log(resultObj);
  console.log(chalk.blue('\n========================================'));
  console.log(chalk.blue('========================================\n'));
}