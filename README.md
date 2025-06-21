# BanhoTosa - Sistema de Gestão para Petshops

Este projeto é composto por dois módulos principais:

- **Backend**: API RESTful desenvolvida em .NET para gerenciamento de clientes, pets, atendimentos, serviços e caixa.
- **Frontend**: Interface web em React, responsiva e com tema escuro, para uso prático em petshops.

---

## 📦 Backend

### Tecnologias do Backend

- .NET (ASP.NET Core)
- Banco de dados relacional (PostgreSQL, SQL Server, etc)
- API RESTful com respostas em JSON

### Funcionalidades do Backend

- **Clientes**

  - CRUD completo
  - Cada cliente pode ter vários pets
  - Não permite excluir cliente com pets vinculados

- **Pets**

  - CRUD completo
  - Cada pet pertence a um cliente
  - Não permite excluir pet com atendimentos vinculados

- **Atendimentos**

  - CRUD completo
  - Cada atendimento está vinculado a um pet e a um serviço
  - Campos: data, hora, observação, status (Pendente, Concluído, Cancelado)
  - Data e hora são gerados automaticamente ao criar
  - Não permite excluir serviço/pet em uso em atendimentos

- **Serviços**

  - CRUD completo
  - Cada serviço tem tipo e preço
  - Não permite excluir serviço em uso em atendimentos

- **Caixa**

  - CRUD de lançamentos (entrada/saída)
  - Endpoint para consultar o total do caixa (soma dos valores dos atendimentos concluídos)

- **Endpoints de apoio**
  - Listagem de totais (clientes, pets, caixa)
  - Listagem de últimos atendimentos
  - Listagem de pets de um cliente

### Observações

- Todas as validações de negócio (exclusão protegida, status, etc) são feitas no backend.
- API retorna dados em JSON.
- Endpoints seguem padrão REST.

---

## 💻 Frontend

### Tecnologias do Frontend

- React
- CSS customizado (mobile first, tema escuro)
- Consome a API REST do backend

### Funcionalidades do Frontend

- **Navbar**

  - Navegação fixa, responsiva, links para todas as páginas principais

- **Home (Dashboard)**

  - Cards com total de clientes, pets e caixa
  - Tabela dos últimos atendimentos

- **Clientes**

  - Lista todos os clientes, mostra telefone e pets
  - Criar, editar e excluir clientes (exclusão só se não houver pets)
  - Formulário em modal

- **Pets**

  - Lista todos os pets, mostra raça e dono
  - Criar, editar e excluir pets (exclusão só se não houver atendimentos)
  - Seleção do dono via dropdown

- **Atendimentos**

  - Lista todos os atendimentos, mostra pet, serviço, data, hora, status e observação
  - Criar (data/hora preenchidos automaticamente), editar (permite alterar status)
  - Status exibido como texto (Pendente, Concluído, Cancelado)

- **Serviços**

  - Lista todos os serviços, mostra tipo e preço
  - Criar, editar e excluir serviços (exclusão só se não houver atendimentos)

- **Caixa**
  - Lista lançamentos e mostra total do caixa

### Design

- Mobile first e responsivo
- Tema escuro, fonte IBM Plex Sans
- Modais para formulários
- Feedback visual para ações e validações

### Integração

- Todas as operações são feitas via requisições HTTP para a API do backend
- Endpoints configurados para rodar localmente (ajuste IPs/URLs conforme necessário)

---

## 🚀 Como rodar o projeto

### Backend

1. Configure o banco de dados e as variáveis de ambiente.
2. Compile e rode o backend:
3. ```bash
   dotnet build
   dotnet run
   ```
4. O backend ficará disponível na porta configurada (ex: http://localhost:5029).

### Frontend

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o frontend:
   ```bash
   npm run dev
   ```
3. Acesse via navegador (ex: <http://localhost:5173>).

---

## 📚 Observações Finais

- O sistema foi desenvolvido para facilitar o dia a dia de petshops, com foco em usabilidade, praticidade e segurança dos dados.
- Para dúvidas ou sugestões, consulte o código-fonte ou abra
