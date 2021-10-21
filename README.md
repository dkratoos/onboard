<h1 align="center">API de Exemplo 👋</h1>

> Boilerplate com exemplos e tooling preconfigurado para garantir um projeto de qualidade!

## Primeiros passos

1. Você precisará de Node.js 12 instalado e do PostgreSQL 10 ou 11.
2. Instale dependências com `npm ci`.
3. Copie o arquivo `.env.example` para o arquivo `.env`.
4. Se você tiver um PostgreSQL local instalado, crie um database vazio nele e configure o `.env` com os acessos.
5. Se não tiver, utilize `npm run postgres:start` e `npm run database:create` para criar e configurar um com Docker.
6. Execute o projeto localmente com `npm run dev`.
7. Execute a suite de testes do projeto com `npm test`.

## Migrations

1. Migrações podem ser executadas no ambiente local com `npm run migration:run`. Isso é feito automaticamente pelo `npm run dev`.
2. Caso queira reverter a última migração executada em no ambiente local, rode `npm run migration:revert`.
3. Para criar novas migrações primeiramente execute as migrações no ambiente local, então altere os arquivos `src/models` conforme necessário. Por fim execute `npm run migration:generate name-da-migracao`.
4. Revise o arquivo gerado, por vezes ele pode precisar de intervenção manual para evitar que remova uma coluna desnecessariamente. Não tem problema edita-lo. Lembre de manter a migração `down` consistente com a `up`.
5. Caso queira realizar uma migração que não envolva mudança no model (insert de dados, por exemplo), utilize `npm run migration:create nome-da-migracao`.
6. **Importante**: Não altere um arquivo de migração já comitado.

## Antes do commit

1. Verifique se o ESLint ou o Prettier apresentam algum problema. Você pode listar os problemas use `npm run eslint:check`. Para corrigir automaticamente alguns deles use `npm run eslint:fix`. Note que o Prettier está embutido dentro do ESLint.
2. Gere os arquivos locais do sdkgen com `npm run sdkgen`.
3. Gere os arquivos de JSON Schema da tipagem de integrações com `npm run jsonschema`.
4. Execute os testes e garanta que estão passando `npm test`. Verifique se a cobertura de teste está satisfatória.

## Padrão de commit

> **ATENÇÃO:** mensagens de commit que não estejam de acordo com os critérios abaixo irão impedir a criação do commit.

Os commits devem ser semânticos e seguir o seguinte padrão:

```
feat(payment): add currency verification for credit card transactions
^--^ ^--*--^   ^------------^ -> Mensagem no imperativo
 *      *-> [optional]: Escopo do commit
 *-> Tipos: chore, docs, feat, fix, merge, perf, refact, style, test, or wip.
```

Os tipos disponíveis são:

- `chore`: se refere à alguma implementação que não impacta diretamente o usuário. Por exemplo, uma mudança no `.gitlab-ci.yml`.
- `docs`: se refere à alterações na documentação
- `feat`: se refere à implementação de features
- `fix`: se refere à uma correção
- `refactor`: se refere à refatoração de uma feature previamente implementada
- `style`: se refere à uma mudança estética no código. Por exemplo: alterar a indentação de espaço para tab
- `test`: se refere à uma implementação de teste

O escopo não é obrigatório e se refere à uma informação contextual para ajudar na compreensão da mensagem e da área afetada.

Os commits devem ser atômicos e representar uma mudança unitária na aplicação. Sendo assim, a implementação de uma nova funcionalidade provavelmente envolverá no mínimo: `feat`, `test` e possivelmente `chore` e `docs`.

É recomendado que antes de abrir o merge request seja feita a remoção de commits inúteis. Uma forma fácil de fazer isso é utilizando `rebase -i`.

Observação: as mensagens de commits devem ter no máximo 100 caracteres por linha.

## Code review

> **Atenção:** Somente será feito o merge de MRs revisados por múltiplas pessoas. Esse controle será feito através da verificação do número de reações ao MR que deverá ter ao menos **dois** 👍.

Todo código deverá passar por Code Review através da feature "Merge Request (MR)" do Gitlab durante o processo de merge da branch de "feature" para a branch alvo.

É recomendado que durante o desenvolvimento da feature seja criado um Merge Request de WIP (trabalho em progresso) para permitir coletar feedbacks ao longo do processo. Isso ocorre quando o título da MR é prefixado de `WIP:`.

Os merge requests devem conter uma breve descrição da feature sendo implementada para facilitar uma rápida contextualização.

O objetivo principal do MR é manter a codebase o mais suntentável possível. Dito isso, a regra de ouro é não aceitar coisas que diminuam a qualidade geral do código. Itens a serem observados são:

- Estrutura
- Estilo
- Lógica
- Performance
- Cobertura de teste
- Legibilidade
- Funcionamento
- Corretude

Entenda mais sobre como fazer e revisar um MR no manual do Google: https://google.github.io/eng-practices/

## Padrão de nomenclatura

| Padrão     | Definição              | Exemplo                 |
| ---------- | ---------------------- | ----------------------- |
| Diretórios | Kebab Case + Plural    | samples, sample-files   |
| Controller | Camel Case + Singular  | user.ts, userCompany.ts |
| Model      | Pascal Case + Singular | User.ts, UserCompany.ts |
| Tabelas    | Snake Case + Plural    | users, user_companies   |
| Colunas    | Snake Case + Singular  | id, user_id             |
| Enum       | Maiúsculo              | TED, DOC                |
| Migrations | Snake Case + Singular  | create-user             |
