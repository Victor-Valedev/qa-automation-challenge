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
        checkPendente: () => cy.get('#status_pendente'),
        botaoSalvar: () => cy.get('.btn-primary'),
        mensagemErro: () => cy.get('.alert')
    }

    acessarMovimentacao() {
        this.elements.menuMovimentacao().click()
    }

    criarMovimentacao({
        descricao,
        valor,
        conta,
        tipo = 'REC',
        situacao = 'pago',
        dataTransacao,
        dataPagamento,
        interessado = 'Interessado Teste'
    }) {
        this.acessarMovimentacao()
        this.elements.inputDescricao().type(descricao)
        this.elements.inputValor().type(valor.toString())
        this.elements.inputInteressado().type(interessado)
        this.elements.selectConta().select(conta)
        this.elements.selectTipo().select(tipo)
        
        // Formata as datas se fornecidas, senão usa a data atual
        const dataFormatada = (data) => {
            if (data instanceof Date) {
                return data.toLocaleDateString('pt-BR')
            }
            return data || new Date().toLocaleDateString('pt-BR')
        }

        this.elements.inputData().type(dataFormatada(dataTransacao))
        this.elements.inputDataPagamento().type(dataFormatada(dataPagamento))
        
        if (situacao === 'pago') {
            this.elements.checkPago().click()
        } else {
            this.elements.checkPendente().click()
        }

        this.elements.botaoSalvar().click()
    }

    // Método específico para validar mensagens de erro
    validarMensagemErro(mensagem) {
        this.elements.mensagemErro().should('contain', mensagem)
    }
}

export default new MovimentacaoPage()