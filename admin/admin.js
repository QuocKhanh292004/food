// ===== Theme toggle (light / dark)
(function () {
  const themeBtn = document.getElementById("themeBtn");
  const root = document.documentElement;
  const THEME_KEY = "foodie.theme";
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) root.setAttribute("data-theme", saved);
  themeBtn?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "light" ? "" : "light";
    if (next) {
      root.setAttribute("data-theme", next);
    } else {
      root.removeAttribute("data-theme");
    }
    localStorage.setItem(THEME_KEY, next);
  });
})();

// ===== Tiny router (hash-based)
function currentRoute() {
  const h = location.hash.replace("#", "").replace("/", "");
  return h || "overview";
}
function setRouteTitle(name) {
  const map = {
    overview: "Tổng quan",
    orders: "Quản lý đơn hàng",
    products: "Quản lý sản phẩm",
    categories: "Danh mục",
    customers: "Khách hàng",
    coupons: "Mã giảm giá",
    promos: "Khuyến mãi",
    delivery: "Giao hàng",
    riders: "Tài xế",
    analytics: "Phân tích",
    reviews: "Đánh giá",
    banners: "Banner & CMS",
    users: "Người dùng",
    roles: "Phân quyền",
    settings: "Cài đặt hệ thống",
    login: "Đăng nhập",
    cart: "Giỏ hàng",
  };
  const el = document.getElementById("routeTitle");
  if (el) el.textContent = map[name] || "Foodie Admin";
}
function navigate() {
  const name = currentRoute();
  document.querySelectorAll(".route").forEach((el) => {
    el.classList.toggle("active", el.dataset.route === name);
  });
  document.querySelectorAll(".nav a[data-route-link]").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("data-route-link") === name);
  });
  setRouteTitle(name);
}
window.addEventListener("hashchange", navigate);
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".nav a[data-route-link]").forEach((a) => {
    const r = a.getAttribute("data-route-link");
    a.setAttribute("href", "#" + r);
  });
  navigate();
});

// ===== Sidebar (mobile open/close + desktop collapse)
(function () {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const collapseBtn = document.getElementById("collapseBtn");

  // Collapse for desktop
  collapseBtn?.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });

  function openSidebar() {
    if (window.innerWidth >= 1024) return; // desktop không cần open
    sidebar.classList.add("open");
    overlay?.classList.add("active");
    mobileMenuBtn?.classList.add("active");
    mobileMenuBtn?.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeSidebar() {
    sidebar.classList.remove("open");
    overlay?.classList.remove("active");
    mobileMenuBtn?.classList.remove("active");
    mobileMenuBtn?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  function toggleSidebar() {
    sidebar.classList.contains("open") ? closeSidebar() : openSidebar();
  }

  mobileMenuBtn?.addEventListener("click", toggleSidebar);
  overlay?.addEventListener("click", closeSidebar);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar.classList.contains("open"))
      closeSidebar();
  });
  // Auto close when navigate on mobile
  document.querySelectorAll(".nav a").forEach((a) => {
    a.addEventListener("click", () => {
      if (window.innerWidth < 1024) closeSidebar();
    });
  });

  // Reset overlay when resize to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) closeSidebar();
  });
})();

// ===== Quick action
document.getElementById("addDishBtn")?.addEventListener("click", () => {
  location.hash = "#products";
});

// ===== Toast helper
function showToast(message, type = "info", duration = 2200) {
  document.querySelectorAll(".toast").forEach((t) => t.remove());
  const t = document.createElement("div");
  t.className = `toast toast-${type}`;
  t.textContent = message;
  document.body.appendChild(t);
  setTimeout(() => {
    t.remove();
  }, duration);
}

// ===== Login interactions (demo)
(function () {
  const toggleBtn = document.getElementById("togglePassword");
  const pw = document.getElementById("password");
  toggleBtn?.addEventListener("click", () => {
    const isPw = pw.getAttribute("type") === "password";
    pw.setAttribute("type", isPw ? "text" : "password");
    toggleBtn.setAttribute(
      "aria-label",
      isPw ? "Ẩn mật khẩu" : "Hiện mật khẩu"
    );
  });

  const form = document.getElementById("loginForm");
  const btn = form?.querySelector(".login-btn");
  const spinner = document.getElementById("loginSpinner");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    btn.classList.add("loading");
    spinner.style.display = "block";
    setTimeout(() => {
      btn.classList.remove("loading");
      spinner.style.display = "none";
      showToast("Đăng nhập thành công (demo)", "success");
      location.hash = "#overview";
    }, 1200);
  });
})();

