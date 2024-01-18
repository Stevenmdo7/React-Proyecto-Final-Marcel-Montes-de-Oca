import React, { useEffect, useState } from "react";
import productos from "./products.json";
import "./ProductosCategoria.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductosCategoria = ({ categoria }) => {
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  useEffect(() => {
    const filteredProducts = productos.filter(
      (producto) => producto.categoria.toLowerCase() === categoria.toLowerCase()
    );

    if (filteredProducts.length === 0) {
      console.log("Notificación mostrada");
      toast.info("¡Próximamente agregaremos productos!", {
        position: toast.POSITION.TOP_CENTER,
      });
      setMostrarMensaje(true);
    } else {
      setMostrarMensaje(false);
    }

    setProductosFiltrados(filteredProducts);
  }, [categoria]);

  return (
    <div id="productos-categoria-container">
      <h2>{categoria}</h2>
      {mostrarMensaje ? (
        <div className="mensaje-animado">
          <p>No hay productos para mostrar.</p>
        </div>
      ) : (
        <ul>
          {productosFiltrados.map((producto) => (
            <li key={producto.id}>
              <img
                style={{ maxWidth: "20%", height: "auto" }}
                src={`/${producto.imagen}`}
                alt={producto.nombre}
              />
              <p>{producto.nombre}</p>
              <p>{producto.descripcion}</p>
              <p>Precio: ${producto.precio}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductosCategoria;
