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
        switch(statementError.code) {
          case '42P07': // Tabla ya existe
            console.warn(`Tabla ya existe: ${statementError.message}`);
            break;
          case '23505': // Duplicado de clave única
            console.warn(`Conflicto en inserción: ${statementError.detail}`);
            break;
          case '42P10': // No hay restricción única para ON CONFLICT
            console.warn(`No hay restricción única para ON CONFLICT: ${statementError.message}`);
            break;
          case '25P02': // Transacción abortada
            console.warn(`Transacción abortada: ${statementError.message}`);
            break;
          default:
            console.error('Error desconocido:', statementError);
        }
        // Continúa con la siguiente consulta
        continue;
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