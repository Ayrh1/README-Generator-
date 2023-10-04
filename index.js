// import librabries 
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');
const fs = require("fs");

// Questions to be asked by user
let collectedAnswers = [];
const questions = [

    {
        type: 'input',
        name: 'title',
        message: "1.what is the title of your project?",
    },
    {
        type: 'input',
        name: 'description',
        message: "2.Please Enter Description Information:",
    },
    {
        type: 'input',
        name: 'installation',
        message: "3.Please Enter Installation Information:",
    },
    {
        type: 'input',
        name: 'usage',
        message: "4.Please Enter Usager Information:",
    },
    {
        type: 'input',
        name: 'usageImg',
        message: "5.Please Enter Screenshot Relative Path:",
    },
    {
        type: 'list',
        name: 'license',
        message: "6.What Type of License: ",
        choices: ["MIT License", "Open BSD", "Mozilla Public License 2.0","None"],
    },
    {
        type: 'input',
        name: 'features',
        message: "7.Please Enter Project features:",
    },
    {
        type: 'input',
        name: 'contribute',
        message: "8.Please Enter Contributor Information:",
    },
    {
        type: 'input',
        name: 'test',
        message: "9.Please Enter Test Information:",
    },
    {
        type: 'input',
        name: 'email',
        message: "10.Please Enter Email Information:",
    },
    {
        type: 'input',
        name: 'github',
        message: "11.Please Enter GitHub Information:",
    },
    {
        //if true, function credits will start 
        type: 'confirm',
        name: 'addCredits',
        message: "9.Would You Like to Add Credits?",
        default: true,
    },
];
// function is triggered only if user confirms adding credits 
function credit(questionAnswers){
    const credits = [

        {
            type: 'input',
            name: 'name',
            message: "Enter a Name:",
        },
        {
            type: 'input',
            name: 'url',
            message: "Enter Url:",
        },
        {
            type: 'confirm',
            name: 'askAgain',
            message: "Would You Like to Add More Credits?",
            default: true,
        },
    ];
    inquirer.prompt(credits).then((creditAnswers) => {
        collectedAnswers.push(creditAnswers);
        if (creditAnswers.askAgain) {
            credit(questionAnswers);
        }else{
            writeToFile('README.md', questionAnswers, collectedAnswers);
        }
      });
};


function writeToFile(fileName, questionAnswers, creditAnswers) {
    const generatedREADME = generateMarkdown.generateMarkdown(questionAnswers,creditAnswers);
    fs.writeFile(fileName, generatedREADME, (error) => {
      error ? console.log(error) : console.log("Successfully created README.md")
    })
  }

// First funtion to be triggerd 
function init() {
    inquirer.prompt(questions).then(questionAnswers => {
        //if question 9 true, call credit function 
        if(questionAnswers.addCredits){
            credit(questionAnswers);
        } else {
            // if question 9 false - call write file function, 
            let creditAnswers = generateCredits([]);  // No credits ***
            writeToFile('README.md', questionAnswers, creditAnswers);
        }
    });
}

// Function call to initialize app
init();


