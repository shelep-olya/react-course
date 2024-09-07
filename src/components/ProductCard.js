import { useState } from "react";
import styles from "./ProductCard.module.css";

export function ProductCard({
  product,
  background = "slategray",
  isFavourite,
  onPurchase,
  onFavourite,
}) {
  const [showMore, setShowMore] = useState(false);
  function handleClick() {
    onPurchase(product.id, product.stockCount - 1);
  }

  function handleTwoClicks() {
    onPurchase(product.id, product.stockCount - 2);
  }

  return (
    <article style={{ background }} className={styles.Container}>
      <button
        className={styles.Favourite}
        onClick={() => onFavourite(product.id)}
      >
        {isFavourite ? "❤️" : "🤍"}
      </button>
      <h2>{product.title}</h2>
      <img
        src={product.imageSrc}
        alt={product.title}
        width={128}
        height={128}
      />
      <p>
        Specification:{"   "}
        <button onClick={() => setShowMore(!showMore)}>
          {showMore ? "hide" : "show"}
        </button>
      </p>
      {showMore && (
        <ul className={styles.Specification}>
          {product.specification.map((spec, index) => (
            <li key={index}>{spec}</li>
          ))}
        </ul>
      )}
      <Status stockCount={product.stockCount} />
      {product.stockCount > 0 && (
        <>
          <p>Price: ${product.price}</p>
          <button onClick={handleClick}>Buy</button>
        </>
      )}
      {product.stockCount > 1 && (
        <button onClick={handleTwoClicks}>Buy 2</button>
      )}
    </article>
  );
}

function Status({ stockCount }) {
  const notAvailableTemplate = (
    <p className={styles.NotAvailableStatus}>not available</p>
  );
  const availableTemplate = (
    <p className={styles.AvailableStatus}>{stockCount} items available</p>
  );
  return stockCount === 0 ? notAvailableTemplate : availableTemplate;
}
