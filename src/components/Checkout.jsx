import React, { useState } from "react";
import { useCarrito } from "./context/CarritoContext";
import "./Checkout.css";

const Checkout = () => {
  const { carrito, obtenerCarrito, eliminarDelCarrito, vaciarCarrito } =
    useCarrito();
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [tarjeta, setTarjeta] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleCompra = () => {
    const carritoActual = obtenerCarrito();

    if (carritoActual.length > 0 && nombre && direccion && tarjeta) {
      setMensaje("¡Compra realizada con éxito!");
    } else {
      setMensaje(
        "Por favor, completa todos los campos y asegúrate de tener productos en el carrito."
      );
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
    return carrito.reduce(
      (total, item) => total + item.producto.precio * item.cantidad,
      0
    );
  };

  const handleCompraWhatsApp = () => {
    const mensajeWhatsApp = generarMensajeWhatsApp();
    abrirWhatsApp(mensajeWhatsApp);
  };

  const generarMensajeWhatsApp = () => {
    const productosWhatsApp = carrito.map((item) => {
      return `${item.cantidad}x ${item.producto.nombre}`;
    });

    const mensaje = `¡Hola! Quiero comprar los siguientes productos:\n${productosWhatsApp.join(
      "\n"
    )}\nTotal: $${calcularTotal().toFixed(2)}`;
    return encodeURIComponent(mensaje);
  };

  const abrirWhatsApp = (mensaje) => {
    const numeroTelefono = "+59898879444";
    const enlaceWhatsApp = `https://wa.me/${numeroTelefono}?text=${mensaje}`;
    window.open(enlaceWhatsApp, "_blank");
  };

  return (
    <div className="checkout-container">
      <h2>Resumen de compra</h2>
      <ul className="product-list">
        {obtenerProductosUnicos().map((producto) => (
          <li key={producto.id} className="product-info">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="product-image"
            />
            <div className="product-details">
              <span className="product-name">{producto.nombre}</span>
              <span>
                Cantidad:{" "}
                {carrito.reduce(
                  (total, item) =>
                    item.producto.id === producto.id
                      ? total + item.cantidad
                      : total,
                  0
                )}
              </span>
              <span>Precio: ${producto.precio.toFixed(2)}</span>
            </div>
            <button
              className="remove-button"
              onClick={() => eliminarDelCarrito(producto.id, 1)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <p className="total">Total: ${calcularTotal().toFixed(2)}</p>

      <h2>Detalles del envío</h2>
      <div className="input-group">
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="direccion">Dirección:</label>
        <input
          type="text"
          id="direccion"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
      </div>

      <h2>Detalles de pago</h2>
      <div className="input-group">
        <label htmlFor="tarjeta">Número de tarjeta:</label>
        <input
          type="text"
          id="tarjeta"
          value={tarjeta}
          onChange={(e) => setTarjeta(e.target.value)}
        />
      </div>

      <button className="buy-button" onClick={handleCompra}>
        Comprar
      </button>
      <button className="whatsapp-button" onClick={handleCompraWhatsApp}>
        <img
          src="images/whatsapp.png"
          alt="WhatsApp Logo"
          className="whatsapp-logo"
        />
        Comprar a través de WhatsApp
      </button>
      <button className="clear-button" onClick={vaciarCarrito}>
        Vaciar Carrito
      </button>

      {mensaje && <p className="purchase-message">{mensaje}</p>}
    </div>
  );
};

export default Checkout;
