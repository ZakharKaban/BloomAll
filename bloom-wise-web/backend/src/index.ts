import { createServer } from './app';
const PORT = process.env.PORT || 4000;

const app = createServer();

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
