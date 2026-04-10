const DEFAULT_MENU_CONFIG = {
  version: "2026-04-10-full-menu",
  mealSets: [
    { name: "單點", price: 0, pickupPrice: 0 },
    { name: "經典配餐", price: 59, pickupPrice: 55 },
    { name: "勁脆配餐", price: 69, pickupPrice: 65 },
    { name: "豪華配餐", price: 79, pickupPrice: 75 }
  ],
  drinkOptions: [
    { name: "可口可樂(中)", surcharge: 0 },
    { name: "雪碧(中)", surcharge: 0 },
    { name: "檸檬紅茶(中)", surcharge: 0 },
    { name: "玉米濃湯", surcharge: 10 },
    { name: "熱奶茶", surcharge: 12 },
    { name: "美式咖啡(熱)", surcharge: 15 }
  ],
  addons: [
    { name: "雞塊4塊", price: 45, pickupPrice: 42 },
    { name: "小薯", price: 38, pickupPrice: 35 },
    { name: "中薯", price: 49, pickupPrice: 46 },
    { name: "勁辣香雞翅2塊", price: 49, pickupPrice: 46 },
    { name: "蛋捲冰淇淋", price: 18, pickupPrice: 18 },
    { name: "蘋果派", price: 35, pickupPrice: 32 }
  ],
  categories: {
    "早餐": [
      { name: "豬肉滿福堡", price: 49, pickupPrice: 45, slots: ["breakfast"] },
      { name: "豬肉滿福堡加蛋", price: 59, pickupPrice: 55, slots: ["breakfast"] },
      { name: "豬肉蛋堡", price: 55, pickupPrice: 51, slots: ["breakfast"] },
      { name: "滿福堡", price: 45, pickupPrice: 42, slots: ["breakfast"] },
      { name: "火腿蛋堡", price: 52, pickupPrice: 48, slots: ["breakfast"] },
      { name: "薯餅", price: 35, pickupPrice: 32, slots: ["breakfast"] }
    ],
    "牛肉堡": [
      { name: "大麥克", price: 75, pickupPrice: 72, slots: ["regular"] },
      { name: "雙層牛肉吉事堡", price: 65, pickupPrice: 62, slots: ["regular"] },
      { name: "雙層四盎司牛肉堡", price: 119, pickupPrice: 115, slots: ["regular"] },
      { name: "吉事漢堡", price: 39, pickupPrice: 37, slots: ["regular"] },
      { name: "漢堡", price: 35, pickupPrice: 33, slots: ["regular"] }
    ],
    "雞肉與魚堡": [
      { name: "麥香雞", price: 55, pickupPrice: 52, slots: ["regular"] },
      { name: "勁辣雞腿堡", price: 79, pickupPrice: 75, slots: ["regular"] },
      { name: "麥脆鷄腿堡", price: 92, pickupPrice: 88, slots: ["regular"] },
      { name: "麥香魚", price: 52, pickupPrice: 49, slots: ["regular"] },
      { name: "麥克鷄塊(6塊)", price: 69, pickupPrice: 66, slots: ["regular"] }
    ],
    "炸雞與分享": [
      { name: "麥脆雞(1塊)", price: 62, pickupPrice: 59, slots: ["regular"] },
      { name: "麥脆雞(2塊)", price: 119, pickupPrice: 115, slots: ["regular"] },
      { name: "勁辣香雞翅(2塊)", price: 49, pickupPrice: 46, slots: ["regular"] },
      { name: "麥克鷄塊(10塊)", price: 119, pickupPrice: 115, slots: ["regular"] },
      { name: "麥克鷄塊(20塊)", price: 235, pickupPrice: 228, slots: ["regular"] }
    ],
    "點心與甜品": [
      { name: "小薯", price: 38, pickupPrice: 35, slots: ["breakfast", "regular"] },
      { name: "中薯", price: 49, pickupPrice: 46, slots: ["breakfast", "regular"] },
      { name: "大薯", price: 62, pickupPrice: 59, slots: ["breakfast", "regular"] },
      { name: "蛋捲冰淇淋", price: 18, pickupPrice: 18, slots: ["breakfast", "regular"] },
      { name: "蘋果派", price: 35, pickupPrice: 32, slots: ["breakfast", "regular"] },
      { name: "玉米杯", price: 43, pickupPrice: 40, slots: ["breakfast", "regular"] }
    ],
    "飲品": [
      { name: "可口可樂(中)", price: 33, pickupPrice: 30, slots: ["breakfast", "regular"] },
      { name: "雪碧(中)", price: 33, pickupPrice: 30, slots: ["breakfast", "regular"] },
      { name: "檸檬紅茶(中)", price: 38, pickupPrice: 35, slots: ["breakfast", "regular"] },
      { name: "熱奶茶", price: 45, pickupPrice: 42, slots: ["breakfast", "regular"] },
      { name: "美式咖啡(熱)", price: 50, pickupPrice: 47, slots: ["breakfast", "regular"] }
    ]
  }
};

