import React, { createContext, useCallback, useMemo, useState } from "react";

export interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  quantity: number;
}

interface CartState {
  products: Product[];
  cartItems: Product[];
}

interface CartContextType {
  products: Product[];
  cartItems: Product[];
  totalItems: number;
  setProducts: (products: Product[]) => void;
  addToCart: (productId: number, quantity?: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
}

const INITIAL_STATE: CartState = {
  products: [],
  cartItems: [],
};

const CartContext = createContext<CartContextType>({
  products: [],
  cartItems: [],
  totalItems: 0,
  setProducts: () => {},
  addToCart: () => {},
  decreaseQuantity: () => {},
  removeFromCart: () => {},
});

export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<CartState>(INITIAL_STATE);

  const addToCart = useCallback(
    (productId: number, quantity = 1) => {
      const product = state.products.find((p) => p.id === productId);
      if (!product) return;

      setState((prev) => {
        const newCartItems = [...prev.cartItems];
        const existingIndex = newCartItems.findIndex(
          (item) => item.id === productId
        );

        if (existingIndex === -1) {
          newCartItems.push({ ...product, quantity });
        } else {
          newCartItems[existingIndex] = {
            ...newCartItems[existingIndex],
            quantity: (newCartItems[existingIndex].quantity || 0) + quantity,
          };
        }

        return {
          ...prev,
          cartItems: newCartItems,
        };
      });
    },
    [state.products]
  );

  const decreaseQuantity = useCallback((productId: number) => {
    setState((prev) => {
      const newCartItems = [...prev.cartItems];
      const existingIndex = newCartItems.findIndex(
        (item) => item.id === productId
      );

      if (existingIndex === -1) return prev;

      const currentQuantity = newCartItems[existingIndex].quantity || 0;
      if (currentQuantity <= 1) {
        newCartItems.splice(existingIndex, 1);
      } else {
        newCartItems[existingIndex] = {
          ...newCartItems[existingIndex],
          quantity: currentQuantity - 1,
        };
      }

      return {
        ...prev,
        cartItems: newCartItems,
      };
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setState((prev) => {
      const existingIndex = prev.cartItems.findIndex(
        (item) => item.id === productId
      );
      if (existingIndex === -1) return prev;

      const newCartItems = [...prev.cartItems];
      newCartItems.splice(existingIndex, 1);

      return {
        ...prev,
        cartItems: newCartItems,
      };
    });
  }, []);

  const setProducts = useCallback((products: Product[]) => {
    setState((prev) => ({
      ...prev,
      products,
    }));
  }, []);

  const totalItems = useMemo(
    () => state.cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0),
    [state.cartItems]
  );

  const contextValue = useMemo(
    () => ({
      products: state.products,
      cartItems: state.cartItems,
      totalItems,
      setProducts,
      addToCart,
      decreaseQuantity,
      removeFromCart,
    }),
    [
      state.products,
      state.cartItems,
      totalItems,
      setProducts,
      addToCart,
      decreaseQuantity,
      removeFromCart,
    ]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartContext;
