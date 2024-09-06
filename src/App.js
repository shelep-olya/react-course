import { Fragment } from "react";
import styles from "./App.module.css";
import { ProductList } from "./components/ProductList";
import { ProductCard } from "./components/ProductCard";

function App() {
  const products = [
    {
      imageSrc: "images/iphone.png",
      title: "iPhone 15 Pro",
      specification: [
        "A17 Pro chip with 6-core GPU",
        "3x or 5x Telephoto camera",
        "Up to 29 hours video payback",
      ],
      price: 999,
      stockCount: 10,
    },
    {
      imageSrc: "images/apple.png",
      title: "Aplle Watch 9",
      specification: [
        "Aplle Watch chip with 6-core GPU",
        "3x or 5x Telephoto camera",
        "Up to 29 hours video payback",
      ],
      price: 400,
      stockCount: 0,
    },
    {
      imageSrc: "images/earphone.png",
      title: "Air Pods",
      specification: [
        "A17 Pods chip with 6-core GPU",
        "3x or 5x Telephoto camera",
        "Up to 29 hours video payback",
      ],
      price: 599,
      stockCount: 6,
    },
  ];
  function handlePurchase(product) {
    alert(`You clicked on ${product.title} which cost $${product.price}`);
  }

  return (
    <div className={styles.App}>
      <ProductList>
        {products.map((product) => (
          <ProductCard
            key={product.title}
            product={product}
            onPurchase={handlePurchase}
          />
        ))}
      </ProductList>

      <h2>Product which cost up to $500</h2>

      {products
        .filter(({ price }) => price < 500)
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
