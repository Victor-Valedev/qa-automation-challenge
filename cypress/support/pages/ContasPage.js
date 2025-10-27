class ContasPage {
    elements = {
        menuContas: () => cy.contains('Contas'),
        subMenuAdicionar: () => cy.contains('Adicionar'),
        subMenuListar: () => cy.contains('Listar'),
        inputNomeConta: () => cy.get('#nome'),
        botaoSalvar: () => cy.get('.btn.btn-primary'),
        mensagemAlerta: () => cy.get('.alert'),
        tabelaContas: () => cy.get('table tbody tr'),
        // Localiza os botões de editar e excluir na mesma linha da conta usando classes do Glyphicon.
        botaoEditar: (nomeConta) => cy.contains('td', nomeConta).siblings().find('.glyphicon-edit'),
        botaoExcluir: (nomeConta) => cy.contains('td', nomeConta).siblings().find('.glyphicon-remove-circle')
    }

    acessarMenuContas() {
        this.elements.menuContas().click()
    }

    acessarAdicionarConta() {
        this.elements.menuContas().click()
        this.elements.subMenuAdicionar().click()
    }

    acessarListagemContas() {
        this.elements.menuContas().click()
        this.elements.subMenuListar().click()
    }

    preencherNomeConta(nome) {
        this.elements.inputNomeConta().type(nome)
    }

    salvarConta() {
        this.elements.botaoSalvar().click()
    }

    editarConta(nomeAtual, novoNome) {
        this.elements.botaoEditar(nomeAtual).click()
        this.elements.inputNomeConta().clear().type(novoNome)
        this.elements.botaoSalvar().click()
    }

    excluirConta(nome) {
        this.elements.botaoExcluir(nome).click()
    }

    adicionarConta(nome) {
        this.acessarAdicionarConta()
        this.preencherNomeConta(nome)
        this.salvarConta()
    }
}

export default new ContasPage()