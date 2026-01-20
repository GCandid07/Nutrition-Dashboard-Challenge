# 🧪 Desafio Técnico — Frontend Engineer (Pleno/Sênior)

Bem-vindo! Este repositório é o ponto de partida para o seu desafio técnico.
Nós preparamos a estrutura base (Next.js, Tailwind, TypeScript) e uma **Mock API** funcional para que você possa focar em construir o Frontend.

## 🎯 Sua Missão

Você está trabalhando em um produto similar a um **Painel de Gestão Nutricional**.
Seu objetivo é construir a **Interface de Usuário** e conectá-la às Mock APIs existentes.

### O Ecossistema
A aplicação atende a três públicos distintos:
1.  **Nutricionistas**: Gerenciam seus clientes e planos alimentares.
2.  **Universidades**: Gerenciam cursos e estudantes.
3.  **Lojistas**: Vendem suplementos (contexto opcional).

Você deve implementar o dashboard para **Nutricionistas** e **Admins**.

---

## 🛠️ O que já está pronto?

Nós preparamos a parte chata para você:
- **Next.js 16+ (App Router)** configurado.
- **Tailwind CSS** instalado.
- **Mock Database & API**:
    - `src/lib/db.ts`: Banco em memória (reseta ao reiniciar o servidor).
    - `src/app/api/clients`: Endpoints para CRUD de Clientes.
    - `src/app/api/plans`: Endpoints para CRUD de Planos.
- **Schemas & Types**:
    - `src/schemas/*`: Schemas Zod para validação.
    - `src/types/*`: Interfaces TypeScript.

---

## 🚀 Requisitos (O que você precisa construir)

### 1. Autenticação (Mock)
- Crie uma **Página de Login** (`/login`).
- Implemente uma Store de Autenticação global (recomendamos **Zustand**, mas você pode usar o que preferir) para gerenciar:
    - Sessão do Usuário (Simulada!)
    - Permissões: `ADMIN` | `NUTRITIONIST` | `STUDENT`
- Proteja as rotas do dashboard (`/dashboard/*`).
    - *Dica:* Estudantes não devem ver o menu "Clientes".

### 2. Interface do Dashboard
- Crie um layout com **Sidebar** e **Header**.
- Use layouts aninhados do Next.js.

### 3. Funcionalidades (CRUD)
Conecte-se às Rotas de API fornecidas (`/api/*`) para implementar:

#### **Gestão de Clientes** (`/dashboard/clients`)
- Listar todos os clientes.
- Criar um novo cliente.
- Editar um cliente existente.
- Excluir um cliente.
- *Requisito:* Use **React Hook Form** + **Zod** para validação.

#### **Planos Alimentares** (`/dashboard/plans`)
- Listar planos alimentares.
- Criar/Editar/Excluir planos.
- Mostrar status (Rascunho/Ativo).

---

## 🧠 Critérios de Avaliação

Procuramos as seguintes qualidades:
1.  **Arquitetura**: Como você organiza seus componentes, hooks e services?
2.  **Qualidade de Código**: Seu código é legível, tipado e limpo?
3.  **UX/UI**: A interface é agradável? É responsiva?
4.  **Robustez**: Como você lida com estados de carregamento (loading) e erros da API?
5.  **Pensamento Crítico**: Você fez boas escolhas de trade-off?

## ▶️ Como Começar

1. **Faça um fork deste repositório**

2.  **Clone o repositório**:
    ```bash
    git clone https://github.com/GCandid07/Nutrition-Dashboard-Challenge.git
    ```

3.  **Instale as dependências**:
    ```bash
    npm install
    ```

4.  **Rode o projeto**:
    ```bash
    npm run dev
    ```

5.  **Explore a API**:
    Acesse `http://localhost:3000` para ver o briefing interativo e a documentação da API.

---

## 📝 Entregável

- Suba suas alterações em seu repositório git.
- Escreva um README mais claro explicando suas decisões.
- **Bônus/Diferencial:** Adicione Testes Unitários (Jest já está configurado!)

## 📅 Entrega

- Nos envie o link do seu repositório no prazo de 3-5 dias.

## 📞 Contato

- Email: thiago.rodrigues@ecowe.com.br

Boa sorte! 🚀
