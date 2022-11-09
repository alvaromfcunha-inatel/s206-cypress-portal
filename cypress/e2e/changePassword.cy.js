/// <reference types="cypress"/>

describe('change password', function() {

  before(() => {
    cy.fixture('login').then(data => {
      this.login = data;
    })
    cy.fixture('urls').then(data => {
      this.urls = data;
    })
  })

  it('valid password change', () => {
    cy.visit(this.urls.portal)

    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_dropSubCurso').select(this.login.curso)
    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_tbMatricula').type(this.login.matricula)
    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_Password').type(this.login.matPassword)

    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_LoginButton').click()

    cy.get('#ctl00_Corpo_UCMenuAcademico1_lblDadoAcademico').should('contain.text', this.login.matricula)

    cy.get('#ctl00_Menu1n6 > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1)').trigger('mouseover')
    cy.get('#ctl00_Menu1n79 > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1)').click()

    cy.get('#ctl00_Corpo_ChangePassword1_ChangePasswordContainerID_CurrentPassword').type(this.login.matPassword)
    cy.get('#ctl00_Corpo_ChangePassword1_ChangePasswordContainerID_NewPassword').type(this.login.matPassword)
    cy.get('#ctl00_Corpo_ChangePassword1_ChangePasswordContainerID_ConfirmNewPassword').type(this.login.matPassword)

    cy.get('#ctl00_Corpo_ChangePassword1_ChangePasswordContainerID_ChangePasswordPushButton').click()

    cy.get('#ctl00_Corpo_ChangePassword1 > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1)')
      .should('contain.text', 'Sua senha foi trocada')
  })

  it('invalid password change - confirm password not identical to new password', () => {
    cy.visit(this.urls.portal)

    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_dropSubCurso').select(this.login.curso)
    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_tbMatricula').type(this.login.matricula)
    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_Password').type(this.login.matPassword)

    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_LoginButton').click()

    cy.get('#ctl00_Corpo_UCMenuAcademico1_lblDadoAcademico').should('contain.text', this.login.matricula)

    cy.get('#ctl00_Menu1n6 > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1)').trigger('mouseover')
    cy.get('#ctl00_Menu1n79 > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1)').click()

    cy.get('#ctl00_Corpo_ChangePassword1_ChangePasswordContainerID_CurrentPassword').type(this.login.matPassword)
    cy.get('#ctl00_Corpo_ChangePassword1_ChangePasswordContainerID_NewPassword').type(this.login.matPassword)
    cy.get('#ctl00_Corpo_ChangePassword1_ChangePasswordContainerID_ConfirmNewPassword').type('wrongPassword')

    cy.get('#ctl00_Corpo_ChangePassword1_ChangePasswordContainerID_ChangePasswordPushButton').click()

    cy.get('#ctl00_Corpo_ChangePassword1_ChangePasswordContainerID_NewPasswordCompare')
      .should('contain.text', 'A Nova Senha e a Confirmação da Nova Senha devem ser iguais.')
  })
})