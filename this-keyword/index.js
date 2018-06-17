const chalk = require('chalk');

// Synchronous Readline for interactively running to have a conversation with the user via a console(TTY).
// readlineSync tries to let your script have a conversation with the user via a console, even when the input / output stream is redirected
const readLineSync = require('readline-sync');

const thisGlobalEnv = require('./this-global-env');
const thisInsideFunctionStrictMode = require('./this-inside-func-strict-mode');
const thisInsideFunctionsNotStrictMode = require('./this-inside-func-no-strict-mode');
const thisInsideConstructor = require('./this-inside-constructors');
const thisInsideMethods = require('./this-in-methods');
const thisWithCallAndApply = require('./call-and-apply');
const thisWithBind = require('./this-with-bind');
const thisInsideArrowFunctions = require('./this-in-arrow-func');
const thisInsideClasses = require('./this-in-classes');

// main file for the this-keyword repo

// Setup the basic choice menu for the user
const basicChoiceMenuSetup = function() {
  console.log(chalk.green('Please enter a choice as integer to know more about "this":'));
  console.log(chalk.green('(Please go through the js files in the root directory first)'));
  console.log(chalk.green('1. "this" in global environment'));
  console.log(chalk.green('2. "this" inside functions - use strict mode'));
  console.log(chalk.green('3. "this" inside functions - not in strict mode'));
  console.log(chalk.green('4. "this" inside constructors'));
  console.log(chalk.green('5. "this" inside methods'));
  console.log(chalk.green('6. "this" call() and apply()'));
  console.log(chalk.green('7. "this" with bind()'));
  console.log(chalk.green('8. "this" inside arrow functions'));
  console.log(chalk.green('9. "this" inside classes'));
}

// Set up the this keyword interactive tutorial 
const setupThisKeywordTutorial = function() {
  console.log(chalk.green('Welcome to "this" keyword tutorial: '));
  basicChoiceMenuSetup();
  const userValidChoiceArray = [1,2,3,4,5,6,7,8,9];
  const userChoiceIndex = readLineSync.keyInSelect(userValidChoiceArray, 'What is your choice?');
  console.log('User Choice: ' + userValidChoiceArray[userChoiceIndex]);
  switch (userValidChoiceArray[userChoiceIndex]) {
    case 1:
      thisGlobalEnv.testThisInGlobalScope();
      break;
    case 2:
      thisInsideFunctionStrictMode.testThisInFunctionsInStrictMode();
      break;
    case 3:
      thisInsideFunctionsNotStrictMode.testThisInFunctionsNotInStrictMode();
      break;
    case 4:
      thisInsideConstructor.testThisInsideConstructorMethod();
      break;
    case 5:
      thisInsideMethods.testThisInsideMethods();
      break;
    case 6:
      thisWithCallAndApply.testThisWithCallAndApply();
      break;
    case 7:
      thisWithBind.testThisWithBind();
      break;
    case 8:
      thisInsideArrowFunctions.testThisInsideArrowFunctionsMethod();
      break;
    case 9:
      thisInsideClasses.testThisWithClasses();
      break;
    default:
      console.log(chalk.red('Nothing configured for this choice. Please try again.'));
      break;
  }
  const userWantsToExit = readLineSync.keyInYN('Do you want to exit?');
  console.log(chalk.red('User wants to exit: ', userWantsToExit));
  if (!userWantsToExit) {
    setupThisKeywordTutorial();
  }
}

// Invoke the main method 
setupThisKeywordTutorial();