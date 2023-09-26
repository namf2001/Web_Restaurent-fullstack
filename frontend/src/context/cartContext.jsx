import { createContext, useState, useMemo, useCallback } from 'react';

// Tạo một context
const CartContext = createContext();

// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
  const [openCart, setOpenCart] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);

  const toggleCart = useCallback(() => {
    setOpenCart(!openCart);
  }, [openCart]);

  const togglePayment = useCallback(() => {
    setOpenPayment(!openPayment);
  }, [openPayment]);

  const toggleLocation = useCallback(() => {
    setOpenLocation(!openLocation);
  }, [openLocation]);

  const contextValue = useMemo(() => {
    return {
      openCart,
      openPayment,
      toggleCart,
      togglePayment,
      openLocation,
      toggleLocation,
    };
  }, [openCart, openLocation, openPayment, toggleCart, toggleLocation, togglePayment]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
