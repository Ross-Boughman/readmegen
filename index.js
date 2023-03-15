const fs = require("fs");
const inquirer = require("inquirer");
const util = require('util');
const api = require('./utils/api.js');
const generateMarkdown = require("./utils/generateMarkdown");

const questions = [
  {
    type: "input",
    message: "What is your project title?",
    name: "title",
    default: "Title",
    validate: function (answer) {
      if (answer.length < 1) {
        return console.log("You must enter a title!");
      }
      return true;
    },
  },
  {
    type: "input",
    message: "Give a brief description of your projet.",
    name: "description",
    default: "Description",
    validate: function (answer) {
      if (answer.length < 1) {
        return console.log("Your description cannot be empty!");
      }
      return true;
    },
  },
  {
    type: "input",
    message: "What is your GitHub username?",
    name: "username",
    default: "Username",
    validate: function (answer) {
      if (answer.length < 1) {
        return console.log("Please enter a valid GitHub username.");
      }
      return true;
    },
  },
  {
    type: "input",
    message: "What is your GitHub repo called?",
    name: "repo",
    default: "Repo",
    validate: function (answer) {
      if (answer.length < 1) {
        return console.log("Please enter a valid GitHub repo.");
      }
      return true;
    },
  },
  {
    type: "input",
    message: "List the steps needed to install your project.",
    name: "install",
  },
  {
    type: "input",
    message:
      "Are there examples of or instructions for your project? List them here:",
    name: "usage",
  },
  {
    type: "input",
    message:
      "Can other developers can contribute to your project? Offer guidelines how here:",
    name: "contributing",
  },
  {
    type: "input",
    message:
      "List the tests written for your application here, and provide examples for how to use them.",
    name: "tests",
  },
  {
    type: "list",
    message: "Which license will your project use?",
    choices: [
      "GNU AGPLv3",
      "GNU GPLv3",
      "GNU LGPLv3",
      "Mozilla Public License 2.0",
      "Apache License 2.0",
      "MIT License",
      "Boost Software License 1.0",
      "The Unlicense",
    ],
    name: "license",
  },
];

function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("Success!");
  });
}
writeToFile();

const writeFileAsync = util.promisify(writeToFile);

async function init() {
  try {
    const userResponses = await inquirer.prompt(questions);
    console.log("Your responses: ", userResponses);
    console.log(
      "Thank you for your responses! Getting GitHub data..."
    );

    const userInfo = await api.getUser(userResponses);
    console.log("Your GitHub user info: ", userInfo);

    console.log("Generating your README...");
    const markdown = generateMarkdown(userResponses, userInfo);
    console.log(markdown);

    await writeFileAsync(fileName, markdown);
  } catch (error) {
    console.log(error);
  }
}

init();

