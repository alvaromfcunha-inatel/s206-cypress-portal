/// <reference types="cypress"/>

describe('login via matricula', function() {

  before(() => {
    cy.fixture('login').then(data => {
      this.login = data;
    })
    cy.fixture('urls').then(data => {
      this.urls = data;
    })
  })

  it('valid login', () => {
    cy.visit(this.urls.portal)

    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_dropSubCurso').select(this.login.curso)
    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_tbMatricula').type(this.login.matricula)
    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_Password').type(this.login.matPassword)

    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_LoginButton').click()

    cy.get('#ctl00_Corpo_UCMenuAcademico1_lblDadoAcademico').should('contain.text', this.login.matricula)
  })

  it('invalid login - wrong password', () => {
    // Previne teste falhar quando a aplicação/site gerar exceção.
    cy.on('uncaught:exception', () => {
      return false
    })

    cy.visit(this.urls.portal)

    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_dropSubCurso').select(this.login.curso)
    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_tbMatricula').type(this.login.matricula)
    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_Password').type('wrongPassword')

    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_LoginButton').click()

    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(6) > td:nth-child(1)')
      .should('contain.text', 'Sua tentativa de logar no sistema não obteve êxito. Tente novamente.')
  })
})