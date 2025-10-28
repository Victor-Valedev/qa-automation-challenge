import LoginPage from '../../support/pages/LoginPage'
import LogoutPage from '../../support/pages/LogoutPage'

describe('Testes de Logout', () => {
    beforeEach(() => {
        cy.fixture('ultimo_usuario_criado').then(usuario => {
            cy.loginApp(usuario.email, usuario.senha)
        })
    })

    it('Deve deslogar do sistema corretamente', () => {
        // Validações antes do logout - verifica que está logado
        cy.url().should('eq', Cypress.config().baseUrl + '/logar')
        cy.contains('Seu Barriga').should('be.visible')
        
        // Valida que o menu de logout está visível
        LogoutPage.elements.menuSair().should('be.visible')
        
        // Valida que todos os menus estão presentes
        const menus = ['Home', 'Contas', 'Criar Movimentação', 'Resumo Mensal', 'Sair']
        menus.forEach(menu => {
            cy.contains(menu).should('be.visible')
        })
        
        // Realiza o logout
        LogoutPage.fazerLogout()
        
        // Validações pós-logout
        cy.url().should('include', '/logout')
        
        // Valida que estamos na página de login
        cy.get('#email').should('be.visible')
        cy.get('#senha').should('be.visible')
        cy.get('.btn.btn-primary').should('be.visible')
        
        // Valida que não há mais os menus da área logada
        cy.contains('Contas').should('not.exist')
        cy.contains('Criar Movimentação').should('not.exist')
        cy.contains('Resumo Mensal').should('not.exist')
        cy.contains('Sair').should('not.exist')
    })

    it('Não deve acessar área restrita após logout', () => {
        // Realiza o logout
        LogoutPage.fazerLogout()
        
        // Valida que está na página de login, 
        // a rota está logout por que é bug da aplicação, quando desloga, ela redireciona para a rota /logout
        cy.url().should('include', '/logout')
        
        // Tenta acessar uma área restrita diretamente
        cy.visit('/')
        
        // Deve redirecionar para login
        cy.url().should('include', '/login')

    })
})

