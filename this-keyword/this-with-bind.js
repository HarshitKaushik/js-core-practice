// “this” with bind()

const chalk = require('chalk');

// When we pass a method as a callback to another function, there is always a risk 
// of losing the intended receiver of the method, making the this argument set 
// to the global object instead.

// The bind() method allows us to permanently tie a this argument to a value.
// So in the below code snippet, bind will create a new dialogue function and set its this value to hero.

const hero = {
  heroName: "Batman",
  dialogue() {
    console.log(`I am ${this.heroName}`);
  }
};

function testThisWithBind() {
  // With bind()
  // setTimeout(hero.dialogue.bind(hero), 1000); (Actual call)
  // Removing timeout because it doesn't print the output before taking next input in console
  setTimeout(hero.dialogue.bind(hero), 1000);
  // By doing so, our this cannot be changed by even call or apply methods.
}

// Export the function to test "this" with bind()
exports.testThisWithBind = function () {
  console.log(chalk.blue('\n========================================'));
  console.log(chalk.blue('========================================\n'));
  console.log(chalk.green('Test "this" with bind() '));
  testThisWithBind();
  console.log(chalk.blue('\n========================================'));
  console.log(chalk.blue('========================================\n'));
}