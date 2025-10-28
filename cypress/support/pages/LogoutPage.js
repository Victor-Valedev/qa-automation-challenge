class LogoutPage {
    elements = {
        menuSair: () => cy.contains('Sair'),
        alertMensagem: () => cy.get('.alert')
    }

    clicarSair() {
        this.elements.menuSair().click()
    }

    fazerLogout() {
        this.clicarSair()
    }
}

export default new LogoutPage()

