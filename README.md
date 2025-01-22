# **Restaurant - Dashboard**

Este projeto é uma aplicação web para gerir e visualizar informações sobre restaurantes. A aplicação inclui funcionalidades como gráficos dinâmicos, métricas interativas e operações CRUD (Create, Read, Update, Delete) para restaurantes.

## **Funcionalidades**

- **Dashboard Interativo**
  - Visualização de métricas como:
    - Total de restaurantes.
    - Restaurantes abertos e fechados.
  - Gráficos dinâmicos:
    - Distribuição de cozinhas (pie chart).
    - Tráfego ao longo do tempo (bar chart).
  - Lista de restaurantes recentes.

- **CRUD**
  - Adicionar novos restaurantes diretamente na tabela.
  - Editar informações dos restaurantes em linha (inline editing).
  - Confirmar e apagar restaurantes.

- **Autenticação**
  - Verificação de autenticação do utilizador (com base em localStorage).
  - Logout com confirmação por modal.

## **Pré-requisitos**

- Node.js (v16 ou superior).
- Gestor de pacotes (npm ou yarn).
- **JSON Server** (para simular uma API REST).

### Instalar JSON Server

```
npm install -g json-server
```

## **Configuração**

### 1. Clone o repositório

```bash
git clone https://github.com/seu-user/vuejs-course.git
cd app
```

### 2. Instale as dependências

```
npm i
```

### 3. Inicie o servidor JSON

No terminal, execute:

```
json-server --watch db.json --port 3000
```

Certifique-se de que o ficheiro `db.json` contém os dados iniciais dos restaurantes, como:

```json
[
  {
    "id": "1",
    "name": "The Gourmet Kitchen",
    "address": "123 Main Street, New York, NY",
    "rating": 4.5,
    "cuisine": "Italian",
    "priceRange": "$$$",
    "isOpen": true,
    "contactNumber": "+1 555-1234",
    "tags": ["Fine Dining", "Romantic", "Reservation Required"]
  }
]
```

### 4. Inicie a aplicação

```
npm run dev
```

Abra no browser: [http://localhost:5173](http://localhost:5173).

## **Tecnologias Utilizadas**

- **Frontend:**
  - [Vue.js 3](https://vuejs.org/) - Framework JavaScript.
  - [Ant Design Vue](https://antdv.com/) - Library de componentes UI.
  - [ECharts](https://echarts.apache.org/en/index.html) - Library para gráficos dinâmicos.

- **Backend Simulado:**
  - [JSON Server](https://www.npmjs.com/package/json-server) - Servidor para simulação de API REST.

## **Estrutura do Projeto**

```
├── public/             # Arquivos públicos
├── src/
│   ├── assets/         # Recursos estáticos (imagens, logos)
│   ├── components/     # Componentes reutilizáveis
│   │   └── Header.vue  # Cabeçalho com navegação
│   ├── router/         # Configurações de rotas
│   ├── styles/         # Estilos globais
│   ├── views/          # Páginas principais
│   │   ├── Home.vue    # Dashboard
│   │   ├── Restaurants.vue # Gestão de restaurantes
│   ├── App.vue         # Componente principal
│   ├── main.js         # Entrada da aplicacao
│   ├── db/             
│   │   ├── db.json     # Base de dados para JSON Server
├── package.json        # Dependências e scripts
```

## **Funcionalidades Futuras**

- **Filtros Avançados:**
  - Filtrar restaurantes por tags, tipo de cozinha ou intervalo de avaliações.
- **Relatórios:**
  - Exportação de gráficos e tabelas para PDF.
- **Autenticação Completa:**
  - Login e logout com suporte a tokens JWT.

## Contribuição
Feito com 💜 e com ☕ por:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/heyliceeee">
        <img src="https://github.com/heyliceeee.png" width="100px;" alt="Foto da Alice Dias no GitHub"/><br>
        <sub>
          <b>Alice Dias</b>
        </sub>
      </a>
    </td>
  </tr>
</table>