const state = {
  cart: [],
  menuConfig: loadMenuConfig()
};

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function getLocalDateYMD(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

const el = {
  orderDateTime: document.querySelector("#orderDateTimeInput"),
  timeSlotHint: document.querySelector("#timeSlotHint"),
  orderType: document.querySelector("#orderTypeSelect"),
  category: document.querySelector("#categorySelect"),
  item: document.querySelector("#itemSelect"),
  qty: document.querySelector("#qtyInput"),
  set: document.querySelector("#setSelect"),
  drink: document.querySelector("#drinkSelect"),
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
  appsScriptUrl: document.querySelector("#appsScriptUrlInput"),
  saveConfigBtn: document.querySelector("#saveConfigBtn"),
  submitToGoogleBtn: document.querySelector("#submitToGoogleBtn"),
  submitToSheetBtn: document.querySelector("#submitToSheetBtn"),
  menuEditor: document.querySelector("#menuEditor"),
  applyMenuBtn: document.querySelector("#applyMenuBtn"),
  resetMenuBtn: document.querySelector("#resetMenuBtn"),
  dailyStatusInput: document.querySelector("#dailyStatusInput"),
  confirmTodayBtn: document.querySelector("#confirmTodayBtn")
};

function init() {
  setDefaultDateTime();
  renderMenuEditor();
  renderMealSetOptions();
  renderDrinkOptions();
  renderAddonOptions();
  renderCategoryOptions();
  bindEvents();
  loadGoogleConfig();
  refreshDailyStatus();
  refreshCart();
}

function getOrderType() {
  return el.orderType.value || "pickup";
}

function getPriceByOrderType(obj) {
  if (getOrderType() === "pickup") return Number(obj.pickupPrice ?? obj.price ?? 0);
  return Number(obj.price ?? 0);
}

function setDefaultDateTime() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  el.orderDateTime.value = now.toISOString().slice(0, 16);
  refreshTimeSlotHint();
}

function getSelectedDateTime() {
  return el.orderDateTime.value ? new Date(el.orderDateTime.value) : new Date();
}

function getTimeSlot() {
  const d = getSelectedDateTime();
  const minutes = d.getHours() * 60 + d.getMinutes();
  return minutes < 630 ? "breakfast" : "regular";
}

function refreshTimeSlotHint() {
  const slot = getTimeSlot();
  el.timeSlotHint.value = slot === "breakfast" ? "早餐時段（00:00-10:29）" : "全日時段（10:30-23:59）";
}

function renderMenuEditor() {
  el.menuEditor.value = JSON.stringify(state.menuConfig, null, 2);
}

function renderMealSetOptions() {
  el.set.innerHTML = state.menuConfig.mealSets
    .map(set => {
      const price = getPriceByOrderType(set);
      return `<option value="${set.name}">${set.name} (+$${price})</option>`;
    })
    .join("");
}

