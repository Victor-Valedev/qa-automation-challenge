## Projeto de automação de testes

Este repositório contém a automação E2E da aplicação Seu Barriga, construída com Cypress. O projeto executa cenários de ponta a ponta (login, contas, movimentações, resumo e logout), gera relatórios Mochawesome e publica automaticamente o relatório no GitHub Pages a partir da pipeline diária.

## Requisitos

- Node.js LTS (recomendado 18+)
- npm (vem junto com o Node)

Verifique as versões:

```bash
node -v
npm -v
```

## Instalação

Instale as dependências do projeto:

```bash
npm ci
```

Isso instalará, entre outras, as bibliotecas:
- `cypress`: framework de testes E2E
- `@faker-js/faker`: geração de dados dinâmicos
- `mochawesome`, `mochawesome-merge`, `mochawesome-report-generator`: geração e agregação de relatórios

## Como instalar o Cypress (opcional)

O Cypress já está listado como devDependency. Após `npm ci`, ele estará disponível via `npx`.

Para abrir o App do Cypress pela primeira vez (útil para validar o ambiente):

```bash
npx cypress open
```

## Como rodar os testes

- Executar em modo headless (CI):

```bash
npx cypress run
```

- Abrir a UI interativa do Cypress (modo dev):

```bash
npx cypress open
```

- Executar especificando o navegador (ex.: Chrome):

```bash
npm run cy:run:chrome
```

Scripts disponíveis (definidos em `package.json`):

```bash
npm run cy:open        # Abre a UI do Cypress
npm run cy:run         # Executa em headless (electron por padrão)
npm run cy:run:chrome  # Executa headless no Chrome
```

## Como gerar o relatório Mochawesome

Durante a execução, os resultados são gravados em `mochawesome-report/*.json`. Para mesclar e gerar o HTML agregando os testes executados:

```bash
npm run cy:report
```

Esse script realiza:
- Merge dos JSON: `mochawesome-merge` → `mochawesome.json`
- Geração do HTML: `mochawesome-report-generator` → diretório `mochawesome-html`

Ao final, abra o arquivo `mochawesome-html/index.html` no navegador.

## Execução diária e publicação automática (CI/CD)

- A pipeline do GitHub Actions executa os testes diariamente (cron) em ambiente headless.
- Após a execução, os relatórios Mochawesome são gerados e publicados automaticamente no GitHub Pages, permitindo o acesso ao histórico e evidências dos testes.

Observação: o workflow do GitHub Actions e a configuração do GitHub Pages devem estar presentes no repositório (ex.: workflow que roda `npx cypress run` e depois `npm run cy:report`, publicando o diretório `mochawesome-html`).

## Estrutura do projeto

```
cypress/
  e2e/
    01_login/
      login.cy.js
    02_contas/
      contas.cy.js
    03_movimentacoes/
      movimentacoes.cy.js
      resumo.cy.js
    04_logout/
      logout.cy.js
  fixtures/
    ultimo_usuario_criado.json
  support/
    commands.js
    e2e.js
    pages/
      CadastroPage.js
      ContasPage.js
      LoginPage.js
      LogoutPage.js
      MovimentacaoPage.js
      ResumoPage.js
cypress.config.js
package.json
```

Padrão adotado:
- Page Objects em `cypress/support/pages/*` para encapsular seletores e ações.
- Testes por domínio funcional em `cypress/e2e/*`.
- Dados e fixtures em `cypress/fixtures/*` (ex.: usuário mais recente).
- Comandos customizados em `cypress/support/commands.js` (ex.: `cy.loginApp`).

## Geração de dados com Faker

O projeto usa `@faker-js/faker` para criar dados dinâmicos (ex.: nomes de contas, descrições de movimentações). Isso ajuda a reduzir conflitos por duplicidade e torna os cenários mais próximos do mundo real.


## O vídeo de demonstração está hospedado no YouTube, clique na imagem para assistir!

[![Assista ao vídeo no YouTube](https://upload.wikimedia.org/wikipedia/commons/a/a4/Cypress.png)](https://youtu.be/iq-UAylivNQ)



## Dicas

- Se a execução em CI falhar por tempo de carregamento, verifique sincronizações (visibilidade de alertas, filtros por período, existência de tabelas) que já foram tratadas nos Page Objects.
- Para depurar localmente, rode com `npx cypress open` e utilize o time travel do Cypress.


