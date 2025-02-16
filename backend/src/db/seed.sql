INSERT INTO obras (nombre, autor, precio, img_url, descripcion, categoria, tecnica, alto, ancho)
SELECT * FROM (
  VALUES
    ('Reflejos del Alma', 'Sofía Morales', 1200.00, '/images/obra1.jpg', 'Un vibrante cuadro abstracto que refleja emociones profundas.', 'Pintura', 'Óleo sobre lienzo', 80, 60),
    ('Silencio Urbano', 'Javier López', 900.00, '/images/obra2.jpg', 'Una escena nocturna de la ciudad con un estilo minimalista.', 'Dibujo', 'Carboncillo sobre papel', 50, 70),
    ('Luz y Sombras', 'Carla Fernández', 1500.00, '/images/obra3.jpg', 'Un retrato que juega con el contraste entre luz y sombras.', 'Retrato', 'Óleo sobre madera', 90, 70),
    ('El Vuelo del Tiempo', 'Hugo Ramírez', 750.00, '/images/obra4.jpg', 'Un dibujo que captura el movimiento del tiempo a través de relojes.', 'Dibujo', 'Tinta sobre papel', 40, 60),
    ('Jardín de Sueños', 'Laura Gómez', 1400.00, '/images/obra5.jpg', 'Un paisaje surrealista lleno de colores y formas oníricas.', 'Pintura', 'Acrílico sobre lienzo', 100, 120)
) AS tmp (nombre, autor, precio, img_url, descripcion, categoria, tecnica, alto, ancho)
WHERE NOT EXISTS (SELECT 1 FROM obras WHERE nombre = tmp.nombre);

INSERT INTO users (email, password, rol, nombre, apellido, telefono, direccion)
SELECT * FROM (
  VALUES
    ('admin@mail.com', '$2a$10$WYbZqr4Star/Sk4regdxhuGIxNWu6MQaVRyHUfIEPv86MGr1MsXQe', 'administrador', 'Admin', 'Istrador', '+56988888888', 'Calle verdadera 987'),
    ('srajuanita@mail.com', '$2a$10$fQBNz.h9J.NYN.d9cacAUuCgi4Ya9QeHBt/S84wbIvOWBRm94ckQ.', 'cliente', 'Juana', 'Pérez', '+56988888888', 'Calle falsa 123')
) AS tmp (email, password, rol, nombre, apellido, telefono, direccion)
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = tmp.email);