function renderDrinkOptions() {
  el.drink.innerHTML = state.menuConfig.drinkOptions
    .map(d => `<option value="${d.name}" data-surcharge="${Number(d.surcharge || 0)}">${d.name}${d.surcharge ? ` (+$${d.surcharge})` : ""}</option>`)
    .join("");
}

function renderAddonOptions() {
  el.addonList.innerHTML = state.menuConfig.addons
    .map(addon => {
      const addonPrice = getPriceByOrderType(addon);
      return `
        <label class="addon-item">
          <input type="checkbox" value="${addon.name}" data-price="${addonPrice}">
          <span>${addon.name} (+$${addonPrice})</span>
        </label>
      `;
    })
    .join("");
}

function getAvailableCategories() {
  const slot = getTimeSlot();
  const categories = state.menuConfig.categories;
  return Object.keys(categories).filter(category =>
    categories[category].some(item => item.slots.includes(slot))
  );
}

function renderCategoryOptions() {
  refreshTimeSlotHint();
  const categories = getAvailableCategories();
  el.category.innerHTML = categories.map(c => `<option value="${c}">${c}</option>`).join("");
  if (!categories.length) {
    el.item.innerHTML = "";
    return;
  }
  renderItemOptions();
}

function renderItemOptions() {
  const slot = getTimeSlot();
  const category = el.category.value;
  const items = (state.menuConfig.categories[category] || []).filter(i => i.slots.includes(slot));

  el.item.innerHTML = items
    .map(i => {
      const price = getPriceByOrderType(i);
      return `<option value="${i.name}" data-price="${price}">${i.name} - $${price}${getOrderType() === "pickup" ? "(自取)" : ""}</option>`;
    })
    .join("");
}

function bindEvents() {
  el.orderDateTime.addEventListener("change", () => {
    renderCategoryOptions();
    renderOrderPreview();
  });
  el.orderType.addEventListener("change", () => {
    renderMealSetOptions();
    renderAddonOptions();
    renderItemOptions();
    refreshCart();
  });

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
  el.submitToSheetBtn.addEventListener("click", submitOrderToAppsScript);
  el.applyMenuBtn.addEventListener("click", applyMenuConfigFromEditor);
  el.resetMenuBtn.addEventListener("click", resetMenuConfig);
  el.confirmTodayBtn.addEventListener("click", confirmMenuForToday);
}

function addToCart() {
  const selectedItem = el.item.selectedOptions[0];
  if (!selectedItem) {
    alert("此時段無可用主餐，請調整訂餐時間或更新菜單。");
    return;
  }

  const qty = Math.max(1, Number(el.qty.value) || 1);
  const setObj = state.menuConfig.mealSets.find(x => x.name === el.set.value) || { name: "單點", price: 0, pickupPrice: 0 };
  const setPrice = getPriceByOrderType(setObj);
  const drinkOption = el.drink.selectedOptions[0];
  const drinkName = drinkOption?.value || "未選";
  const drinkSurcharge = Number(drinkOption?.dataset.surcharge || 0);

  const sugar = el.sugar.value;
  const note = el.itemNote.value.trim();

  const selectedAddons = Array.from(el.addonList.querySelectorAll("input:checked")).map(node => ({
    name: node.value,
    price: Number(node.dataset.price)
  }));

  const basePrice = Number(selectedItem.dataset.price);
  const addonPrice = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const itemTotal = (basePrice + setPrice + drinkSurcharge + addonPrice) * qty;

  state.cart.push({
    name: selectedItem.value,
    qty,
    orderType: getOrderType() === "pickup" ? "自取" : "一般",
    setLabel: `${setObj.name} / 飲料: ${drinkName}${drinkSurcharge ? `(+${drinkSurcharge})` : ""}`,
    sugar,
    addons: selectedAddons,
    note,
    itemTotal
  });

  el.itemNote.value = "";
  el.addonList.querySelectorAll("input:checked").forEach(input => {
    input.checked = false;
  });
  refreshCart();
}

