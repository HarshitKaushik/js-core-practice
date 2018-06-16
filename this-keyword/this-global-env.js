// “this” in Global Environment

const chalk = require('chalk');

// The working mechanism of this is not always easy to understand.
// To understand how this works, we will start looking at this in different environments.
// Let’s start by looking at the global environment first.

// At the global level, this is equivalent to a global object called global.

// In Node.js all modules (script files) are executed in their own closure while 
// browsers execute all script files directly within the global scope.

// In other words, in just about any file running in Node, this will just be an empty object, 
// as Node wraps the code in an anonymous function that is called immediately, 
// and you'd access the global scope within that context with GLOBAL instead.
// DeprecationWarning: 'GLOBAL' is deprecated, use 'global'

// However, when calling a function without a specific context in Node.js, it will normally be defaulted 
// to the global object - The same GLOBAL mentioned earlier, as it's execution context.
// For reference, read https://stackoverflow.com/a/34838985/4102433

function testThisInGlobalScope() {
  const valueOfThisInGlobalScope = (this === global);
  console.log(chalk.yellow('Value of "this" in global scope (this === global): ' + valueOfThisInGlobalScope));
}

// Export the function to test "this" in a global scope.
exports.testThisInGlobalScope = function() {
  console.log(chalk.blue('\n========================================'));
  console.log(chalk.blue('========================================\n'));
  console.log(chalk.green('Test this in a global scope'));
  testThisInGlobalScope();
  console.log(chalk.blue('\n========================================'));
  console.log(chalk.blue('========================================\n'));
}