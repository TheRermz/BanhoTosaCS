# BanhoTosa Frontend

Este projeto é o frontend de um sistema de gestão para petshops, desenvolvido em React, com foco em controle de clientes, pets, atendimentos, serviços e caixa.

## Funcionalidades

### 1. Navbar

- Navegação fixa no topo, responsiva (mobile first).
- Links para Home, Clientes, Pets, Atendimentos e Serviços.

### 2. Home (Dashboard)

- Exibe cards com o total de clientes, pets e valor do caixa (dados vindos da API).
- Mostra uma tabela com os últimos atendimentos, responsiva para mobile.

### 3. Clientes

- Lista todos os clientes cadastrados, mostrando nome, telefone e pets de cada cliente.
- Botão para criar novo cliente (abre modal com formulário).
- Botão para editar cliente (abre modal com formulário preenchido).
- Botão para excluir cliente (só permite se não houver pets vinculados, com confirmação).
- Validação de formulário e feedbacks visuais.

### 4. Pets

- Lista todos os pets cadastrados, mostrando nome, raça e dono.
- Botão para criar novo pet (abre modal com formulário).
- Botão para editar pet (abre modal com formulário preenchido).
- Botão para excluir pet (só permite se não houver atendimentos vinculados, com confirmação).
- Seleção do dono do pet a partir dos clientes cadastrados.

### 5. Atendimentos

- Lista todos os atendimentos, mostrando pet, serviço, data, hora, status e observação.
- Botão para criar novo atendimento (abre modal com formulário).
  - Data e hora são preenchidos automaticamente com a data/hora local e não podem ser alterados na criação.
- Botão para editar atendimento (abre modal com formulário preenchido, permite alterar status, observação, pet e serviço).
- Status exibido como texto (Pendente, Concluído, Cancelado) conforme enum do backend.

### 6. Serviços

- Lista todos os serviços cadastrados, mostrando tipo e preço.
- Botão para criar novo serviço (abre modal com formulário).
- Botão para editar serviço (abre modal com formulário preenchido).
- Botão para excluir serviço (só permite se não houver atendimentos vinculados, com confirmação).

## Design

- Mobile first e responsivo.
- Tema escuro, com fonte IBM Plex Sans.
- Modais para formulários de criação/edição.
- Feedback visual para ações e validações.

## Integração com Backend

- Todas as operações (listar, criar, editar, excluir) são feitas via requisições HTTP para a API REST do backend.
- Endpoints configurados para rodar localmente (ajuste os IPs/URLs conforme necessário).

## Como rodar

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o frontend:
   ```bash
   npm run dev
   ```
3. Certifique-se de que o backend está rodando e acessível nos endpoints configurados.

---

Desenvolvido para facilitar o controle de petshops, com foco em usabilidade, praticidade e responsividade.