function refreshCart() {
  if (!state.cart.length) {
    el.cartList.innerHTML = "<li>尚無餐點</li>";
  } else {
    el.cartList.innerHTML = state.cart.map((item, idx) => {
      const addons = item.addons.length ? `加點: ${item.addons.map(a => `${a.name}(+$${a.price})`).join("、")}` : "加點: 無";
      const note = item.note ? `；備註: ${item.note}` : "";
      return `<li>#${idx + 1} [${item.orderType}] ${item.name} x${item.qty} / ${item.setLabel} / 甜度:${item.sugar} / ${addons}${note} → $${item.itemTotal}</li>`;
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
      `型態: ${item.orderType}`,
      `套餐: ${item.setLabel}`,
      `甜度: ${item.sugar}`,
      `加點: ${addons}`,
      `備註: ${item.note || "無"}`,
      `小計: $${item.itemTotal}`
    ].join(" | ");
  }).join("\n");
}

function renderOrderPreview() {
  el.orderPreview.value = [
    `訂餐時間: ${el.orderDateTime.value || "(未填)"}`,
    `訂單型態: ${getOrderType() === "pickup" ? "自取" : "一般"}`,
    `訂購人: ${el.customerName.value.trim() || "(未填)"}`,
    `電話: ${el.customerPhone.value.trim() || "(未填)"}`,
    `菜單版本: ${state.menuConfig.version}`,
    "---",
    buildOrderText(),
    "---",
    `總金額: $${getTotalPrice()}`,
    `整單備註: ${el.orderNote.value.trim() || "無"}`
  ].join("\n");
}

function saveGoogleConfig() {
  const config = {
    formAction: el.formAction.value.trim(),
    entryName: el.entryName.value.trim(),
    entryPhone: el.entryPhone.value.trim(),
    entryOrder: el.entryOrder.value.trim(),
    entryTotal: el.entryTotal.value.trim(),
    entryMemo: el.entryMemo.value.trim(),
    appsScriptUrl: el.appsScriptUrl.value.trim()
  };
  localStorage.setItem("mcd-google-form-config", JSON.stringify(config));
  alert("已儲存 Google 設定");
}

function loadGoogleConfig() {
  const raw = localStorage.getItem("mcd-google-form-config");
  if (!raw) return;
  try {
    const c = JSON.parse(raw);
    el.formAction.value = c.formAction || "";
    el.entryName.value = c.entryName || "";
    el.entryPhone.value = c.entryPhone || "";
    el.entryOrder.value = c.entryOrder || "";
    el.entryTotal.value = c.entryTotal || "";
    el.entryMemo.value = c.entryMemo || "";
    el.appsScriptUrl.value = c.appsScriptUrl || "";
  } catch {
    localStorage.removeItem("mcd-google-form-config");
  }
}

function validateSubmitBase() {
  if (!state.cart.length) {
    alert("請先加入至少一筆餐點");
    return false;
  }
  return true;
}

async function submitOrderToGoogleForm() {
  if (!validateSubmitBase()) return;

  const required = [
    [el.formAction.value.trim(), "formResponse URL"],
    [el.entryName.value.trim(), "entry - 姓名"],
    [el.entryPhone.value.trim(), "entry - 電話"],
    [el.entryOrder.value.trim(), "entry - 訂單內容"],
    [el.entryTotal.value.trim(), "entry - 總金額"],
    [el.entryMemo.value.trim(), "entry - 備註"]
  ];
  const missing = required.filter(([v]) => !v).map(([, label]) => label);
  if (missing.length) {
    alert(`缺少欄位：${missing.join("、")}`);
    return;
  }

  const params = new URLSearchParams();
  params.append(el.entryName.value.trim(), el.customerName.value.trim() || "未填姓名");
  params.append(el.entryPhone.value.trim(), el.customerPhone.value.trim() || "未填電話");
  params.append(el.entryOrder.value.trim(), el.orderPreview.value);
  params.append(el.entryTotal.value.trim(), String(getTotalPrice()));
  params.append(el.entryMemo.value.trim(), el.orderNote.value.trim() || "無");

  try {
    await fetch(el.formAction.value.trim(), {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: params.toString()
    });
    alert("已送出 Google 表單（若表單有連動試算表，資料會出現在你的 Google Drive 試算表）");
  } catch (error) {
    alert(`送出失敗：${error.message}`);
  }
}

