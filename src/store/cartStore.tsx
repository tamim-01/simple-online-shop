import React, { createContext, useCallback, useMemo, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

interface AddedToCartProduct {
  id: number;
  quantity: number;
}

type CartContextType = {
  storedItems: Product[] | null;
  setItems: (data: Product[]) => void;
  addedToCartItems: AddedToCartProduct[] | null;
  addToCart: (pId: number) => void;
  increase: (id: number) => void;
  decrease: (id: number) => void;
  removeFromCart: (id: number) => void;
};

// Create the context
const CartContext = createContext<CartContextType>({
  storedItems: null,
  setItems: () => {},
  addedToCartItems: null,
  addToCart: () => {},
  increase: () => {},
  decrease: () => {},
  removeFromCart: () => {},
});

// Provider component
export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [storedItems, setStoredItems] = useState<Product[] | null>(null);
  const [addedToCartItems, setAddedToCartItems] = useState<
    AddedToCartProduct[] | null
  >(null);

  const addToCart = useCallback(
    (pId: number) => {
      if (!storedItems) return;

      const product = storedItems.find((item) => item.id === pId);
      if (!product) return;

      setAddedToCartItems((prev) => {
        const existingItem = prev?.find((item) => item.id === pId);

        if (existingItem) {
          return (
            prev?.map((item) =>
              item.id === pId ? { ...item, quantity: item.quantity + 1 } : item
            ) || []
          );
        } else {
          return [...(prev || []), { id: pId, quantity: 1 }];
        }
      });
    },
    [storedItems]
  );

  const increase = useCallback((pId: number) => {
    setAddedToCartItems((prev) => {
      if (!prev) return null;

      return prev.map((item) =>
        item.id === pId ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
  }, []);

  const decrease = useCallback((pId: number) => {
    setAddedToCartItems((prev) => {
      if (!prev) return null;

      return prev
        .map((item) =>
          item.id === pId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);
    });
  }, []);

  const removeFromCart = useCallback((pId: number) => {
    setAddedToCartItems((prev) => {
      if (!prev) return null;

      return prev.filter((item) => item.id !== pId);
    });
  }, []);

  const handleStoreItems = useCallback((data: Product[]) => {
    setStoredItems(data);
  }, []);

  const CartCtx = useMemo(
    () => ({
      storedItems,
      setItems: handleStoreItems,
      addedToCartItems,
      addToCart,
      increase,
      decrease,
      removeFromCart,
    }),
    [
      storedItems,
      addedToCartItems,
      handleStoreItems,
      addToCart,
      increase,
      decrease,
      removeFromCart,
    ]
  );

  return (
    <CartContext.Provider value={CartCtx}>{children}</CartContext.Provider>
  );
}

export default CartContext;
