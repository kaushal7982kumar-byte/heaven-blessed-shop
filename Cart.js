/* =========================================================
   HEAVEN BLESSED SHOP — CART.JS
   Renders and manages the shopping cart page.
   Cart data persists in localStorage (see main.js helpers).
   ========================================================= */

function renderCartPage() {
  const container = document.querySelector("#cart-page-wrap");
  if (!container) return;

  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="icon"><i class="fa-solid fa-bag-shopping"></i></div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <a href="shop.html" class="btn btn-primary" style="margin-top:12px;">Start Shopping</a>
      </div>`;
    return;
  }

  const items = cart.map(item => {
    const product = findProductById(item.id);
    if (!product) return "";
    const lineTotal = product.price * item.qty;
    return `
    <div class="cart-item" data-id="${product.id}">
      <img src="${product.images[0]}" alt="${product.name}">
      <div>
        <span class="cat">${product.category}</span>
        <h4>${product.name}</h4>
        <div class="row-actions">
          <div class="qty-stepper">
            <button class="cart-qty-minus" aria-label="Decrease quantity">−</button>
            <input type="text" class="cart-qty-input" value="${item.qty}" readonly>
            <button class="cart-qty-plus" aria-label="Increase quantity">+</button>
          </div>
          <button class="remove-link cart-remove-btn"><i class="fa-solid fa-trash"></i> Remove</button>
        </div>
      </div>
      <div class="line-total">${formatINR(lineTotal)}</div>
    </div>`;
  }).join("");

  const subtotal = getCartSubtotal();
  const totalQty = getCartTotalCount();

  container.innerHTML = `
    <div class="cart-layout">
      <div class="cart-items-list">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <p style="margin:0;color:var(--ink-soft);font-size:14px;">${totalQty} item${totalQty !== 1 ? "s" : ""} in your cart</p>
          <a href="shop.html" style="font-size:13.5px;color:var(--brand);font-weight:600;">← Continue Shopping</a>
        </div>
        ${items}
      </div>
      <div class="summary-card">
        <h3>Order Summary</h3>
        <div class="summary-row"><span>Subtotal</span><span>${formatINR(subtotal)}</span></div>
        <div class="summary-row"><span>Delivery Charge</span><span>Calculated after order confirmation</span></div>
        <div class="summary-row total"><span>Estimated Total</span><span>${formatINR(subtotal)}</span></div>
        <p class="summary-note">Final delivery charges will be confirmed by email before dispatch. No online payment is collected at this stage.</p>
        <a href="checkout.html" class="btn btn-primary btn-block" style="margin-top:16px;">Proceed to Checkout</a>
      </div>
    </div>`;

  container.querySelectorAll(".cart-item").forEach(row => {
    const id = row.dataset.id;
    row.querySelector(".cart-qty-minus").addEventListener("click", () => {
      const cartNow = getCart();
      const item = cartNow.find(i => i.id === id);
      if (item && item.qty > 1) {
        updateQty(id, item.qty - 1);
      } else {
        removeFromCart(id);
      }
      renderCartPage();
    });
    row.querySelector(".cart-qty-plus").addEventListener("click", () => {
      const cartNow = getCart();
      const item = cartNow.find(i => i.id === id);
      updateQty(id, (item ? item.qty : 0) + 1);
      renderCartPage();
    });
    row.querySelector(".cart-remove-btn").addEventListener("click", () => {
      removeFromCart(id);
      showToast("Item removed from cart", "fa-solid fa-trash");
      renderCartPage();
    });
  });
}

document.addEventListener("DOMContentLoaded", renderCartPage);
