
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  if(license  === 'None') {
    return '';
  } else {
    return `* [${license}]`;
  }
}


// If there is no license, return an empty string
function renderLicenseLink(license) {
  const myVariable = license;
  console.log('fuction link license:',license)
  switch (myVariable) {
    case 'MIT License':
      return '(https://choosealicense.com/licenses/mit/)';
    case 'Open BSD':
      return '(https://choosealicense.com/licenses/bsd-2-clause/)';
    case 'Mozilla Public License 2.0':
      return '(https://choosealicense.com/licenses/mpl-2.0/)';
    default:
      return ' '; 
}
}


// If there is no license, return an empty string
function renderLicenseSection(license) {
  if(license  === 'None') {
    return '';
  }
  
  return '## License';
}

function generateCredits(creditAnswers) {
  let stringCredits = [];
  if(!Array.isArray(creditAnswers) || creditAnswers.length === 0) {
    return 'No Credits';
  } else {
    for(let i = 0; i < creditAnswers.length; i++){
      stringCredits.push(` * [${creditAnswers[i].name}](${creditAnswers[i].url})`);
    }
    return stringCredits.join('\n');
  }
}

function generateMarkdown(questionAnswers, creditAnswers) {
  let credit = creditAnswers;
  let answer = questionAnswers;
  return `

# ${answer.title}

## Description
${answer.description}

## Table of Contents (Optional)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Features](#Features)
- [Contribute](#Contribute)
- [License](#license)
- [Test](#Test)

## Installation
${answer.installation}
## Usage
![img](./${answer.usageImg})

${answer.usage}

## Credits
${generateCredits(credit)}

${renderLicenseSection(answer.license)}
${renderLicenseBadge(answer.license)}${renderLicenseLink(answer.license)} 

## Features
${answer.features}

## Contribute
${answer.contribute}

## Tests
${answer.test}

## Questions
 Email: ${answer.email}
 GitHub: ${answer.github}

`;
}

module.exports = {
  generateMarkdown, 
}