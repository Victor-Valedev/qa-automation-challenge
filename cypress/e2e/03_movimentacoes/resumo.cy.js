import MovimentacaoPage from '../../support/pages/MovimentacaoPage'
import ResumoPage from '../../support/pages/ResumoPage'
import ContasPage from '../../support/pages/ContasPage'
import { faker } from '@faker-js/faker'

describe('Resumo Mensal', () => {
    beforeEach(() => {
        cy.fixture('ultimo_usuario_criado').then(usuario => {
            cy.loginApp(usuario.email, usuario.senha)
        })

        // Criar uma conta para os testes
        const conta = `Conta ${faker.string.alpha(5)}`
        ContasPage.adicionarConta(conta)
        cy.wrap(conta).as('conta')
    })

    it('Deve filtrar movimentações por mês', function() {
        // Criar uma movimentação para Janeiro
        const descricaoJaneiro = `Movimentação ${faker.string.alpha(5)}`
        MovimentacaoPage.criarMovimentacao({
            descricao: descricaoJaneiro,
            valor: 100,
            conta: this.conta,
            dataTransacao: '01/01/2024',
            dataPagamento: '01/01/2024'
        })

        // Criar uma movimentação para Fevereiro
        const descricaoFevereiro = `Movimentação ${faker.string.alpha(5)}`
        MovimentacaoPage.criarMovimentacao({
            descricao: descricaoFevereiro,
            valor: 200,
            conta: this.conta,
            dataTransacao: '01/02/2024',
            dataPagamento: '01/02/2024'
        })

        // Acessar o resumo mensal
        ResumoPage.acessarResumo()

        // Filtrar por Janeiro
        ResumoPage.filtrarPorPeriodo('Janeiro', '2024')
        ResumoPage.verificarMovimentacaoExiste(descricaoJaneiro)
        ResumoPage.verificarMovimentacaoNaoExiste(descricaoFevereiro)

        // Filtrar por Fevereiro
        ResumoPage.filtrarPorPeriodo('Fevereiro', '2024')
        ResumoPage.verificarMovimentacaoExiste(descricaoFevereiro)
        ResumoPage.verificarMovimentacaoNaoExiste(descricaoJaneiro)
    })

    it('Deve excluir uma movimentação', function() {
        // Criar uma movimentação para ser excluída
        const descricao = `Movimentação ${faker.string.alpha(5)}`
        MovimentacaoPage.criarMovimentacao({
            descricao: descricao,
            valor: 100,
            conta: this.conta
        })

        // Acessar o resumo mensal
        ResumoPage.acessarResumo()

        // Verificar se a movimentação existe
        ResumoPage.verificarMovimentacaoExiste(descricao)

        // Excluir a movimentação
        ResumoPage.excluirMovimentacao(descricao)

        // Validar mensagem de sucesso
        ResumoPage.elements.mensagemSucesso()
            .should('be.visible')
            .and('have.class', 'alert-success')
            .and('contain', 'Movimentação removida com sucesso!')

        // Verificar se a movimentação foi removida
        ResumoPage.verificarMovimentacaoNaoExiste(descricao)
    })
})