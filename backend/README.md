# BanhoTosa Backend

Este é o backend da aplicação BanhoTosa, responsável por fornecer uma API RESTful para o gerenciamento de clientes, pets, atendimentos, serviços e caixa de um petshop.

## Tecnologias

- .NET (ASP.NET Core)
- Banco de dados relacional (ex: SQL Server, PostgreSQL, MySQL)
- API RESTful com respostas em JSON

---

## Endpoints e Funcionalidades

### Clientes

- **GET `/api/clientes`**
  - Lista todos os clientes, incluindo seus pets.
- **GET `/api/clientes/{id}`**
  - Retorna os dados de um cliente específico.
- **POST `/api/clientes`**
  - Cria um novo cliente.
  - Campos: `nome` (string), `telefone` (string)
- **PUT `/api/clientes/{id}`**
  - Atualiza os dados de um cliente.
- **DELETE `/api/clientes/{id}`**
  - Exclui um cliente (só é permitido se não houver pets vinculados).
- **GET `/api/clientes/total`**
  - Retorna o total de clientes cadastrados.

---

### Pets

- **GET `/api/pet`**
  - Lista todos os pets, incluindo o cliente (dono).
- **GET `/api/pet/{id}`**
  - Retorna os dados de um pet específico.
- **POST `/api/pet`**
  - Cria um novo pet.
  - Campos: `nome` (string), `raca` (string, opcional), `clienteID` (int)
- **PUT `/api/pet/{id}`**
  - Atualiza os dados de um pet.
- **DELETE `/api/pet/{id}`**
  - Exclui um pet (só é permitido se não houver atendimentos vinculados).
- **GET `/api/pet/total`**
  - Retorna o total de pets cadastrados.

---

### Atendimentos

- **GET `/api/atendimentos`**
  - Lista todos os atendimentos.
- **GET `/api/atendimentos/{id}`**
  - Retorna os dados de um atendimento específico.
- **POST `/api/atendimentos`**
  - Cria um novo atendimento.
  - Campos: `petID` (int), `servicoID` (int), `observacao` (string, opcional), `status` (int, default 0)
  - `data` e `hora` são gerados automaticamente pelo backend.
- **PUT `/api/atendimentos/{id}`**
  - Atualiza os dados de um atendimento (inclusive status).
- **DELETE `/api/atendimentos/{id}`**
  - Exclui um atendimento.
- **GET `/api/atendimentos/recentes`**
  - Retorna os últimos atendimentos cadastrados.
- **GET `/api/atendimentos?petID={id}`**
  - Lista todos os atendimentos de um pet específico.

---

### Serviços

- **GET `/api/servicos`**
  - Lista todos os serviços.
- **GET `/api/servicos/{id}`**
  - Retorna os dados de um serviço específico.
- **POST `/api/servicos`**
  - Cria um novo serviço.
  - Campos: `tipo` (string), `preco` (decimal)
- **PUT `/api/servicos/{id}`**
  - Atualiza os dados de um serviço.
- **DELETE `/api/servicos/{id}`**
  - Exclui um serviço (só é permitido se não houver atendimentos vinculados).

---

## Caixa

- **GET `/api/caixa`**

  - Lista todos os lançamentos do caixa.

- **GET `/api/caixa/{id}`**

  - Retorna os dados de um lançamento específico do caixa.

- **GET `/api/caixa/total`**

  - Retorna o valor total do caixa (soma das entradas menos as saídas).

- **POST `/api/caixa`**

  - Cria um novo lançamento no caixa.
  - Campos: `Valor` (decimal, obrigatório e sempre positivo), `Tipo` (Entrada/Saída), outros campos conforme o modelo.

- **PUT `/api/caixa/{id}`**

  - Atualiza um lançamento do caixa existente.
  - Campos: `Valor` (decimal, obrigatório e sempre positivo), `Tipo` (Entrada/Saída), outros campos conforme o modelo.

- **DELETE `/api/caixa/{id}`**
  - Exclui um lançamento

---

## Observações

- Todas as respostas são em JSON.
- As validações de negócio (exclusão protegida, status, etc) são feitas no backend.
- Os endpoints podem ser protegidos por autenticação/autorização conforme necessidade do projeto.

---

## Como rodar

1. Configure o banco de dados e as variáveis de ambiente.
2. Compile e rode o backend:
   ```bash
   dotnet build
   dotnet run
   ```
3. O backend ficará disponível na porta configurada (ex: http://localhost:5029).

---

## Contato

Para dúvidas, sugestões ou problemas, consulte o código-fonte ou abra uma issue.
