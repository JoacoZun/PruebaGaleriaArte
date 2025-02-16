const app = require('./src/app.js');
const { initializeDB, pool } = require('./src/config/db.js');

const startApp = async () => {
  const PORT = process.env.PORT || 3000;
  await initializeDB(pool);
  app.listen(PORT, () => {
    console.log(`Servidor disponible en http://localhost:${PORT}`);
  });
};

startApp();

