const schemas = {
  Error: {
    type: 'object',
    properties: {
      message: { type: 'string', example: 'Mensaje de error' },
    },
  },
  
  User: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      email: {
        type: 'string',
        format: 'email',
        example: 'johnsmith@mail.com',
      },
      password: { type: 'string', format: 'password', example: 'hunter2' },
      nombre: { type: 'string', example: 'John' },
      apellido: { type: 'string', example: 'Smith' },
      direccion: { type: 'string', example: 'Fake Street 123' },
      telefono: { type: 'string', example: '+56912345678' },
      rol: { type: 'string', example: 'cliente' },
    },
  },
};

module.exports = schemas;
