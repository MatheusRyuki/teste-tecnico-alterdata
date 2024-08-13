import app from './app';
import { createServer } from 'http';
import { Server } from 'ws';

const PORT = process.env.PORT || 3000;
const server = createServer(app);
const wss = new Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export { wss };