async function submitOrderToAppsScript() {
  if (!validateSubmitBase()) return;
  if (!el.appsScriptUrl.value.trim()) {
    alert("請先填入 Google Apps Script Web App URL");
    return;
  }

  const payload = {
    datetime: el.orderDateTime.value,
    orderType: getOrderType() === "pickup" ? "自取" : "一般",
    customerName: el.customerName.value.trim() || "未填姓名",
    customerPhone: el.customerPhone.value.trim() || "未填電話",
    orderText: buildOrderText(),
    totalPrice: getTotalPrice(),
    orderNote: el.orderNote.value.trim() || "無",
    menuVersion: state.menuConfig.version
  };

  try {
    await fetch(el.appsScriptUrl.value.trim(), {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    alert("已送到 Apps Script，會寫入你 Google Drive 的試算表");
  } catch (error) {
    alert(`送出失敗：${error.message}`);
  }
}

function applyMenuConfigFromEditor() {
  try {
    const parsed = JSON.parse(el.menuEditor.value);
    validateMenuConfig(parsed);
    state.menuConfig = parsed;
    localStorage.setItem("mcd-menu-config", JSON.stringify(parsed));

    renderMealSetOptions();
    renderDrinkOptions();
    renderAddonOptions();
    renderCategoryOptions();
    refreshDailyStatus();
    refreshCart();
    alert("已套用新菜單設定");
  } catch (error) {
    alert(`菜單格式錯誤：${error.message}`);
  }
}

function resetMenuConfig() {
  state.menuConfig = deepClone(DEFAULT_MENU_CONFIG);
  localStorage.removeItem("mcd-menu-config");
  renderMenuEditor();
  renderMealSetOptions();
  renderDrinkOptions();
  renderAddonOptions();
  renderCategoryOptions();
  refreshDailyStatus();
  refreshCart();
  alert("已還原預設菜單");
}

function loadMenuConfig() {
  const raw = localStorage.getItem("mcd-menu-config");
  if (!raw) return deepClone(DEFAULT_MENU_CONFIG);
  try {
    const parsed = JSON.parse(raw);
    validateMenuConfig(parsed);
    return parsed;
  } catch {
    localStorage.removeItem("mcd-menu-config");
    return deepClone(DEFAULT_MENU_CONFIG);
  }
}

function validateMenuConfig(config) {
  if (!config || typeof config !== "object") throw new Error("必須是物件");
  if (!Array.isArray(config.mealSets)) throw new Error("mealSets 必須是陣列");
  if (!Array.isArray(config.drinkOptions)) throw new Error("drinkOptions 必須是陣列");
  if (!Array.isArray(config.addons)) throw new Error("addons 必須是陣列");
  if (!config.categories || typeof config.categories !== "object") throw new Error("categories 必須是物件");
}

function confirmMenuForToday() {
  const today = getLocalDateYMD();
  localStorage.setItem("mcd-menu-confirmed-date", today);
  localStorage.setItem("mcd-menu-confirmed-version", state.menuConfig.version || "未填版本");
  refreshDailyStatus();
  alert("已完成今日菜單與價格確認");
}

function refreshDailyStatus() {
  const today = getLocalDateYMD();
  const confirmedDate = localStorage.getItem("mcd-menu-confirmed-date") || "尚未確認";
  const confirmedVersion = localStorage.getItem("mcd-menu-confirmed-version") || "尚未確認";
  if (confirmedDate === today) {
    el.dailyStatusInput.value = `今日(${today})已確認，版本：${confirmedVersion}`;
  } else {
    el.dailyStatusInput.value = `尚未確認今日(${today})菜單與金額，最近確認：${confirmedDate}`;
  }
}

init();