// ===== Cart logic
(function () {
  const cart = document.getElementById("cartItems");
  if (!cart) return;

  const itemCountEl = document.getElementById("itemCount");
  const subtotalEl = document.getElementById("subtotal");
  const shippingEl = document.getElementById("shippingFee");
  const discountWrap = document.getElementById("promoDiscount");
  const discountAmountEl = discountWrap?.querySelector(".discount-amount");
  const totalEl = document.getElementById("total");

  const SHIPPING_BASE = 15000;
  let appliedPromos = []; // {code,type,amount}

  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const fmt = (n) => VND.format(n).replace("₫", "₫").replace(/\s/g, "");
  const parsePrice = (text) => {
    const n = text.replace(/[^\d]/g, "");
    return Number(n || 0);
  };

  function getItems() {
    return [...cart.querySelectorAll(".cart-item")].map((item) => {
      const price = parsePrice(
        item.querySelector(".item-price")?.textContent || "0"
      );
      const qty = Number(item.querySelector(".quantity")?.textContent || 0);
      return { el: item, price, qty };
    });
  }

  function calcDiscount(subtotal) {
    let discount = 0;
    appliedPromos.forEach((p) => {
      if (p.type === "percent") discount += Math.round(subtotal * p.amount);
    });
    return discount;
  }

  function updateSummary() {
    const items = getItems();
    const itemCount = items.reduce((s, i) => s + i.qty, 0);
    const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
    const shippingFee =
      appliedPromos.some((p) => p.type === "shipping_free") || subtotal === 0
        ? 0
        : SHIPPING_BASE;
    const discount = calcDiscount(subtotal);
    const total = Math.max(0, subtotal + shippingFee - discount);

    itemCountEl.textContent = itemCount + " món";
    subtotalEl.textContent = fmt(subtotal);
    shippingEl.textContent = fmt(shippingFee);
    if (discount > 0) {
      discountWrap.style.display = "";
      discountAmountEl.textContent = "-" + fmt(discount);
    } else {
      discountWrap.style.display = "none";
    }
    totalEl.textContent = fmt(total);
  }

  function bindQtyButtons(item) {
    const dec = item.querySelector('[data-action="decrease"]');
    const inc = item.querySelector('[data-action="increase"]');
    const qtyEl = item.querySelector(".quantity");

    dec?.addEventListener("click", () => {
      let q = Number(qtyEl.textContent || 0);
      q = Math.max(1, q - 1);
      qtyEl.textContent = String(q);
      updateSummary();
    });
    inc?.addEventListener("click", () => {
      let q = Number(qtyEl.textContent || 0);
      q = Math.min(99, q + 1);
      qtyEl.textContent = String(q);
      updateSummary();
    });
  }

  function bindRemove(item) {
    const btn = item.querySelector(".remove-btn");
    btn?.addEventListener("click", () => {
      item.classList.add("removing");
      setTimeout(() => {
        item.remove();
        updateSummary();
      }, 220);
    });
  }

  // Initial bind
  getItems().forEach((i) => {
    bindQtyButtons(i.el);
    bindRemove(i.el);
  });
  updateSummary();

  // Promo codes
  const promoInput = document.getElementById("promoCode");
  const applyBtn = document.getElementById("applyPromo");
  const appliedWrap = document.getElementById("appliedPromos");

  const KNOWN_PROMOS = {
    FOOD10: { type: "percent", amount: 0.1, label: "Giảm 10% đơn hàng" },
    SHIP0: { type: "shipping_free", amount: 1, label: "Miễn phí giao hàng" },
  };

  function renderPromos() {
    appliedWrap.innerHTML = "";
    appliedPromos.forEach((p) => {
      const chip = document.createElement("div");
      chip.className = "applied-promo";
      chip.innerHTML = `<strong>${p.code}</strong><span>${p.label}</span><button class="promo-remove" aria-label="Gỡ mã" data-code="${p.code}">×</button>`;
      appliedWrap.appendChild(chip);
    });
    appliedWrap.querySelectorAll(".promo-remove").forEach((btn) => {
      btn.addEventListener("click", () => {
        const code = btn.getAttribute("data-code");
        appliedPromos = appliedPromos.filter((x) => x.code !== code);
        showToast(`Đã gỡ mã ${code}`, "info");
        renderPromos();
        updateSummary();
      });
    });
  }

  applyBtn?.addEventListener("click", () => {
    const code = (promoInput.value || "").trim().toUpperCase();
    if (!code) return;
    if (!KNOWN_PROMOS[code]) {
      showToast("Mã không hợp lệ", "error");
      return;
    }
    if (appliedPromos.some((p) => p.code === code)) {
      showToast("Bạn đã áp dụng mã này", "info");
      return;
    }
    appliedPromos.push({ code, ...KNOWN_PROMOS[code] });
    showToast(`Áp dụng mã ${code} thành công`, "success");
    promoInput.value = "";
    renderPromos();
    updateSummary();
  });

  // Checkout demo
  document.getElementById("checkoutBtn")?.addEventListener("click", () => {
    showToast("Thanh toán (demo) thành công!", "success");
  });
})();
