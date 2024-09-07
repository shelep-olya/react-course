import { useState } from "react";
import { Fragment } from "react";
import styles from "./App.module.css";
import { ProductList } from "./components/ProductList";
import { ProductCard } from "./components/ProductCard.js";
import { ProductFilter } from "./components/ProductFilter.js";
import { products as productsData } from "./data/products.js";
function App() {
  const [products, setProducts] = useState(productsData);
  const [filters, setFilters] = useState({
    price: {
      min: 0,
      max: 999,
    },
    other: "other value",
  });
  const [favourites, setFavourites] = useState([]);
  function handlePurchase(productId, stockCount) {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, stockCount } : product
      )
    );
  }

  function handleFilter(key, value) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      price: {
        ...prevFilters.price,
        [key]: value,
      },
    }));
  }

  function handleFavourite(productId) {
    if (favourites.includes(productId)) {
      setFavourites((prevFavourites) =>
        prevFavourites.filter((id) => id !== productId)
      );
    } else {
      setFavourites((prevFavourites) => [...prevFavourites, productId]);
    }
  }
  return (
    <div className={styles.App}>
      <ProductList>
        {products.map((product) => (
          <ProductCard
            key={product.title}
            product={product}
            isFavourite={favourites.includes(product.id)}
            onPurchase={handlePurchase}
            onFavourite={handleFavourite}
          />
        ))}
      </ProductList>

      <h2>Products filteres by price</h2>
      <ProductFilter filters={filters} onFilter={handleFilter} />

      {products
        .filter(
          ({ price }) =>
            price >= filters.price.min && price <= filters.price.max
        )
        .map(({ title, price }) => (
          <Fragment key={title}>
            <hr className={styles.ListDivider} />
            <p className={styles.ListTitle}>
              {title} cost ${price}
            </p>
          </Fragment>
        ))}
    </div>
  );
}

export default App;
