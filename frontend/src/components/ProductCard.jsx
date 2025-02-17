import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ id, title, author, price, image }) => {
  console.log("Renderizando tarjeta:", { id, title, author, price, image });

  return (
    <div className="product-card">
      <div className="image-container">
        <img src={image || "/images/default-art.jpg"} alt={title} />
      </div>
      <h2>{title}</h2>
      <p>{author}</p>
      <p>{price}</p>
      <Link to={`/product/${id}`}>
        <button>Ver detalles</button>
      </Link>
    </div>
  );
};


export default ProductCard;
