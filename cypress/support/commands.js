// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
import LoginPage from './pages/LoginPage'

Cypress.Commands.add('loginApp', (email, senha) => {
    LoginPage.visit()
    LoginPage.fazerLogin(email, senha)
})