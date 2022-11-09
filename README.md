# Testes de Interface - Portal Academico Inatel

## Casos de teste:
- Login por curso e matrícula;
  - Válido;
  - Senha errada.
- Login por email;
  - Válido;
  - Senha errada.
- Trocar senha do portal.
  - Válido;
  - Senha de confimação inálida.

## Como rodar?

### Ambiente:
- node v16.18.1
- npm 8.19.2

### Passo a passo:
- Entrar no diretório do repositório:
  ```
  cd s206-cypress-portal
  ```
- Instalar dependencias:
  ```
  npm i
  ```
- Alterar credencias de login em 'cypress/fixtures/login.json':
  ```json
  {
    "curso": "Engenharia dx Xxxxxxx",
    "matricula": "xxxx",
    "matPassword": "xxxx",
    "email": "xxxx@xxx.inatel.br",
    "emailPassword": "xxxx"
  }
  ```
- Rodar suite de testes:
  ```
  npx cypress run --reporter mochawesome
  ```