class ResumoPage {
    elements = {
        menuResumo: () => cy.contains('Resumo Mensal'),
        selectMes: () => cy.get('#mes'),
        selectAno: () => cy.get('#ano'),
        btnBuscar: () => cy.get('.btn-primary'),
        tabelaMovimentacoes: () => cy.get('#tabelaExtrato'),
        linhaMovimentacao: (descricao) => cy.get('#tabelaExtrato tbody tr').contains('td', descricao),
        btnExcluir: (descricao) => cy.get('#tabelaExtrato tbody tr').contains('td', descricao)
            .parents('tr')
            .find('.glyphicon-remove-circle'),
        mensagemSucesso: () => cy.get('.alert-success')
    }

    acessarResumo() {
        this.elements.menuResumo().click()
    }

    filtrarPorPeriodo(mes, ano) {
        // Os meses no select são baseados em números (1-12)
        const meses = {
            'janeiro': '01',
            'fevereiro': '02',
            'março': '03',
            'abril': '04',
            'maio': '05',
            'junho': '06',
            'julho': '07',
            'agosto': '08',
            'setembro': '09',
            'outubro': '10',
            'novembro': '11',
            'dezembro': '12'
        }
        
        this.elements.selectMes().select(meses[mes.toLowerCase()])
        this.elements.selectAno().select(ano)
        this.elements.btnBuscar().click()
    }

    excluirMovimentacao(descricao) {
        this.elements.btnExcluir(descricao).click()
    }

    verificarMovimentacaoExiste(descricao) {
        this.elements.linhaMovimentacao(descricao).should('exist')
    }

    verificarMovimentacaoNaoExiste(descricao) {
        this.elements.linhaMovimentacao(descricao).should('not.exist')
    }
}

export default new ResumoPage()