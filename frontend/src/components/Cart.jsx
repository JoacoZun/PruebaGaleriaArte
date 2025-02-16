import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import fetchWithAuth from '../helpers/fetchHelper';
import './Cart.css';

const Cart = () => {
  const { cart, dispatch } = useCart();
  const { user } = useContext(AuthContext);

  const handleRemove = (product) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product });
  };

  const handleSubmit = async () => {
    try {
      // Crea objeto de orden de compra a partir del estado actual de cart
      const direccion = user.direccion;
      let precio_total = 0.0;
      let obras_id = [];
      cart.forEach((item) => {
        precio_total += item.precio;
        obras_id.push(item.id);
      });
      const order = { direccion, precio_total, obras_id };

      const response = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/api/orders`, {
        method: 'POST',
        body: JSON.stringify(order),
      });
      dispatch({ type: 'CLEAR_CART' });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="cart">
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.img_url} alt={item.nombre} style={{ width: '80px' }} />
            <div>
              <h4>{item.nombre}</h4>
              <p>${item.precio}</p>
              <button onClick={() => handleRemove(item)} className="btn btn-danger">
                Eliminar
              </button>
            </div>
          </div>
        ))
      )}
      <button onClick={() => handleSubmit()}>Realizar pedido</button>
    </div>
  );
};

export default Cart;
