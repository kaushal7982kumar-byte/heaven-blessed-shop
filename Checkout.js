/* =========================================================
   HEAVEN BLESSED SHOP — CHECKOUT.JS
   -------------------------------------------------------
   HOW TO CONNECT EMAILJS (required before orders can be sent):
   1. Create a free account at https://www.emailjs.com
   2. Add an Email Service (e.g. Gmail) connected to
      kaushalblessing633@gmail.com — this gives you a
      SERVICE_ID.
   3. Create an Email Template — this gives you a
      TEMPLATE_ID. Use template variables that match the
      "templateParams" object built in submitOrder() below
      (order_id, order_date, customer_name, customer_mobile,
      customer_email, address, city, state, pincode, notes,
      items_summary, subtotal, delivery_note, grand_total).
   4. Copy your Public Key from EmailJS → Account.
   5. Paste all three values into the placeholders directly
      below. Never share your EmailJS PRIVATE key — only the
      public key belongs in frontend code.
   ========================================================= */

const EMAILJS_PUBLIC_KEY  = "YOUR_EMAILJS_PUBLIC_KEY";
const EMAILJS_SERVICE_ID  = "YOUR_EMAILJS_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_EMAILJS_TEMPLATE_ID";
const STORE_ORDER_EMAIL   = "kaushalblessing633@gmail.com";

function generateOrderId() {
  const date = new Date();
  const stamp = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `HB-${stamp}-${rand}`;
}

function renderCheckoutSummary() {
  const summaryEl = document.querySelector("#checkout-summary-items");
  const subtotalEl = document.querySelector("#checkout-subtotal");
  const totalEl = document.querySelector("#checkout-grand-total");
  if (!summaryEl) return;

  const cart = getCart();
  if (cart.length === 0) {
    document.querySelector("#checkout-form-section").style.display = "none";
    document.querySelector("#checkout-empty-state").style.display = "block";
    return;
  }

  summaryEl.innerHTML = cart.map(item => {
    const product = findProductById(item.id);
    if (!product) return "";
    return `
    <div class="order-review-item">
      <div>
        <div class="oname">${product.name}</div>
        <div class="osub">Qty: ${item.qty} × ${formatINR(product.price)}</div>
      </div>
      <div class="oname">${formatINR(product.price * item.qty)}</div>
    </div>`;
  }).join("");

  const subtotal = getCartSubtotal();
  subtotalEl.textContent = formatINR(subtotal);
  totalEl.textContent = formatINR(subtotal);
}

function validateCheckoutForm(form) {
  let valid = true;
  const requiredFields = form.querySelectorAll("[required]");
  requiredFields.forEach(field => {
    const group = field.closest(".form-group");
    let fieldValid = field.value.trim().length > 0;

    if (field.type === "email" && fieldValid) {
      fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
    }
    if (field.id === "cf-mobile" && fieldValid) {
      fieldValid = /^[6-9]\d{9}$/.test(field.value.trim());
    }
    if (field.id === "cf-pincode" && fieldValid) {
      fieldValid = /^\d{6}$/.test(field.value.trim());
    }

    if (group) group.classList.toggle("invalid", !fieldValid);
    if (!fieldValid) valid = false;
  });
  return valid;
}

function buildItemsSummaryText(cart) {
  return cart.map(item => {
    const product = findProductById(item.id);
    if (!product) return "";
    return `${product.name} | Qty: ${item.qty} | Price: ${formatINR(product.price)} | Subtotal: ${formatINR(product.price * item.qty)}`;
  }).join("\n");
}

function setSubmitLoading(isLoading) {
  const btn = document.querySelector("#checkout-submit-btn");
  if (!btn) return;
  btn.disabled = isLoading;
  btn.innerHTML = isLoading
    ? '<i class="fa-solid fa-spinner fa-spin"></i> Placing Order...'
    : "Place Order";
}

function showFormStatus(message, type) {
  const statusEl = document.querySelector("#checkout-form-status");
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.className = `form-status show ${type}`;
}

function hideFormStatus() {
  const statusEl = document.querySelector("#checkout-form-status");
  if (!statusEl) return;
  statusEl.className = "form-status";
}

function submitOrder(e) {
  e.preventDefault();
  const form = e.target;
  hideFormStatus();

  const cart = getCart();
  if (cart.length === 0) {
    showFormStatus("Your cart is empty. Please add a product before placing an order.", "error");
    return;
  }

  if (!validateCheckoutForm(form)) {
    showFormStatus("Please check the highlighted fields and try again.", "error");
    return;
  }

  const orderId = generateOrderId();
  const orderDate = new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
  const subtotal = getCartSubtotal();

  const templateParams = {
    order_id: orderId,
    order_date: orderDate,
    to_email: STORE_ORDER_EMAIL,
    customer_name: form.querySelector("#cf-name").value.trim(),
    customer_mobile: form.querySelector("#cf-mobile").value.trim(),
    customer_email: form.querySelector("#cf-email").value.trim(),
    address: form.querySelector("#cf-address").value.trim(),
    city: form.querySelector("#cf-city").value.trim(),
    state: form.querySelector("#cf-state").value.trim(),
    pincode: form.querySelector("#cf-pincode").value.trim(),
    notes: form.querySelector("#cf-notes").value.trim() || "None",
    items_summary: buildItemsSummaryText(cart),
    subtotal: formatINR(subtotal),
    delivery_note: "Calculated after order confirmation",
    grand_total: formatINR(subtotal)
  };

  setSubmitLoading(true);

  const isConfigured = EMAILJS_PUBLIC_KEY !== "YOUR_EMAILJS_PUBLIC_KEY"
    && EMAILJS_SERVICE_ID !== "YOUR_EMAILJS_SERVICE_ID"
    && EMAILJS_TEMPLATE_ID !== "YOUR_EMAILJS_TEMPLATE_ID"
    && typeof emailjs !== "undefined";

  if (!isConfigured) {
    setSubmitLoading(false);
    showFormStatus("EmailJS is not configured yet. Add your EmailJS keys in js/checkout.js to enable order emails. (See README.md.)", "info");
    return;
  }

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
    .then(() => {
      setSubmitLoading(false);
      localStorage.removeItem(CART_KEY);
      updateCartCountBadge();
      showOrderSuccess(orderId);
    })
    .catch((err) => {
      console.error("EmailJS order submission failed:", err);
      setSubmitLoading(false);
      showFormStatus("We couldn't submit your order right now. Please check your internet connection and try again.", "error");
    });
}

function showOrderSuccess(orderId) {
  document.querySelector("#checkout-form-section").style.display = "none";
  document.querySelector("#checkout-summary-section").style.display = "none";
  const successSection = document.querySelector("#checkout-success-section");
  successSection.style.display = "block";
  document.querySelector("#success-order-id").textContent = orderId;
}

function initCheckoutPage() {
  const form = document.querySelector("#checkout-form");
  if (!form) return;
  renderCheckoutSummary();
  form.addEventListener("submit", submitOrder);

  form.querySelectorAll("[required]").forEach(field => {
    field.addEventListener("input", () => {
      const group = field.closest(".form-group");
      if (group) group.classList.remove("invalid");
    });
  });
}

document.addEventListener("DOMContentLoaded", initCheckoutPage);
  
