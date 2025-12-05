import 'reflect-metadata';
import { createServer } from './app';
import { initializeDatabase } from './modules/db';

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await initializeDatabase();
    const app = createServer();

    app.listen(PORT, () => {
      console.log(`Backend listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
