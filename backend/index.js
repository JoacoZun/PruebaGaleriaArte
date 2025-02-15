const app = require('./src/app.js');
const { initializeDB, pool } = require('./src/config/db.js');

const startApp = async () => {
  const PORT = process.env.PORT || 3000;

  try {
    await initializeDB(pool);
    console.log('✅ Base de datos inicializada correctamente.');
  } catch (error) {
    console.error('❌ Error al inicializar la base de datos:', error);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor disponible en http://0.0.0.0:${PORT}`);
  });
};

startApp();
