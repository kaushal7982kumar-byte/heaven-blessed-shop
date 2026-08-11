# Heaven Blessed Shop

A complete, static, mobile-friendly e-commerce website built with plain HTML, CSS and JavaScript (no backend, no database). Orders are collected through a simple cart + checkout flow and delivered to your inbox using EmailJS. Designed to run for free on GitHub Pages.

---

## 1. How to Run the Website

**Option A — just open it:**
Double-click `index.html` to open it in your browser. Most of the site works this way, but browsers sometimes block local file requests — if something looks off, use Option B.

**Option B — local server (recommended):**
1. Install [VS Code](https://code.visualstudio.com/) and the **Live Server** extension, or
2. If you have Python installed, open a terminal in the project folder and run:
   ```
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000` in your browser.

---

## 2. How to Add or Change Products

All product data lives in **`js/products.js`** inside one array called `PRODUCTS`.

To add a new product, copy an existing object and edit it:
```js
{
  id: "hb-015",                 // must be unique
  name: "New Product Name",
  category: "Gifts",            // must match one of the 4 categories exactly
  price: 799,
  oldPrice: null,                // or a number to show a strikethrough price
  rating: 4.5,
  featured: false,               // true = shows on homepage
  isSampleImage: true,           // true = shows a "Sample" badge
  description: "Short product description.",
  features: [ "Feature one", "Feature two" ],
  images: [ "assets/images/products/your-image.jpg" ]
}
```
Save the file — the homepage, shop page, product page and cart all read from this same list automatically.

## 3. How to Change Prices

Open `js/products.js`, find the product, and edit its `price` and `oldPrice` values. Prices are plain numbers (no ₹ symbol) — the website formats them automatically.

## 4. How to Replace Images

See `assets/images/README.txt` for full details. Short version:
1. Save your photos inside `assets/images/products/`.
2. In `js/products.js`, replace the URL(s) in that product's `images` array with your local file path.
3. For the homepage hero photo, save it as `assets/images/hero.jpg`.

## 5. How to Configure EmailJS (required for orders to arrive by email)

1. Create a free account at [emailjs.com](https://www.emailjs.com).
2. **Add an Email Service** (e.g. connect your Gmail) — this gives you a **Service ID**.
3. **Create an Email Template.** Use these variable names in your template so they match the code:
   `order_id`, `order_date`, `customer_name`, `customer_mobile`, `customer_email`, `address`, `city`, `state`, `pincode`, `notes`, `items_summary`, `subtotal`, `delivery_note`, `grand_total`, `to_email`.
4. Copy your **Public Key** from EmailJS → Account → API Keys.
5. Open `js/checkout.js` and paste your three values at the top:
   ```js
   const EMAILJS_PUBLIC_KEY  = "your_public_key_here";
   const EMAILJS_SERVICE_ID  = "your_service_id_here";
   const EMAILJS_TEMPLATE_ID = "your_template_id_here";
   ```
6. Save the file. Orders will now be emailed to `kaushalblessing633@gmail.com` when a customer clicks **Place Order**.

⚠️ Only ever paste your **Public Key** here. Never put your EmailJS private key in this file — it isn't needed for sending from the browser.

## 6. How to Test an Order

1. Add one or more products to your cart from the shop page.
2. Go to the cart, then click **Proceed to Checkout**.
3. Fill in the delivery form and click **Place Order**.
4. If EmailJS is configured correctly, you'll see the "Order Placed Successfully" screen with an Order ID, and the order email will land in `kaushalblessing633@gmail.com` shortly after.
5. If EmailJS isn't configured yet, the form will tell you that clearly instead of pretending the order was sent.

## 7. How to Create a GitHub Repository

1. Go to [github.com](https://github.com) and log in (or create a free account).
2. Click the **+** icon (top right) → **New repository**.
3. Name it `heaven-blessed-shop` (or any name you like), keep it **Public**, and click **Create repository**.

## 8. How to Upload the Files

**Easiest way (browser only, no Git needed):**
1. Open your new repository on GitHub.
2. Click **"uploading an existing file"** (or **Add file → Upload files**).
3. Drag the entire contents of the `heaven-blessed-shop` folder into the browser window.
4. Scroll down and click **Commit changes**.

## 9. How to Enable GitHub Pages

1. In your repository, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Under **Branch**, choose `main` and folder `/ (root)`, then click **Save**.
4. Wait 1–2 minutes for GitHub to publish the site.

## 10. How to Get the Live Website URL

Refresh the **Settings → Pages** screen — GitHub will show a link like:
```
https://YOUR-GITHUB-USERNAME.github.io/heaven-blessed-shop/
```
That's your live store link. Update this same URL inside `robots.txt` and `sitemap.xml` (replace `YOUR-GITHUB-USERNAME`).

## 11. How to Connect a Custom Domain Later

1. Buy a domain from any registrar (GoDaddy, Namecheap, etc.).
2. In your domain's DNS settings, add a **CNAME record** pointing to `YOUR-GITHUB-USERNAME.github.io`.
3. In GitHub → **Settings → Pages → Custom domain**, enter your domain and save.
4. Wait for DNS to propagate (can take a few hours), then enable **Enforce HTTPS**.

---

## Project Structure

```
heaven-blessed-shop/
├── index.html            Homepage
├── shop.html              Product listing with search, filter & sort
├── product.html            Single product details page
├── cart.html               Shopping cart
├── checkout.html           Checkout form + order success screen
├── about.html               About the store
├── contact.html              Contact page
├── privacy-policy.html
├── terms.html
├── css/style.css            All site styling
├── js/
│   ├── products.js          Product catalogue (edit here to add products)
│   ├── main.js               Shared logic: navbar, cart storage, homepage, shop filters
│   ├── cart.js                Cart page rendering
│   ├── product.js             Product details page rendering
│   └── checkout.js             Checkout validation + EmailJS order submission
├── assets/images/            Hero & product images (with local-fallback instructions)
├── robots.txt
├── sitemap.xml
└── README.md
```

## What's Already Built vs What's Future-Ready

**Working now:** browsing, search, filtering, sorting, product details, cart (persists via LocalStorage), checkout form with validation, EmailJS order emails, order confirmation screen, mobile-responsive layout down to 360px.

**Not implemented yet (structured so you can add later):** UPI/Razorpay online payment, Cash on Delivery, WhatsApp order notifications, a real backend/database, an admin dashboard, customer accounts, coupons, reviews, and a wishlist. The demo "Save for later" heart button and newsletter form are placeholders for this reason.

## Important Business Note

This site currently works as an **order-request** website, not a fully paid checkout: customers submit their order and delivery details, which are emailed to you, and you personally confirm the order and payment afterward. No online payment is collected at this stage.
