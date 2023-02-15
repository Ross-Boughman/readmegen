// TODO: Include packages needed for this application
var fs = require('fs');
var inquirer = require('inquirer')
// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        message: "What is your project title?",
        name: 'title',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("You must enter a title!");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "Give a brief description of your projet.",
        name: 'description',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("Your description cannot be empty!");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "Add a table of contents",
        name: 'table of contents',
    },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
            return console.log(err);
        }
        console.log("Success!")
    });
}
writeToFile()
// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
