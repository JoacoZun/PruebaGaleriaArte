import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';
import { useEffect, useState } from 'react';
import { getProductById } from '../helpers/productsAPI';

const ProductDetail = () => {
  const { id } = useParams();
  const { dispatch } = useCart();
  const navigate = useNavigate(); // Hook para la navegación
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    navigate('/cart'); // Redirigir al carrito
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getProductById(id);
      setProduct(fetchedProduct);
      setIsLoading(false);
    };
    fetchProduct();
  }, [id]);
  // Muestra placeholders de bootstrap mientras se carga
  if (isLoading) {
    return (
      <div className="min-view-height d-flex justify-content-center align-items-center gap-5">
        <div className="placeholder-glow">
          <div
            className="placeholder product-detail-img"
            style={{ width: '300px', height: '300px' }}
          ></div>
        </div>
        <div className="product-detail text-left" style={{ width: '300px', height: '300px' }}>
          <div className="placeholder-glow">
            <h2 className="placeholder col-12 fs-2"></h2>
            <h3 className="placeholder col-12"></h3>
            <p className="placeholder col-7 text-secondary"></p>
            <p className="placeholder col-7"></p>
            <p className="placeholder col-7"></p>
            <p className="placeholder col-7"></p>
          </div>
          <div className="placeholder-glow mt-3">
            <button className="btn btn-primary disabled placeholder col-4"></button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-view-height d-flex justify-content-center align-items-center gap-5">
      <div>
        <img className="product-detail-img" src={product.img_url} alt={product.title} />
      </div>
      <div className="product-detail text-left">
        <h2 className="fs-2">{product.nombre}</h2>
        <h3 className="fs-5 text-secondary-emphasis">{product.autor}</h3>
        <div className="text-secondary">
          <p className="m-0">{product.categoria}</p>
          <p className="m-0">{product.tecnica}</p>
          <p className="m-0">{product.alto} x {product.ancho} cm</p>
        </div>
        <p className="fw-bold my-3 fs-3">${product.precio}</p>
        <p>{product.descripcion}</p>
        <div className="d-grid">
          <button onClick={handleAddToCart} className="btn btn-primary fs-5 rounded-0 py-3">
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
