// “this” keyword in classes

const chalk = require('chalk');

// Classes are one of the most important parts of any JavaScript apps.
// Lets see how this behaves inside a class.

// A class generally contains a constructor, where "this" would refer to any newly created object.

// But in case of methods, this can also refer to any other value if the method is called 
// as an ordinary function. And just like a method, classes can also lose track of the receiver.

function testThisWithClasses() {
  // Let’s re-create the Hero functions that we have seen earlier as a class.
  // This class will contain a constructor and a dialogue() method.
  // Finally, we create an instance of this class and call the dialogue method.
  class Hero {
    constructor(heroName) {
      // this refers to the new created object when this constructor is called.
      this.heroName = heroName;
    }

    dialogue() {
      console.log(`I am ${this.heroName}`)
    }
  }
  const batman = new Hero("Batman");
  batman.dialogue();
  // "this" inside the constructor refers to the newly created instance of that class.
  // When we call batman.dialogue(), we invoke dialogue() as a method with batman as a receiver.

  // But if we store a reference to the dialogue() method, and later invoke it as a function, 
  // we once again lose the receiver of the method and the this argument now refers to undefined.

  // The reason for error is that JavaScript classes are implicitly in strict mode.
}

// Export the function to test "this" inside classes
exports.testThisWithClasses = function () {
  console.log(chalk.blue('\n========================================'));
  console.log(chalk.blue('========================================\n'));
  console.log(chalk.green('Test "this" inside class'));
  testThisWithClasses();
  console.log(chalk.blue('\n========================================'));
  console.log(chalk.blue('========================================\n'));
}