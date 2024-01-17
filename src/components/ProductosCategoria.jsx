import React, { useEffect, useState } from 'react';
import productos from './products.json';

const ProductosCategoria = ({ categoria }) => {
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  useEffect(() => {
    console.log('Categoría recibida:', categoria);

    const filteredProducts = productos.filter(
      (producto) => producto.categoria.toLowerCase() === categoria.toLowerCase()
    );

    console.log('Productos filtrados:', filteredProducts);

    if (filteredProducts.length === 0) {
      console.warn(`No hay productos para la categoría: ${categoria}`);
    }

    setProductosFiltrados(filteredProducts);
  }, [categoria]);

  return (
    <div>
      <h2>{categoria}</h2>
      {productosFiltrados.length > 0 ? (
        <ul>
          {productosFiltrados.map((producto) => (
            <li key={producto.id}>
              <img
                style={{ maxWidth: '40%', height: 'auto' }}
                src={`/${producto.imagen}`}
                alt={producto.nombre}
              />
              <p>{producto.nombre}</p>
              <p>{producto.descripcion}</p>
              <p>Precio: ${producto.precio}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay productos para mostrar.</p>
      )}
    </div>
  );
};

export default ProductosCategoria;