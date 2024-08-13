# Documentação da API

## Cadastro de Sugestões

**Endpoint:** `POST /api/suggestions`

**Descrição:** Cadastra uma nova sugestão.

**Parâmetros:**
- `errorCode` (string, obrigatório): Código de erro (6 dígitos).
- `suggestionText` (string, obrigatório): Texto da sugestão.

**Resposta de Sucesso:**
- `201 Created`
- Corpo: `{ "message": "Sugestão cadastrada com sucesso!" }`

**Resposta de Erro:**
- `400 Bad Request`: Campos obrigatórios ausentes.
- `500 Internal Server Error`: Erro ao cadastrar sugestão.

## Consulta de Sugestões

**Endpoint:** `GET /api/suggestions/:errorCode`

**Descrição:** Consulta sugestões pelo código de erro.

**Parâmetros:**
- `errorCode` (string, obrigatório): Código de erro (6 dígitos).

**Resposta de Sucesso:**
- `200 OK`
- Corpo: `[ { "errorCode": "123456", "suggestionText": "Verifique a conexão com o servidor." } ]`

**Resposta de Erro:**
- `404 Not Found`: Nenhuma sugestão encontrada.
- `500 Internal Server Error`: Erro ao consultar sugestões.

## Cadastro de Avaliações

**Endpoint:** `POST /api/evaluations`

**Descrição:** Cadastra uma nova avaliação.

**Parâmetros:**
- `errorCode` (string, obrigatório): Código de erro (6 dígitos).
- `suggestionText` (string, obrigatório): Texto da sugestão.
- `date` (string, obrigatório): Data da avaliação.
- `clientCode` (string, obrigatório): Código do cliente (6 dígitos).
- `evaluation` (string, obrigatório): Avaliação (positiva ou negativa).

**Resposta de Sucesso:**
- `201 Created`
- Corpo: `{ "message": "Avaliação cadastrada com sucesso!" }`

**Resposta de Erro:**
- `400 Bad Request`: Campos obrigatórios ausentes.
- `500 Internal Server Error`: Erro ao cadastrar avaliação.

## Consulta de Avaliações e Cálculo de Médias

**Endpoint:** `GET /api/evaluations/average`

**Descrição:** Obtém avaliações e calcula médias.

**Resposta de Sucesso:**
- `200 OK`
- Corpo: `{ "averageTotal": 75, "averageBySuggestion": [ { "suggestion": "Verifique a conexão com o servidor.", "average": 80 } ] }`

**Resposta de Erro:**
- `404 Not Found`: Nenhuma avaliação encontrada.
- `500 Internal Server Error`: Erro ao obter avaliações.

## Consulta de Avaliações por Período

**Endpoint:** `GET /api/evaluations`

**Descrição:** Consulta avaliações por período.

**Parâmetros:**
- `startDate` (string, obrigatório): Data de início.
- `endDate` (string, obrigatório): Data de fim.

**Resposta de Sucesso:**
- `200 OK`
- Corpo: `[ { "errorCode": "123456", "suggestionText": "Verifique a conexão com o servidor.", "date": "2024-08-13T00:00:00Z", "clientCode": "654321", "evaluation": "positive" } ]`

**Resposta de Erro:**
- `400 Bad Request`: Datas de início e fim ausentes.
- `500 Internal Server Error`: Erro ao obter avaliações por período.
