import LoginPage from '../../support/pages/LoginPage'
import CadastroPage from '../../support/pages/CadastroPage'
import { faker } from '@faker-js/faker/locale/pt_BR'

describe('Testes Login', () => {
    beforeEach(() => {
        LoginPage.visit()
        // Validações da página inicial de login
        cy.url().should('include', '/login')
        cy.get('#email').should('be.visible')
        cy.get('#senha').should('be.visible')
        cy.get('.btn.btn-primary').should('be.visible')
        cy.contains('Seu Barriga').should('be.visible')
        cy.contains('Login').should('be.visible')
        cy.get('a[href="/cadastro"]').should('be.visible')
            .and('contain', 'Novo usuário?')
    })

    it('Deve criar um novo usuário com sucesso', () => {
        const novoUsuario = {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            senha: faker.internet.password({ length: 8 })
        }

        // Navega para página de cadastro
        LoginPage.clicarNovoUsuario()
        
        // Validações da página de cadastro
        cy.url().should('include', '/cadastro')
        cy.get('#nome').should('be.visible')
        cy.get('#email').should('be.visible')
        cy.get('#senha').should('be.visible')
        cy.get('.btn.btn-primary')
            .should('be.visible')
            .and('contain', 'Cadastrar')
        
        // Realiza o cadastro
        CadastroPage.fazerCadastro(
            novoUsuario.nome,
            novoUsuario.email,
            novoUsuario.senha
        )

        // Validações pós-cadastro
        cy.url().should('include', '/cadastrarUsuario')
        cy.get('.alert')
            .should('be.visible')
            .and('have.class', 'alert-success')
            .and('contain', 'Usuário inserido com sucesso')

        // Salva dados para usar no teste de login
        cy.writeFile('cypress/fixtures/ultimo_usuario_criado.json', novoUsuario)
    })

    it('Não deve permitir login com usuário não cadastrado', () => {
        const usuarioInvalido = {
            email: faker.internet.email(),
            senha: faker.internet.password({ length: 8 })
        }

        // Validações antes do login
        cy.get('#email').should('have.value', '')
        cy.get('#senha').should('have.value', '')

        LoginPage.fazerLogin(usuarioInvalido.email, usuarioInvalido.senha)

        // Validações pós-tentativa de login
        cy.url().should('include', '/logar')
        cy.get('.alert')
            .should('be.visible')
            .and('have.class', 'alert-danger')
            .and('contain', 'Problemas com o login do usuário')
    })

    it('Deve fazer login com sucesso', () => {
        cy.fixture('ultimo_usuario_criado').then(usuario => {
            // Validações antes do login
            cy.get('#email').should('have.value', '')
            cy.get('#senha').should('have.value', '')

            LoginPage.fazerLogin(usuario.email, usuario.senha)

            // Validações pós-login
            cy.url().should('include', '/')
            
            // Validação da mensagem de boas-vindas com o nome do usuário
            cy.get('.alert')
                .should('be.visible')
                .and('have.class', 'alert-success')
                .and('contain', `Bem vindo, ${usuario.nome}!`)

            // Validação do título da página
            cy.contains('Seu Barriga').should('be.visible')
            cy.contains('Seu Barriga. Nunca mais esqueça de pagar o aluguel.').should('be.visible')
            
            // Validação de todos os itens do menu
            const menus = ['Home', 'Contas', 'Criar Movimentação', 'Resumo Mensal', 'Sair']
            menus.forEach(menu => {
                cy.contains(menu)
                    .should('be.visible')
                    .and('not.be.disabled')
            })
        })
    })

    it('Não deve cadastrar usuário com email já existente', () => {
        // Primeiro pega os dados do último usuário cadastrado
        cy.fixture('ultimo_usuario_criado').then(usuarioExistente => {
            const tentativaCadastro = {
                nome: faker.person.fullName(),
                email: usuarioExistente.email, // Usa o mesmo email do usuário já cadastrado
                senha: faker.internet.password({ length: 8 })
            }

            // Navega para página de cadastro
            LoginPage.clicarNovoUsuario()

            // Tenta cadastrar com email já existente
            CadastroPage.fazerCadastro(
                tentativaCadastro.nome,
                tentativaCadastro.email,
                tentativaCadastro.senha
            )

            // Validações da mensagem de erro
            cy.get('.alert')
                .should('be.visible')
                .and('have.class', 'alert-danger')
                .and('contain', 'Endereço de email já utilizado')

            // Valida que permanece na página de cadastro
            cy.url().should('include', '/cadastrarUsuario')
        })
    })
})

