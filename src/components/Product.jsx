// Product.jsx
import React, { useState } from "react";
import { useCarrito } from "./context/CarritoContext";
import "./Product.css";

const Product = ({ id, nombre, descripcion, precio, imagen }) => {
  const { agregarAlCarrito } = useCarrito();
  const [cantidad, setCantidad] = useState(1);

  const handleAgregarAlCarrito = () => {
    agregarAlCarrito({ id, nombre, precio, imagen }, cantidad);
  };

  return (
    <div className="product">
      <h3>{nombre}</h3>
      <p>{descripcion}</p>
      <p>Precio: ${precio}</p>
      <img src={imagen} alt={nombre} />
      <div>
        <label>Cantidad:</label>
        <input
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          min="1"
        />
      </div>
      <button onClick={handleAgregarAlCarrito}>Agregar al carrito</button>
    </div>
  );
};

export default Product;
