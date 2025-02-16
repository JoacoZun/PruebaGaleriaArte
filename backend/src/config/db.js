const { Pool } = require('pg');
const path = require('node:path');
const { executeSQL } = require('./executeSQL');
const { createDatabase } = require('./createDatabase');
require('dotenv').config();

const isTestEnv = process.env.NODE_ENV === 'test';

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: isTestEnv ? process.env.PGTESTDATABASE : process.env.PGDATABASE, 
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

const initializeDB = async () => {
  try {
    console.log('Inicializando base de datos...');
    const schemaPath = path.resolve(__dirname, '../db/schema.sql');
    const seedPath = path.resolve(__dirname, '../db/seed.sql');

    await createDatabase(process.env.PGTESTDATABASE); 
    await executeSQL(pool, schemaPath);
    await executeSQL(pool, seedPath);

    console.log('Base de datos inicializada correctamente.');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    throw error;
  }
};

module.exports = { pool, initializeDB };
