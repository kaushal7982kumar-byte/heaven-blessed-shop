/* =========================================================
   HEAVEN BLESSED SHOP — PRODUCT.JS
   Renders a single product's details page based on the
   "id" query parameter, e.g. product.html?id=hb-002
   ========================================================= */

let currentQty = 1;

function initProductPage() {
  const wrap = document.querySelector("#pd-wrap");
  if (!wrap) return;

  const id = getQueryParam("id");
  const product = findProductById(id);

  if (!product) {
    wrap.innerHTML = `
      <div class="empty-state">
        <div class="icon"><i class="fa-solid fa-box-open"></i></div>
        <h3>Product not found</h3>
        <p>This product may have been removed or the link is incorrect.</p>
        <a href="shop.html" class="btn btn-primary" style="margin-top:16px;">Back to Shop</a>
      </div>`;
    return;
  }

  document.title = `${product.name} | Heaven Blessed Shop`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", product.description);

  document.querySelector("#pd-breadcrumb-name").textContent = product.name;

  const discount = product.oldPrice ? Math.round(100 - (product.price / product.oldPrice) * 100) : null;

  wrap.innerHTML = `
    <div class="pd-grid">
      <div class="pd-gallery">
        <div class="pd-gallery-main">
          <img id="pd-main-image" src="${product.images[0]}" alt="${product.name}">
        </div>
        <div class="pd-thumbs">
          ${product.images.map((img, i) => `
            <div class="thumb ${i === 0 ? "active" : ""}" data-img="${img}">
              <img src="${img}" alt="${product.name} thumbnail ${i + 1}">
            </div>`).join("")}
        </div>
      </div>
      <div class="pd-info">
        <span class="product-cat">${product.category}</span>
        <h1>${product.name}</h1>
        ${renderStars(product.rating)}
        <div class="pd-price-row">
          <span class="price">${formatINR(product.price)}</span>
          ${product.oldPrice ? `<span class="price-old">${formatINR(product.oldPrice)}</span>` : ""}
          ${discount ? `<span class="badge">${discount}% OFF</span>` : ""}
        </div>
        <p class="pd-desc">${product.description}</p>
        <ul class="pd-features">
          ${product.features.map(f => `<li><i class="fa-solid fa-check"></i>${f}</li>`).join("")}
        </ul>
        <div>
          <label style="font-size:13px;font-weight:600;display:block;margin-bottom:10px;">Quantity</label>
          <div class="qty-stepper">
            <button id="pd-qty-minus" aria-label="Decrease quantity">−</button>
            <input type="text" id="pd-qty-input" value="1" readonly>
            <button id="pd-qty-plus" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <div class="pd-actions">
          <button class="btn btn-outline" id="pd-add-cart"><i class="fa-solid fa-bag-shopping"></i> Add to Cart</button>
          <button class="btn btn-primary" id="pd-buy-now">Buy Now</button>
        </div>
        <div class="pd-meta-row">
          <span><i class="fa-solid fa-envelope"></i> Orders confirmed by email</span>
          <span><i class="fa-solid fa-truck"></i> Delivery charge confirmed after order</span>
          ${product.isSampleImage ? `<span><i class="fa-solid fa-image"></i> Sample image — demo catalogue</span>` : ""}
        </div>
      </div>
    </div>`;

  currentQty = 1;

  // Thumbnail swap
  wrap.querySelectorAll(".pd-thumbs .thumb").forEach(thumb => {
    thumb.addEventListener("click", () => {
      wrap.querySelectorAll(".pd-thumbs .thumb").forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
      document.querySelector("#pd-main-image").src = thumb.dataset.img;
    });
  });

  // Quantity stepper
  const qtyInput = document.querySelector("#pd-qty-input");
  document.querySelector("#pd-qty-minus").addEventListener("click", () => {
    currentQty = Math.max(1, currentQty - 1);
    qtyInput.value = currentQty;
  });
  document.querySelector("#pd-qty-plus").addEventListener("click", () => {
    currentQty += 1;
    qtyInput.value = currentQty;
  });

  document.querySelector("#pd-add-cart").addEventListener("click", () => {
    addToCart(product.id, currentQty);
  });
  document.querySelector("#pd-buy-now").addEventListener("click", () => {
    addToCart(product.id, currentQty);
    window.location.href = "checkout.html";
  });

  renderRelatedProducts(product);
}

function renderRelatedProducts(product) {
  const relatedGrid = document.querySelector("#related-products-grid");
  if (!relatedGrid) return;
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  relatedGrid.innerHTML = related.length
    ? related.map(productCardHTML).join("")
    : `<p>No related products in this category yet.</p>`;
}

document.addEventListener("DOMContentLoaded", initProductPage);
