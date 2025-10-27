class LoginPage {
    elements = {
        email: () => cy.get('#email'),
        senha: () => cy.get('#senha'),
        botaoEntrar: () => cy.get('.btn.btn-primary'),
        linkNovoUsuario: () => cy.get('a[href="/cadastro"]'),
        mensagemAlerta: () => cy.get('.alert')
    }

    visit() {
        cy.visit('/login')
    }

    preencherEmail(email) {
        this.elements.email().type(email)
    }

    preencherSenha(senha) {
        this.elements.senha().type(senha)
    }

    clicarEntrar() {
        this.elements.botaoEntrar().click()
    }

    clicarNovoUsuario() {
        this.elements.linkNovoUsuario().click()
    }

    fazerLogin(email, senha) {
        this.preencherEmail(email)
        this.preencherSenha(senha)
        this.clicarEntrar()
    }
}

export default new LoginPage()
