import React, { createContext, useContext, useState } from "react";

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto, cantidad) => {
    setCarrito([...carrito, { producto, cantidad }]);
  };

  const eliminarDelCarrito = (productoId, cantidad) => {
    const nuevoCarrito = carrito.map((item) => {
      if (item.producto.id === productoId) {
        const nuevaCantidad = item.cantidad - cantidad;
        return {
          producto: item.producto,
          cantidad: nuevaCantidad > 0 ? nuevaCantidad : 0,
        };
      }
      return item;
    });
    setCarrito(nuevoCarrito.filter((item) => item.cantidad > 0));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const obtenerCarrito = () => carrito;

  const value = {
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    vaciarCarrito,
    obtenerCarrito,
  };

  return (
    <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>
  );
};

export const useCarrito = () => {
  return useContext(CarritoContext);
};
