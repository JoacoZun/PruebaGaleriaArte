import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import '../App.css';
import fetchWithAuth from '../helpers/fetchHelper';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/api/artworks`);
        if (!Array.isArray(data)) {
          throw new Error("Formato de datos incorrecto");
        }
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home">
      <h1>Bienvenido a la Galería de Arte</h1>

      {error && <p className="error-message">Error al cargar las obras: {error}</p>}

      <div className="gallery-grid">
        {isLoading ? (
          <div>Cargando...</div>
        ) : (
          products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.nombre}
                author={product.autor}
                price={product.precio}
                image={product.img_url || "/images/default-art.jpg"} // Imagen por defecto si no hay URL válida
              />
            ))
          ) : (
            <p>No hay obras disponibles.</p>
          )
        )}
      </div>
    </div>
  );
};

export default Home;

