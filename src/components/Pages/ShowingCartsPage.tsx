import React, { useContext, useEffect, useState } from "react";
import CartItem from "../Cart.tsx";
import { FaSearch } from "react-icons/fa";
import cartContext from "../../store/cartStore.tsx";

interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

export default function ShowingCartsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [displayedItems, setDisplayedItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const cartCtx = useContext(cartContext);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data: Product[] = await response.json();
        setItems(data);
        setDisplayedItems(data);
        cartCtx.setItems(data);
      } catch (error) {
        console.error("Failed to fetch:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    if (!cartCtx.storedItems) {
      fetchProducts();
    } else {
      setLoading(false);
      setItems(cartCtx.storedItems);
      setDisplayedItems(cartCtx.storedItems);
      cartCtx.setItems(cartCtx.storedItems);
    }
  }, [cartCtx]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.trim().toLowerCase();
    setSearchValue(query);
    filterItems(query, selectedCategory);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const category = event.target.value;
    setSelectedCategory(category);
    filterItems(searchValue, category);
  };

  const filterItems = (query: string, category: string) => {
    let filteredItems = items;

    if (query) {
      filteredItems = filteredItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
    }

    if (category) {
      filteredItems = filteredItems.filter(
        (item) => item.category.toLowerCase() === category
      );
    }

    setDisplayedItems(filteredItems);
  };

  const handleAddToCart = (id: number) => {
    cartCtx.addToCart(id);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-warning motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
        <p className="text-2xl text-red-600 font-semibold mb-4">
          Products are not available.
        </p>
        <p className="text-lg text-gray-600">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-[1700px] md:px-[64px]">
      <section className="flex flex-col md:flex-row items-center justify-start p-4 px-16 md:px-20">
        <div className="w-full relative md:w-1/3 mb-4 md:mb-0 md:mr-4">
          <input
            value={searchValue}
            onChange={handleInputChange}
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
        </div>

        <div className="w-full md:w-1/3">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
        </div>
      </section>

      <ul className="flex flex-wrap justify-center gap-12 my-12">
        {displayedItems.map((item) => (
          <li key={item.id}>
            <CartItem
              product={item}
              onAddToCart={() => handleAddToCart(item.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
