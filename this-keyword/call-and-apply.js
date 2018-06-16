// “this” call() and apply()

const chalk = require('chalk');

// Though a function’s this value is set implicitly, we can also call function
// with explicit this argument call() and apply().

function dialogue() {
  console.log(`I am ${this.heroName}`);
}
const hero = {
  heroName: 'Batman'
};

// We need to connect the dialogue function with the hero object as a receiver.
// To do so, we can either use call() or apply() like this
// dialogue.call(hero)
// or
// dialogue.apply(hero)

function testThisWithCallAndApply() {
  // With call()
  dialogue.call(hero);
  // With apply()
  dialogue.apply(hero);
}

// Export the function to test "this" with call() and apply()
exports.testThisWithCallAndApply = function () {
  console.log(chalk.blue('\n========================================'));
  console.log(chalk.blue('========================================\n'));
  console.log(chalk.green('Test "this" with call() and apply()'));
  testThisWithCallAndApply();
  console.log(chalk.blue('\n========================================'));
  console.log(chalk.blue('========================================\n'));
}

// What is the difference between call() and apply() ?

// The difference is that apply lets you invoke the function with arguments as an array;
// call requires the parameters to be listed explicitly.
// A useful mnemonic is "A for array and C for comma."
// Pseudo syntax:
// theFunction.apply(valueForThis, arrayOfArgs)
// theFunction.call(valueForThis, arg1, arg2, ...)

// Refer https://stackoverflow.com/a/1986909/4102433