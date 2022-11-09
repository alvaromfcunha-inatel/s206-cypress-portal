/// <reference types="cypress"/>

describe('login via email', function() {
  before(() => {
    cy.fixture('login').then(data => {
      this.login = data;
    })
    cy.fixture('urls').then(data => {
      this.urls = data;
    })
  })

  it('valid login', () => {
    // Previne teste falhar quando a aplicação/site gerar exceção.
    cy.on('uncaught:exception', () => {
      return false
    })

    cy.visit(this.urls.portal)

    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_dropTipoAutenticacao').select('Por Email do Inatel')

    
    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_tbEmailAluno').type(this.login.email)
    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_Password').type(this.login.emailPassword)
    
    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_LoginButton').click()

    cy.get('#ctl00_Corpo_UCMenuAcademico1_lblDadoAcademico').should('contain.text', this.login.matricula)
  })

  it('invalid login - wrong password', () => {
    // Previne teste falhar quando a aplicação/site gerar exceção.
    cy.on('uncaught:exception', () => {
      return false
    })

    cy.visit(this.urls.portal)

    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_dropTipoAutenticacao').select('Por Email do Inatel')

    
    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_tbEmailAluno').type(this.login.email)
    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_Password').type('wrongPassword')
    
    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_LoginButton').click()

    cy.get('#ctl00_Corpo_UCMenuAcademico1_lblDadoAcademico').should('contain.text', this.login.matricula)
  })
})