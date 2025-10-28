import MovimentacaoPage from '../../support/pages/MovimentacaoPage'
import ContasPage from '../../support/pages/ContasPage'
import { faker } from '@faker-js/faker'

describe('Movimentações', () => {
    beforeEach(() => {
        cy.fixture('ultimo_usuario_criado').then(usuario => {
            cy.loginApp(usuario.email, usuario.senha)
        })

        // Cria uma conta para os testes
        const conta = `Conta ${faker.string.alpha(5)}`
        ContasPage.adicionarConta(conta)
        cy.wrap(conta).as('conta')
    })

    it('Deve criar uma receita e uma despesa', function() {
        // Criar Receita
        MovimentacaoPage.criarMovimentacao({
            descricao: 'Salário',
            valor: 5000,
            conta: this.conta,
            tipo: 'REC',
            situacao: 'pago'
        })
        cy.contains('Movimentação adicionada com sucesso!')

        // Criar Despesa
        MovimentacaoPage.criarMovimentacao({
            descricao: 'Aluguel',
            valor: 1500,
            conta: this.conta,
            tipo: 'DESP',
            situacao: 'pago'
        })
        cy.contains('Movimentação adicionada com sucesso!')
    })

    it('Deve criar duas movimentações por conta', function() {
        // Primeira movimentação
        MovimentacaoPage.criarMovimentacao({
            descricao: 'Investimento',
            valor: 1000,
            conta: this.conta,
            tipo: 'REC'
        })
        
        // Segunda movimentação
        MovimentacaoPage.criarMovimentacao({
            descricao: 'Dividendos',
            valor: 500,
            conta: this.conta,
            tipo: 'REC'
        })
    })

    it('Deve criar movimentações com situações diferentes', function() {
        // Movimentação Paga
        MovimentacaoPage.criarMovimentacao({
            descricao: 'Freelance',
            valor: 3000,
            conta: this.conta,
            situacao: 'pago'
        })

        // Movimentação Pendente
        MovimentacaoPage.criarMovimentacao({
            descricao: 'Consultoria',
            valor: 2000,
            conta: this.conta,
            situacao: 'pendente'
        })
    })

    it('Deve criar movimentações em meses diferentes', function() {
        // Movimentação mês atual
        const hoje = new Date()
        MovimentacaoPage.criarMovimentacao({
            descricao: 'Receita Atual',
            valor: 1000,
            conta: this.conta,
            dataTransacao: hoje,
            dataPagamento: hoje
        })

        // Movimentação mês seguinte
        const mesQueVem = new Date()
        mesQueVem.setMonth(mesQueVem.getMonth() + 1)
        MovimentacaoPage.criarMovimentacao({
            descricao: 'Receita Futura',
            valor: 1500,
            conta: this.conta,
            dataTransacao: mesQueVem,
            dataPagamento: mesQueVem
        })
    })

    describe('Validações de campos', () => {
        it('Deve validar data inválida', function() {
            MovimentacaoPage.criarMovimentacao({
                descricao: 'Teste Data Inválida',
                valor: 100,
                conta: this.conta,
                dataTransacao: '31/02/2023',
                dataPagamento: '31/02/2023'
            })
            MovimentacaoPage.validarAlerta('Data da Movimentação inválida')
        })

        it('Deve validar valor não numérico', function() {
            MovimentacaoPage.criarMovimentacao({
                descricao: 'Teste Valor Não Numérico',
                valor: 'abc',
                conta: this.conta
            })
            MovimentacaoPage.validarAlerta('Valor deve ser um número')
        })
    })
})