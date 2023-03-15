function renderLicenseBadge(license) {
  if (!license) {
    return "";
  } else {
    let badge;

    switch (license) {
      case "GNU AGPLv3":
        badge = { name: "GNU+AGPLv3", color: "orange" };
        break;
      case "GNU GPLv3":
        badge = { name: "GNU+GPLv3", color: "red" };
        break;
      case "GNU LGPLv3":
        badge = { name: "GNU+LGPLv3", color: "blue" };
        break;
      case "Mozilla Public License 2.0":
        badge = { name: "Mozilla+2.0", color: "yellow" };
        break;
      case "Apache License 2.0":
        badge = { name: "Apache+2.0", color: "green" };
        break;
      case "MIT License":
        badge = { name: "MIT", color: "brightgreen" };
        break;
      case "Boost Software License 1.0":
        badge = { name: "Boost+Software+1.0", color: "yellowgreen" };
        break;
      case "The Unlicense":
        badge = { name: "The+Unlicense", color: "blueviolet" };
        break;
    }

    return `https://img.shields.io/static/v1?label=license&message=${badge.name}&color=${badge.color}`;
  }
}

function renderLicenseLink(license) {
  if (!license) {
    return "";
  } else {
    let path;

    switch (license) {
      case "GNU AGPLv3":
        path = "agpl-3.0";
        break;
      case "GNU GPLv3":
        path = "gpl-3.0";
        break;
      case "GNU LGPLv3":
        path = "lgpl-3.0";
        break;
      case "Mozilla Public License 2.0":
        path = "mpl-2.0";
        break;
      case "Apache License 2.0":
        path = "apache-2.0";
        break;
      case "MIT License":
        path = "mit";
        break;
      case "Boost Software License 1.0":
        path = "bsl-1.0";
        break;
      case "The Unlicense":
        path = "unlicense";
        break;
    }

    return `https://choosealicense.com/licenses/${path}/`;
  }
}

function renderLicenseSection(license) {
  if (!license) {
    return "";
  } else {
    const LicenseLink = renderLicenseLink(license);
    const LicenseBadge = renderLicenseBadge(license);
    return `# This project is licensed under ${license}, found at ${LicenseLink}
    ${LicenseBadge}`;
  }
}

function generateMarkdown(data) {
  const LicenseSection = renderLicenseSection(data.license);
  let tableOfCont = `## Table of Contents`;

  if (data.installation !== "") {
    tableOfCont += `
    * [Installation](#installation)`;
  }

  if (data.usage !== "") {
    tableOfCont += `
    * [Usage](#usage)`;
  }

  if (data.contributing !== "") {
    tableOfCont += `
    * [Contributing](#contributing)`;
  }

  if (data.tests !== "") {
    tableOfCont += `
    * [Tests](#tests)`;
  }
  let Markdown = `# ${data.title}
    
    ## Description 
    
    ${data.description}
    `;


  Markdown += tableOfCont;


  Markdown += `
    * [License](#license)`;

  if (data.install !== "") {
    Markdown += `
    
    ## Installation:
    
    ${data.install}`;
  }

  if (data.usage !== "") {
    Markdown += `
    
    ## Usage:
    
    ${data.usage}`;
  }

  if (data.contributing !== "") {
    Markdown += `
    
    ## Contributing:
    
    ${data.contributing}`;
  }

  if (data.tests !== "") {
    Markdown += `
    
    ## Tests:
    
    ${data.tests}`;
  }

  Markdown += `
    
    ## License:
    
    ${data.license}
    ${LicenseSection}
    `;

  const developer = `
    ## Creator:

    *${data.username}*

    *${data.repo}*
    `;

  Markdown += developer;

  return Markdown;
}

module.exports = generateMarkdown;
