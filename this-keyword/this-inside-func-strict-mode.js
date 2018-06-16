// “this” inside functions - using strict mode
'use strict'

const chalk = require('chalk');

// The value of this inside a function is usually defined by the function’s call. 
// So, this can have different values inside it for each execution of the function.

exports.testThisInFunctionsInStrictMode = function() {

  console.log(chalk.blue('\n========================================'));
  console.log(chalk.blue('========================================\n'));

  // if we create a method to save a superhero's name and real name.

  function createHero(heroName, realName) {
    this.realName = realName;
    this.heroName = heroName;
  }

  // If we run this code in strict mode, we will get an error because JavaScript does not allow us 
  // to assign properties realName and heroName to undefined.
  // This actually is a good thing because it prevents us from creating global variables.

  try {
    const superman = createHero("Superman", "Clark Kent");
    console.log(superman);  
  } catch (error) {
    console.log(error);
  }
  
  console.log(chalk.blue('\n========================================'));
  console.log(chalk.blue('========================================\n'));
};