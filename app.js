const MENU = {
  "超值全餐": [
    { name: "大麥克", price: 75 },
    { name: "雙層牛肉吉事堡", price: 65 },
    { name: "麥香雞", price: 55 },
    { name: "麥克雞塊(6塊)", price: 69 }
  ],
  "早餐": [
    { name: "豬肉滿福堡", price: 49 },
    { name: "豬肉滿福堡加蛋", price: 59 },
    { name: "火腿蛋堡", price: 52 },
    { name: "薯餅", price: 35 }
  ],
  "炸雞與分享": [
    { name: "麥脆雞(1塊)", price: 62 },
    { name: "勁辣香雞翅(2塊)", price: 49 },
    { name: "麥克雞塊(10塊)", price: 119 }
  ],
  "點心與甜品": [
    { name: "小薯", price: 38 },
    { name: "中薯", price: 49 },
    { name: "大薯", price: 62 },
    { name: "蛋捲冰淇淋", price: 18 },
    { name: "蘋果派", price: 35 }
  ],
  "飲品": [
    { name: "可口可樂(中)", price: 33 },
    { name: "雪碧(中)", price: 33 },
    { name: "檸檬紅茶(中)", price: 38 },
    { name: "熱奶茶", price: 45 },
    { name: "玉米濃湯", price: 40 }
  ]
};

const ADDONS = [
  { name: "雞塊4塊", price: 45 },
  { name: "小薯", price: 38 },
  { name: "勁辣香雞翅2塊", price: 49 },
  { name: "蛋捲冰淇淋", price: 18 },
  { name: "蘋果派", price: 35 }
];

const state = {
  cart: []
};

const el = {
  category: document.querySelector("#categorySelect"),
  item: document.querySelector("#itemSelect"),
  qty: document.querySelector("#qtyInput"),
  set: document.querySelector("#setSelect"),
  sugar: document.querySelector("#drinkSugarSelect"),
  addonList: document.querySelector("#addonList"),
  itemNote: document.querySelector("#itemNoteInput"),
  addToCartBtn: document.querySelector("#addToCartBtn"),
  cartList: document.querySelector("#cartList"),
  totalPrice: document.querySelector("#totalPrice"),
  clearCartBtn: document.querySelector("#clearCartBtn"),
  customerName: document.querySelector("#customerNameInput"),
  customerPhone: document.querySelector("#customerPhoneInput"),
  orderNote: document.querySelector("#orderNoteInput"),
  orderPreview: document.querySelector("#orderPreview"),
  formAction: document.querySelector("#formActionInput"),
  entryName: document.querySelector("#entryNameInput"),
  entryPhone: document.querySelector("#entryPhoneInput"),
  entryOrder: document.querySelector("#entryOrderInput"),
  entryTotal: document.querySelector("#entryTotalInput"),
  entryMemo: document.querySelector("#entryMemoInput"),
  saveConfigBtn: document.querySelector("#saveConfigBtn"),
  submitToGoogleBtn: document.querySelector("#submitToGoogleBtn")
};

function init() {
  renderCategoryOptions();
  renderAddonOptions();
  bindEvents();
  loadGoogleConfig();
  refreshCart();
}

function renderCategoryOptions() {
  const categories = Object.keys(MENU);
  el.category.innerHTML = categories.map(c => `<option value="${c}">${c}</option>`).join("");
  renderItemOptions();
}

function renderItemOptions() {
  const category = el.category.value;
  const items = MENU[category] || [];
  el.item.innerHTML = items
    .map(i => `<option value="${i.name}" data-price="${i.price}">${i.name} - $${i.price}</option>`)
    .join("");
}

function renderAddonOptions() {
  el.addonList.innerHTML = ADDONS.map(addon => `
    <label class="addon-item">
      <input type="checkbox" value="${addon.name}" data-price="${addon.price}">
      <span>${addon.name} (+$${addon.price})</span>
    </label>
  `).join("");
}

function bindEvents() {
  el.category.addEventListener("change", renderItemOptions);
  el.addToCartBtn.addEventListener("click", addToCart);
  el.clearCartBtn.addEventListener("click", () => {
    state.cart = [];
    refreshCart();
  });

  [el.customerName, el.customerPhone, el.orderNote].forEach(input => {
    input.addEventListener("input", renderOrderPreview);
  });

  el.saveConfigBtn.addEventListener("click", saveGoogleConfig);
  el.submitToGoogleBtn.addEventListener("click", submitOrderToGoogleForm);
}

