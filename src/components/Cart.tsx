import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

interface CartItemProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const CartItem: React.FC<CartItemProps> = ({ product, onAddToCart }) => {
  const { title, price, category, description, image } = product;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 w-64 h-96 flex flex-col ${
        isVisible ? "opacity-100 transition-opacity duration-700" : "opacity-0"
      }`}
    >
      <div className="w-full h-48 flex items-center justify-center overflow-hidden">
        <img
          src={image}
          alt={title}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
          {title}
        </h2>
        <p className="text-sm text-gray-600 mb-2">{category}</p>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
          {description}
        </p>
        <p className="text-lg font-bold text-gray-900 mb-4">${price}</p>

        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default CartItem;
