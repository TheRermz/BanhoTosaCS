# BanhoTosa Frontend

Este é o frontend do sistema BanhoTosa, uma aplicação web desenvolvida para facilitar o gerenciamento de clientes, pets, atendimentos, serviços e caixa em petshops. O frontend foi projetado com foco em usabilidade, responsividade (mobile first) e integração total com o backend via API REST.

---

## 🚀 Tecnologias Utilizadas

- **React**: Biblioteca principal para construção da interface.
- **React Router**: Navegação entre páginas.
- **Fetch**: Consumo da API REST do backend.
- **CSS customizado**: Estilização própria, com abordagem mobile first e tema escuro.
- **IBM Plex Sans**: Fonte principal para melhor legibilidade.

---

## 💡 Funcionamento Geral

O frontend se comunica diretamente com o backend por meio de requisições HTTP (REST API). Todas as operações de cadastro, edição, exclusão e listagem são feitas consumindo os endpoints do backend.

### Principais Funcionalidades

- **Dashboard (Home)**

  - Exibe cards com totais de clientes, pets e caixa.
  - Mostra uma tabela com os últimos atendimentos realizados.

- **Clientes**

  - Lista todos os clientes cadastrados.
  - Permite cadastrar, editar e excluir clientes (exclusão apenas se não houver pets vinculados).
  - Exibe os pets de cada cliente.
  - Formulários em modais para melhor experiência.

- **Pets**

  - Lista todos os pets, mostrando raça e dono.
  - Permite cadastrar, editar e excluir pets (exclusão apenas se não houver atendimentos vinculados).
  - Seleção do dono via dropdown.

- **Atendimentos**

  - Lista todos os atendimentos, mostrando pet, serviço, data, hora, status e observação.
  - Permite cadastrar (data/hora automáticos), editar (alteração de status) e visualizar atendimentos.
  - Status exibido como texto (Pendente, Concluído, Cancelado).

- **Serviços**

  - Lista todos os serviços disponíveis, mostrando tipo e preço.
  - Permite cadastrar, editar e excluir serviços (exclusão apenas se não houver atendimentos vinculados).

- **Caixa**

  - Lista lançamentos de caixa e mostra o total calculado automaticamente.

- **Navegação**
  - Navbar fixa e responsiva, com links para todas as páginas principais.

---

## 🔗 Integração com o Backend

- Todas as operações CRUD (Create, Read, Update, Delete) são realizadas via requisições HTTP para a API do backend.
- O frontend espera respostas em JSON e trata erros/validações conforme retornos do backend.
- URLs e endpoints podem ser configurados conforme o ambiente (desenvolvimento ou produção).

---

## 📱 Design Mobile First

- **Responsividade**: O layout foi desenhado para funcionar perfeitamente em dispositivos móveis, tablets e desktops.
- **Tema escuro**: Interface com cores escuras para conforto visual e uso prolongado.
- **Componentes adaptáveis**: Cards, tabelas, formulários e modais se ajustam ao tamanho da tela.
- **Navegação simplificada**: Menus e botões grandes, fáceis de usar em telas pequenas.
- **Feedback visual**: Mensagens de sucesso, erro e validação são exibidas de forma clara e acessível.

---

## ⚙️ Como Rodar o Frontend

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Acesse a aplicação pelo navegador em `http://localhost:5173` (ou porta configurada).

---

## 📚 Observações

- Certifique-se de que o backend esteja rodando e acessível para o frontend funcionar corretamente.
- Para personalizar URLs da API, ajuste as variáveis de ambiente ou arquivos de configuração conforme necessário.
- O frontend foi desenvolvido para ser intuitivo e fácil de usar, mesmo em dispositivos móveis.

---
