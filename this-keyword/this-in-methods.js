// “this” inside methods

const chalk = require('chalk');

// When calling a function as a method of an object, this refers to the object,
// which is then known as the receiver of the function call.

// We create an object hero, a function in this object dialogue()
// Here "this" refers to the object itself to which the function belongs
const hero = {
  heroName: "Batman",
  dialogue() {
    console.log(`I am ${this.heroName}!`);
  }
};

function testThisInsideMethods() {
  // Test the "this" inside an object
  hero.dialogue();

  // The loss of receiver usually happens when we are passing a method as a callback to another.
  // We can either solve this by adding a wrapper function or by using bind method to tie our this to a specific object.
}

// Export the function to test "this" inside methods
exports.testThisInsideMethods = function () {
  console.log(chalk.blue('\n========================================'));
  console.log(chalk.blue('========================================\n'));
  console.log(chalk.green('Test "this" inside methods'));
  testThisInsideMethods();
  console.log(chalk.blue('\n========================================'));
  console.log(chalk.blue('========================================\n'));
}