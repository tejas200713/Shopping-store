import React, { useState } from "react";

const products = [
  { id: 1, name: "Laptop", price: 55000, image: process.env.PUBLIC_URL + "/images/laptop.png" },
  { id: 2, name: "Smartphone", price: 22000, image: process.env.PUBLIC_URL +  "/images/phone.png" },
  { id: 3, name: "Headphones", price: 2500, image: process.env.PUBLIC_URL +  "/images/headphones.png" },
  { id: 4, name: "Smart Watch", price: 6000, image: process.env.PUBLIC_URL +  "/images/watch.png" }
];

// 🔹 Navbar Component
function Navbar({ cartCount, goShop, goCart }) {
  return (
    <div className="navbar">
      <h2 className="logo" onClick={goShop}>
        🛍 MyStore
      </h2>
      <div className="cart-nav" onClick={goCart}>
        🛒 Cart ({cartCount})
      </div>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("shop");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const addToCart = (product) => {
    const found = cart.find(item => item.id === product.id);
    if (found) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const increaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    ));
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map(item =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter(item => item.qty > 0)
    );
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const placeOrder = () => {
    if (!address || !phone) {
      alert("Please enter address and phone number");
      return;
    }
    alert("Order placed successfully!");
    setCart([]);
    setAddress("");
    setPhone("");
    setPage("shop");
  };

  return (
    <>
      <Navbar
        cartCount={cart.length}
        goShop={() => setPage("shop")}
        goCart={() => setPage("cart")}
      />

      <div className="container">
        {page === "shop" && (
          <>
            <h1 className="heading">Products</h1>
            <div className="products">
              {products.map(p => (
                <div className="card" key={p.id}>
                  <img src={p.image} alt={p.name} />
                  <h3>{p.name}</h3>
                  <p>₹{p.price}</p>
                  <button onClick={() => addToCart(p)}>
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {page === "cart" && (
          <div className="cart">
            <h2>🧾 Cart</h2>

            {cart.length === 0 ? (
              <p>No items in cart</p>
            ) : (
              cart.map(item => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h4>{item.name}</h4>
                    <p>₹{item.price}</p>
                    <div className="qty">
                      <button onClick={() => decreaseQty(item.id)}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => increaseQty(item.id)}>+</button>
                    </div>
                  </div>
                </div>
              ))
            )}

            {cart.length > 0 && <h3>Total: ₹{totalPrice}</h3>}

            {cart.length > 0 && (
              <>
                <input
                  type="text"
                  placeholder="Delivery Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                <button className="done-btn" onClick={placeOrder}>
                  Done
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
