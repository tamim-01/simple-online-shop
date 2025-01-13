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
  setAddedToCartItem: (data: AddedToCartProduct[]) => void;
  addToCart: (pId: number) => void;
  increase: (id: number) => void;
  decrease: (id: number) => void;
};

// Create the context
const CartContext = createContext<CartContextType>({
  storedItems: null,
  setItems: () => {},
  addedToCartItems: null,
  setAddedToCartItem: () => {},
  addToCart: () => {},
  increase: () => {},
  decrease: () => {},
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

  const increase = useCallback((pId: number) => {}, []);

  const decrease = useCallback((pId: number) => {}, []);

  const handleStoreItems = useCallback((data: Product[]) => {
    setStoredItems(data);
  }, []);

  const handleSetAddedToCartItems = useCallback(
    (data: AddedToCartProduct[]) => {
      setAddedToCartItems(data);
    },
    []
  );

  const CartCtx = useMemo(
    () => ({
      storedItems,
      setItems: handleStoreItems,
      addedToCartItems,
      setAddedToCartItem: handleSetAddedToCartItems,
      addToCart,
      increase,
      decrease,
    }),
    [
      storedItems,
      addedToCartItems,
      handleStoreItems,
      handleSetAddedToCartItems,
      addToCart,
      increase,
      decrease,
    ]
  );

  return (
    <CartContext.Provider value={CartCtx}>{children}</CartContext.Provider>
  );
}

export default CartContext;
