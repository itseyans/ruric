import React, { useEffect, useState } from "react";
import { getProducts } from "../../services/api";
import "../../styles/Shop.css";

function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts();
      // sort newest first
      const sorted = data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setProducts(sorted);
    }
    fetchProducts();
  }, []);

  return (
    <div className="shop-page">
      <header className="shop-header">
        <h1>Fresh From the Farm</h1>
        <p>Discover our latest arrivals and healthy picks for you!</p>
      </header>

      {products.length === 0 ? (
        <p className="loading">Loading new arrivals...</p>
      ) : (
        <div className="product-grid">
          {products.map((item) => (
            <div key={item.product_id} className="product-card">
              <img
                src={`http://127.0.0.1:5000/static/${item.image_url}`}
                alt={item.name}
                className="product-image"
              />
              <div className="product-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p className="price">₱{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <footer className="shop-footer">
        <p>Visit our nearest branch to enjoy these fresh selections daily! 🌿</p>
      </footer>
    </div>
  );
}

export default Shop;
