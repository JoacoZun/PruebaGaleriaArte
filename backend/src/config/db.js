const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Necesario para Render
  }
});

const initializeDB = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Conectado a la base de datos PostgreSQL en Render');
    client.release();
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
  }
};

module.exports = { pool, initializeDB };
