import ContasPage from '../../support/pages/ContasPage'
import MovimentacaoPage from '../../support/pages/MovimentacaoPage'
import { faker } from '@faker-js/faker/locale/pt_BR'

describe('Testes de Contas', () => {
    beforeEach(() => {
        cy.fixture('ultimo_usuario_criado').then(usuario => {
            cy.loginApp(usuario.email, usuario.senha)
        })
    })

    it('Deve adicionar duas contas com sucesso', () => {
        const conta1 = `Conta ${faker.word.sample()} ${faker.number.int(999)}`
        const conta2 = `Conta ${faker.word.sample()} ${faker.number.int(999)}`

        // Adiciona primeira conta
        ContasPage.adicionarConta(conta1)
        cy.get('.alert')
            .should('be.visible')
            .and('contain', 'Conta adicionada com sucesso!')

        // Adiciona segunda conta
        ContasPage.adicionarConta(conta2)
        cy.get('.alert')
            .should('be.visible')
            .and('contain', 'Conta adicionada com sucesso!')

        // Verifica se as contas foram adicionadas
        ContasPage.acessarListagemContas()
        cy.contains(conta1).should('be.visible')
        cy.contains(conta2).should('be.visible')
    })

    it('Deve listar todas as contas', () => {
        ContasPage.acessarListagemContas()

        // Verifica elementos da tabela
        cy.get('table thead th').should('have.length', 2) 
        cy.get('table thead')
            .find('th')
            .then(($headers) => {
                expect($headers.eq(0)).to.contain('Conta')
                expect($headers.eq(1)).to.contain('Ações')
            })
        
        // Verifica se existe pelo menos uma conta na tabela
        cy.get('table tbody tr').should('have.length.at.least', 1)
    })

    it('Deve alterar nome da conta', () => {
        const contaOriginal = `Conta Original ${faker.word.sample()}`
        const contaModificada = `Conta Modificada ${faker.word.sample()}`

        // Cria uma conta para modificar
        ContasPage.adicionarConta(contaOriginal)

        // Modifica o nome da conta
        ContasPage.acessarListagemContas()
        ContasPage.editarConta(contaOriginal, contaModificada)

        // Validações
        cy.get('.alert')
            .should('be.visible')
            .and('contain', 'Conta alterada com sucesso!')
        cy.contains(contaModificada).should('be.visible')
        cy.contains(contaOriginal).should('not.exist')
    })

    it('Não deve excluir conta com movimentação', () => {
        const contaComMovimentacao = `Conta Movimentacao ${faker.word.sample()}`

        // Cria a conta
        ContasPage.adicionarConta(contaComMovimentacao)
        cy.get('.alert')
            .should('be.visible')
            .and('contain', 'Conta adicionada com sucesso')

        // Cria uma movimentação para a conta
        const movimentacao = {
            descricao: `Movimentação de teste ${faker.word.sample()}`,
            valor: faker.number.int({ min: 100, max: 1000 }).toString()
        }

        // Adiciona a movimentação
        MovimentacaoPage.criarMovimentacao(
            movimentacao.descricao,
            movimentacao.valor,
            contaComMovimentacao
        )

        // Valida que a movimentação foi criada
        cy.get('.alert')
            .should('be.visible')
            .and('contain', 'Movimentação adicionada com sucesso')

        // Tenta excluir a conta
        ContasPage.acessarListagemContas()
        ContasPage.excluirConta(contaComMovimentacao)

        // Validação da mensagem de erro
        cy.get('.alert')
            .should('be.visible')
            .and('contain', 'Conta em uso na movimentações')
            .and('have.class', 'alert-danger')

        // Validação adicional: conta ainda existe na lista
        cy.contains('td', contaComMovimentacao).should('be.visible')
    })

    it('Não deve permitir criar conta com nome duplicado', () => {
        // Criar uma conta inicial
        const nomeConta = `Conta ${faker.word.sample()} ${faker.number.int(999)}`
        
        // Adiciona a primeira conta
        ContasPage.adicionarConta(nomeConta)

        // Valida que a primeira conta foi criada com sucesso
        cy.get('.alert')
            .should('be.visible')
            .and('have.class', 'alert-success')
            .and('contain', 'Conta adicionada com sucesso!')

        // Tenta adicionar uma conta com o mesmo nome
        ContasPage.adicionarConta(nomeConta)

        // Validações do erro
        cy.get('.alert')
            .should('be.visible')
            .and('have.class', 'alert-danger')
            .and('contain', 'Já existe uma conta com esse nome!')

        // Validações adicionais
        cy.url().should('include', '/salvarConta') // Verifica se permanece na página de adicionar conta
    })
})