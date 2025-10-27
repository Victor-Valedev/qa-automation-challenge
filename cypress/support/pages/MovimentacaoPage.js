class MovimentacaoPage {
    elements = {
        menuMovimentacao: () => cy.contains('Criar Movimentação'),
        inputDescricao: () => cy.get('#descricao'),
        inputValor: () => cy.get('#valor'),
        inputInteressado: () => cy.get('#interessado'),
        selectConta: () => cy.get('#conta'),
        selectTipo: () => cy.get('#tipo'),
        inputData: () => cy.get('#data_transacao'),
        inputDataPagamento: () => cy.get('#data_pagamento'),
        checkPago: () => cy.get('#status_pago'),
        botaoSalvar: () => cy.get('.btn-primary')
    }

    acessarMovimentacao() {
        this.elements.menuMovimentacao().click()
    }

    criarMovimentacao(descricao, valor, conta, tipo = 'receita') {
        this.acessarMovimentacao()
        this.elements.inputDescricao().type(descricao)
        this.elements.inputValor().type(valor)
        this.elements.inputInteressado().type('Interessado Teste')
        this.elements.selectConta().select(conta)
        
        // Seleciona o tipo correto no dropdown
        if (tipo === 'receita') {
            this.elements.selectTipo().select('REC')
        } else {
            this.elements.selectTipo().select('DESP')
        }

        // Pega a data atual formatada
        const dataAtual = new Date().toLocaleDateString('pt-BR')
        this.elements.inputData().type(dataAtual)
        this.elements.inputDataPagamento().type(dataAtual)
        
        this.elements.checkPago().click()
        this.elements.botaoSalvar().click()
    }
}

export default new MovimentacaoPage()