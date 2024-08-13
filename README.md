# Sistema de Gerenciamento de Soluções de Erros

## Descrição

Este projeto é um sistema de gerenciamento de soluções de erros. Ele permite o cadastro de sugestões de correção para erros, avaliação dessas sugestões e acompanhamento das avaliações.

## Funcionalidades

- Cadastro de sugestões de correção
- Consulta de sugestões por código de erro
- Cadastro de avaliações de sugestões
- Dashboard com avaliação média total e por sugestão
- Filtro de avaliações por período
- Atualização em tempo real
- Design responsivo

## Tecnologias Utilizadas

- Back-end: Node.js, TypeScript, Express, Mongoose, WebSocket
- Front-end: React, Axios
- Banco de Dados: MongoDB (MongoDB Atlas)

## Instalação

### Pré-requisitos

- Node.js instalado
- MongoDB Atlas já está conectado

### Passos para Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/hdias2310/alterdata-cirrus-matheus-ryuki.git

Instale as dependências do back-end:
cd backend
npm install

Compile o TypeScript:
npx tsc

Inicie o servidor:
node dist/server.js

Instale as dependências do front-end:
cd ../frontend
npm install

Inicie o front-end:
npm start

Acesse o sistema no navegador:
http://localhost:3001