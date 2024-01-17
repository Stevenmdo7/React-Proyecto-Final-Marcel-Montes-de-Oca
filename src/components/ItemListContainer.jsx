import React, { useEffect, useState } from 'react';
import './ItemListContainer.css';
import Product from './Product.jsx'; 
import { useCarrito } from './context/CarritoContext';


function ItemListContainer({ greeting, itemId }) {
  const [productos, setProductos] = useState([]);
  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('/products.json');
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <div className="container mt-4 text-center" style={{ marginTop: '70px' }}>
      <h2 className="animate__animated animate__fadeIn">{greeting}</h2>
      <div className="product-container">
        {productos.map((producto) => (
          <Product
            key={producto.id}
            id={producto.id}
            nombre={producto.nombre}
            descripcion={producto.descripcion}
            precio={producto.precio}
            imagen={producto.imagen}
            agregarAlCarrito={agregarAlCarrito}
          />
        ))}
      </div>
    </div>
  );
}

export default ItemListContainer;