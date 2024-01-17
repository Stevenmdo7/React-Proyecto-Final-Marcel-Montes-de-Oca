import React, { useState } from 'react';
import { useCarrito } from './context/CarritoContext';

const Checkout = () => {
  const { carrito, obtenerCarrito, eliminarDelCarrito, vaciarCarrito } = useCarrito();
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [tarjeta, setTarjeta] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleCompra = () => {
    const carritoActual = obtenerCarrito();

    if (carritoActual.length > 0 && nombre && direccion && tarjeta) {
      setMensaje('¡Compra realizada con éxito!');
    } else {
      setMensaje('Por favor, completa todos los campos y asegúrate de tener productos en el carrito.');
    }
  };

  const obtenerProductosUnicos = () => {
    const productosUnicos = [];
    carrito.forEach((item) => {
      if (!productosUnicos.find((p) => p.id === item.producto.id)) {
        productosUnicos.push(item.producto);
      }
    });
    return productosUnicos;
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.producto.precio * item.cantidad, 0);
  };

  return (
    <div>
      <h2>Resumen de compra</h2>
      <ul>
        {obtenerProductosUnicos().map((producto) => (
          <li key={producto.id}>
            <img src={producto.imagen} alt={producto.nombre} style={{ maxWidth: '180px', maxHeight: '180px', marginRight: '10px' }} />
            {producto.nombre} - Cantidad: {carrito.reduce((total, item) => (item.producto.id === producto.id ? total + item.cantidad : total), 0)} - Precio: ${producto.precio.toFixed(2)}
            <button onClick={() => eliminarDelCarrito(producto.id, 1)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <p>Total: ${calcularTotal().toFixed(2)}</p>

      <h2>Detalles del envío</h2>
      <label htmlFor="nombre">Nombre:</label>
      <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />

      <label htmlFor="direccion">Dirección:</label>
      <input type="text" id="direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} />

      <h2>Detalles de pago</h2>
      <label htmlFor="tarjeta">Número de tarjeta:</label>
      <input type="text" id="tarjeta" value={tarjeta} onChange={(e) => setTarjeta(e.target.value)} />

      <button onClick={handleCompra}>Comprar</button>
      <button onClick={vaciarCarrito}>Vaciar Carrito</button>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default Checkout;