function addToCart() {
  const selected = el.item.selectedOptions[0];
  if (!selected) return;

  const name = selected.value;
  const basePrice = Number(selected.dataset.price);
  const qty = Math.max(1, Number(el.qty.value) || 1);
  const setPrice = Number(el.set.value);
  const setLabel = el.set.selectedOptions[0].textContent;
  const sugar = el.sugar.value;
  const note = el.itemNote.value.trim();

  const selectedAddons = Array.from(el.addonList.querySelectorAll("input:checked")).map(node => ({
    name: node.value,
    price: Number(node.dataset.price)
  }));

  const addonPrice = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const itemTotal = (basePrice + setPrice + addonPrice) * qty;

  state.cart.push({
    name,
    basePrice,
    qty,
    setLabel,
    setPrice,
    sugar,
    addons: selectedAddons,
    note,
    itemTotal
  });

  el.itemNote.value = "";
  el.addonList.querySelectorAll("input:checked").forEach(input => { input.checked = false; });
  refreshCart();
}

function refreshCart() {
  if (!state.cart.length) {
    el.cartList.innerHTML = "<li>尚無餐點</li>";
  } else {
    el.cartList.innerHTML = state.cart.map((item, idx) => {
      const addons = item.addons.length
        ? `加點: ${item.addons.map(a => `${a.name}(+$${a.price})`).join("、")}`
        : "加點: 無";
      const note = item.note ? `；備註: ${item.note}` : "";
      return `<li>#${idx + 1} ${item.name} x${item.qty} / ${item.setLabel} / 甜度:${item.sugar} / ${addons}${note} → $${item.itemTotal}</li>`;
    }).join("");
  }

  el.totalPrice.textContent = `$${getTotalPrice()}`;
  renderOrderPreview();
}

function getTotalPrice() {
  return state.cart.reduce((sum, item) => sum + item.itemTotal, 0);
}

function buildOrderText() {
  if (!state.cart.length) return "(空訂單)";

  return state.cart.map((item, idx) => {
    const addons = item.addons.length ? item.addons.map(a => `${a.name}(+$${a.price})`).join("、") : "無";
    return [
      `#${idx + 1} ${item.name} x${item.qty}`,
      `套餐: ${item.setLabel}`,
      `甜度: ${item.sugar}`,
      `加點: ${addons}`,
      `備註: ${item.note || "無"}`,
      `小計: $${item.itemTotal}`
    ].join(" | ");
  }).join("\n");
}

function renderOrderPreview() {
  const preview = [
    `訂購人: ${el.customerName.value.trim() || "(未填)"}`,
    `電話: ${el.customerPhone.value.trim() || "(未填)"}`,
    "---",
    buildOrderText(),
    "---",
    `總金額: $${getTotalPrice()}`,
    `整單備註: ${el.orderNote.value.trim() || "無"}`
  ].join("\n");

  el.orderPreview.value = preview;
}

function saveGoogleConfig() {
  const config = {
    formAction: el.formAction.value.trim(),
    entryName: el.entryName.value.trim(),
    entryPhone: el.entryPhone.value.trim(),
    entryOrder: el.entryOrder.value.trim(),
    entryTotal: el.entryTotal.value.trim(),
    entryMemo: el.entryMemo.value.trim()
  };
  localStorage.setItem("mcd-google-form-config", JSON.stringify(config));
  alert("已儲存 Google 表單設定");
}

function loadGoogleConfig() {
  const raw = localStorage.getItem("mcd-google-form-config");
  if (!raw) return;

  try {
    const config = JSON.parse(raw);
    el.formAction.value = config.formAction || "";
    el.entryName.value = config.entryName || "";
    el.entryPhone.value = config.entryPhone || "";
    el.entryOrder.value = config.entryOrder || "";
    el.entryTotal.value = config.entryTotal || "";
    el.entryMemo.value = config.entryMemo || "";
  } catch {
    localStorage.removeItem("mcd-google-form-config");
  }
}

async function submitOrderToGoogleForm() {
  if (!state.cart.length) {
    alert("請先加入至少一筆餐點");
    return;
  }

  const required = [
    [el.formAction.value.trim(), "formResponse URL"],
    [el.entryName.value.trim(), "entry - 姓名"],
    [el.entryPhone.value.trim(), "entry - 電話"],
    [el.entryOrder.value.trim(), "entry - 訂單內容"],
    [el.entryTotal.value.trim(), "entry - 總金額"],
    [el.entryMemo.value.trim(), "entry - 備註"]
  ];

  const missing = required.filter(([value]) => !value).map(([, label]) => label);
  if (missing.length) {
    alert(`缺少欄位：${missing.join("、")}`);
    return;
  }

  const params = new URLSearchParams();
  params.append(el.entryName.value.trim(), el.customerName.value.trim() || "未填姓名");
  params.append(el.entryPhone.value.trim(), el.customerPhone.value.trim() || "未填電話");
  params.append(el.entryOrder.value.trim(), buildOrderText());
  params.append(el.entryTotal.value.trim(), String(getTotalPrice()));
  params.append(el.entryMemo.value.trim(), el.orderNote.value.trim() || "無");

  try {
    await fetch(el.formAction.value.trim(), {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: params.toString()
    });

    alert("訂單已送出（Google 表單端若有設定成功，會在表單回應看到資料）");
  } catch (error) {
    alert(`送出失敗：${error.message}`);
  }
}

init();
