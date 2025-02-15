const fs = require('node:fs/promises');

const executeSQL = async (pool, path) => {
  const client = await pool.connect();
  try {
    // Lee archivo SQL
    const sqlFile = await fs.readFile(path, 'utf8');
    // Separa archivo en array de consultas
    const sqlStatements = sqlFile
      .split(';')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    
    // Ejecuta transaccion SQL
    await client.query('BEGIN');
    
    for (const statement of sqlStatements) {
      try {
        await client.query(statement);
      } catch (statementError) {
        // Manejo específico de errores
        if (statementError.code === '23505') {
          // Duplicado de clave única
          console.warn(`Conflicto en inserción: ${statementError.detail}`);
          // Continúa con la siguiente consulta
          continue;
        } else {
          // Otros errores se lanzan
          throw statementError;
        }
      }
    }
    
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error con archivo SQL:', err);
    throw err;
  } finally {
    client.release();
  }
};

module.exports = { executeSQL };