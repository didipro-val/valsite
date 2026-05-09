const products = [
  {
    id: "soline",
    name: "Bracelet Soline",
    category: "bijoux",
    tag: "Bijoux",
    price: 28,
    image: "https://source.unsplash.com/900x1100/?handmade,bracelet",
    description: "Bracelet delicat pense pour les superpositions legeres."
  },
  {
    id: "aube",
    name: "Boucles Aube",
    category: "bijoux",
    tag: "Bijoux",
    price: 34,
    image: "https://source.unsplash.com/900x1100/?artisan,earrings",
    description: "Une paire lumineuse pour accompagner les tenues simples."
  },
  {
    id: "maison",
    name: "Suspension Maison",
    category: "deco",
    tag: "Deco",
    price: 42,
    image: "https://source.unsplash.com/900x1100/?handmade,home,decor",
    description: "Piece murale douce pour rechauffer une entree ou une chambre."
  },
  {
    id: "rituel",
    name: "Coffret Rituel",
    category: "cadeaux",
    tag: "Cadeaux",
    price: 49,
    image: "https://source.unsplash.com/900x1100/?handmade,gift,box",
    description: "Un ensemble pret a offrir avec une attention personnalisable."
  },
  {
    id: "terre",
    name: "Vide-poche Terre",
    category: "deco",
    tag: "Deco",
    price: 31,
    image: "https://source.unsplash.com/900x1100/?ceramic,tray,handmade",
    description: "Petit objet utile pour bijoux, cles ou tresors du quotidien."
  },
  {
    id: "muse",
    name: "Pochette Muse",
    category: "cadeaux",
    tag: "Cadeaux",
    price: 26,
    image: "https://source.unsplash.com/900x1100/?handmade,pouch,textile",
    description: "Pochette textile douce pour glisser un mot, un bijou ou un secret."
  }
];

const cart = new Map();
const productGrid = document.querySelector("[data-products]");
const cartPanel = document.querySelector("[data-cart-panel]");
const overlay = document.querySelector("[data-overlay]");
const cartItems = document.querySelector("[data-cart-items]");
const cartCount = document.querySelector("[data-cart-count]");
const cartTotal = document.querySelector("[data-cart-total]");
const form = document.querySelector("[data-checkout-form]");
const formNote = document.querySelector("[data-form-note]");

function euro(amount) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(amount);
}

function renderProducts(filter = "all") {
  const visibleProducts =
    filter === "all" ? products : products.filter((product) => product.category === filter);

  productGrid.innerHTML = visibleProducts
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
          </div>
          <div class="product-content">
            <div class="product-meta">
              <span class="product-tag">${product.tag}</span>
              <span class="price">${euro(product.price)}</span>
            </div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <button class="button primary" type="button" data-add="${product.id}">
              Ajouter au panier
            </button>
          </div>
        </article>
      `
    )
    .join("");
}

function updateCart() {
  const rows = [...cart.values()];
  const totalQuantity = rows.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = rows.reduce((sum, item) => sum + item.quantity * item.price, 0);

  cartCount.textContent = totalQuantity;
  cartTotal.textContent = euro(totalPrice);

  if (!rows.length) {
    cartItems.innerHTML = '<p class="empty-cart">Ton panier est vide pour le moment.</p>';
    return;
  }

  cartItems.innerHTML = rows
    .map(
      (item) => `
        <div class="cart-row">
          <img src="${item.image}" alt="${item.name}">
          <div>
            <p>${item.name}</p>
            <small>${euro(item.price)} l'unite</small>
          </div>
          <div class="qty-controls" aria-label="Quantite pour ${item.name}">
            <button type="button" data-decrease="${item.id}" aria-label="Retirer une unite">-</button>
            <strong>${item.quantity}</strong>
            <button type="button" data-increase="${item.id}" aria-label="Ajouter une unite">+</button>
          </div>
        </div>
      `
    )
    .join("");
}

function addToCart(id) {
  const product = products.find((item) => item.id === id);
  const existing = cart.get(id);

  cart.set(id, {
    ...product,
    quantity: existing ? existing.quantity + 1 : 1
  });

  updateCart();
  openCart();
}

function changeQuantity(id, direction) {
  const item = cart.get(id);
  if (!item) return;

  const quantity = item.quantity + direction;
  if (quantity <= 0) {
    cart.delete(id);
  } else {
    cart.set(id, { ...item, quantity });
  }

  updateCart();
}

function openCart() {
  cartPanel.classList.add("open");
  overlay.classList.add("open");
  cartPanel.setAttribute("aria-hidden", "false");
}

function closeCart() {
  cartPanel.classList.remove("open");
  overlay.classList.remove("open");
  cartPanel.setAttribute("aria-hidden", "true");
}

document.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add]");
  const filterButton = event.target.closest("[data-filter]");
  const increaseButton = event.target.closest("[data-increase]");
  const decreaseButton = event.target.closest("[data-decrease]");

  if (addButton) addToCart(addButton.dataset.add);

  if (filterButton) {
    document.querySelectorAll("[data-filter]").forEach((button) => {
      button.classList.toggle("active", button === filterButton);
    });
    renderProducts(filterButton.dataset.filter);
  }

  if (increaseButton) changeQuantity(increaseButton.dataset.increase, 1);
  if (decreaseButton) changeQuantity(decreaseButton.dataset.decrease, -1);

  if (event.target.closest(".cart-toggle")) openCart();
  if (event.target.closest("[data-close-cart]") || event.target === overlay) closeCart();
  if (event.target.closest("[data-close-cart-link]")) closeCart();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const totalQuantity = [...cart.values()].reduce((sum, item) => sum + item.quantity, 0);
  formNote.textContent = totalQuantity
    ? "Demande preparee. Le paiement reste volontairement simule pour cette version."
    : "Ajoute au moins une piece au panier avant de finaliser la demande.";
});

renderProducts();
updateCart();
