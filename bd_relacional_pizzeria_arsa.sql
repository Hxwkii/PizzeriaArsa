CREATE DATABASE IF NOT EXISTS pizzeria_arsa;
USE pizzeria_arsa;

CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(120) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL,
    precio_original DECIMAL(8, 2) NOT NULL,
    precio_rescate DECIMAL(8, 2) NOT NULL,
    descuento INT NOT NULL,
    stock INT NOT NULL,
    estado VARCHAR(30) NOT NULL
);

CREATE TABLE pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    cliente VARCHAR(100) NOT NULL,
    direccion VARCHAR(150) NOT NULL,
    telefono VARCHAR(9) NOT NULL,
    cantidad INT NOT NULL,
    total DECIMAL(8, 2) NOT NULL,
    estado VARCHAR(30) NOT NULL,
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pedido_detalle (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    precio_unitario DECIMAL(8, 2) NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

INSERT INTO usuarios (nombre, correo, password_hash) VALUES
('Ana Lopez', 'ana@correo.com', 'demo123'),
('Luis Torres', 'luis@correo.com', 'demo123');

INSERT INTO productos (nombre, precio_original, precio_rescate, descuento, stock, estado) VALUES
('Pizza Pepperoni', 40.00, 20.00, 50, 5, 'Disponible'),
('Pizza Hawaiana', 38.00, 19.00, 50, 3, 'Disponible'),
('Pizza Americana', 35.00, 14.00, 60, 2, 'Oferta'),
('Pizza Vegetariana', 42.00, 21.00, 50, 4, 'Disponible'),
('Pan al Ajo', 12.00, 3.60, 70, 6, 'Oferta');

INSERT INTO pedidos (cliente, direccion, telefono, cantidad, total, estado) VALUES
('Juan Perez', 'Av. Lima 123', '987654321', 1, 20.00, 'Enviado'),
('Maria Garcia', 'Jr. Los Pinos 456', '912345678', 2, 38.00, 'En proceso');

INSERT INTO pedido_detalle (id_pedido, id_producto, precio_unitario) VALUES
(1, 1, 20.00),
(2, 2, 19.00);

SELECT * FROM usuarios;

SELECT nombre, precio_original, precio_rescate, descuento, stock
FROM productos
WHERE estado = 'Oferta'
ORDER BY descuento DESC;

SELECT p.id_pedido, p.cliente, pr.nombre AS producto, p.cantidad, p.total, p.estado
FROM pedidos p
INNER JOIN pedido_detalle d ON p.id_pedido = d.id_pedido
INNER JOIN productos pr ON d.id_producto = pr.id_producto
ORDER BY p.id_pedido;

SELECT estado, COUNT(*) AS cantidad_pedidos, SUM(total) AS total_recaudado
FROM pedidos
GROUP BY estado;
