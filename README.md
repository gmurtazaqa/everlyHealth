# everlyHealth-testProject
 
## To install
Clone the project in a folder and run: `npm install`

## To Open Cypress in GUI mode
`npm run cypress:open:qa`

## To run Cypress in headless mode
`npm run cypress:run:qa`

## Desc
- POM is set up in `cypress/support/pages`
- multiple reporters are configured to run when cypress in run in CLI mode
- mutiple env configuration is done in framework
- seperate spec files are present `cypress/integration`
- npm scripts to run cypress on QA env are set in `package.json`
- environment configuration is done in `cypress.json` and `cypress/config/qa.json`
