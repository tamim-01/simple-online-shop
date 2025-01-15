import React, { useContext, useEffect, useMemo } from "react";
import CartItem from "../Cart.tsx";
import { FaSearch } from "react-icons/fa";
import cartContext, { Product } from "../../store/cartStore.tsx";

const CATEGORIES = [
  { value: "", label: "All Categories" },
  { value: "electronics", label: "Electronics" },
  { value: "jewelery", label: "Jewelery" },
  { value: "men's clothing", label: "Men's Clothing" },
  { value: "women's clothing", label: "Women's Clothing" },
] as const;

export default function ShowingCartsPage() {
  const cartCtx = useContext(cartContext);
  const [searchValue, setSearchValue] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  useEffect(() => {
    if (cartCtx.products.length > 0) {
      setIsLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error(`${response.status}`);
        }
        const data: Product[] = await response.json();
        cartCtx.setProducts(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to Load products")
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [cartCtx]);

  const filteredItems = useMemo(() => {
    return cartCtx.products.filter((item) => {
      const matchesSearch =
        searchValue.trim() === "" ||
        [item.title, item.description, item.category].some((field) =>
          field.toLowerCase().includes(searchValue.toLowerCase().trim())
        );

      const matchesCategory =
        selectedCategory === "" ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [cartCtx.products, searchValue, selectedCategory]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-warning motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
        <p className="text-2xl text-red-600 font-semibold mb-4">
          Failed to load products
        </p>
        <p className="text-lg text-gray-600">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-[1700px] md:px-16">
      <section className="flex flex-col md:flex-row items-center justify-start p-4 px-16 md:px-20">
        <div className="w-full relative md:w-1/3 mb-4 md:mb-0 md:mr-4">
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
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
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
          >
            {CATEGORIES.map(({ value, label }) => (
              <option key={value || "all"} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </section>

      {filteredItems.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No products found</p>
      ) : (
        <ul className="flex flex-wrap justify-center gap-12 my-12">
          {filteredItems.map((item) => (
            <li key={item.id}>
              <CartItem
                product={item}
                onAddToCart={() => cartCtx.addToCart(item.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
