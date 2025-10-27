class CadastroPage {
    elements = {
        nome: () => cy.get('#nome'),
        email: () => cy.get('#email'),
        senha: () => cy.get('#senha'),
        botaoCadastrar: () => cy.get('.btn.btn-primary')
    }

    visit() {
        cy.visit('/cadastro')
    }

    preencherNome(nome) {
        this.elements.nome().type(nome)
    }

    preencherEmail(email) {
        this.elements.email().type(email)
    }

    preencherSenha(senha) {
        this.elements.senha().type(senha)
    }

    clicarCadastrar() {
        this.elements.botaoCadastrar().click()
    }

    fazerCadastro(nome, email, senha) {
        this.preencherNome(nome)
        this.preencherEmail(email)
        this.preencherSenha(senha)
        this.clicarCadastrar()
    }
}

export default new CadastroPage()