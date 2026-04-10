# 台灣麥當勞 Web 點餐系統（GitHub Pages 版）

這是一個純前端（HTML/CSS/JS）點餐系統，可直接部署到 **GitHub Pages** 使用，不需要後端。

## 功能
- 依訂餐時間自動切換早餐 / 全日時段菜單
- 含較完整餐點分類，可單點、可選套餐
- 套餐可替換飲料（含加價飲品）
- 支援「自取金額」與一般金額
- 可編輯菜單後台（JSON）
- 每日菜單/價格確認狀態
- 串接 Google 表單（可連動 Google 試算表）
- 串接 Google Apps Script（直接寫入你 Google Drive 的試算表）

## 直接部署到 GitHub Pages
1. 將以下檔案放在 repo root：
   - `index.html`
   - `styles.css`
   - `app.js`
2. 到 GitHub 倉庫設定：
   - `Settings` → `Pages`
   - `Build and deployment` 選擇 `Deploy from a branch`
   - Branch 選 `main`（或你的分支）+ `/root`
3. 儲存後等待部署完成，開啟 GitHub Pages 網址即可使用。

## 記錄到 Google Drive 的方式
### 方式 A：Google 表單（最簡單）
1. 建立 Google 表單並連結到 Google 試算表。
2. 取得 `formResponse` URL 與各欄位 `entry.xxxxx`。
3. 填入頁面對應欄位後送出。
4. 訂單會進入該表單對應的 Google Drive 試算表。

### 方式 B：Google Apps Script（直接寫表）
1. 在 Google 試算表建立 Apps Script，部署為 Web App（可接收 POST）。
2. 將 Web App URL 填入頁面 `Apps Script Web App URL`。
3. 按「送出到 Google 試算表」，即會將 JSON 訂單寫入你 Drive 內的試算表。

## 注意
- 菜單與設定儲存在瀏覽器 `localStorage`，不同裝置不會自動同步。
- 若麥當勞有新餐點或價格異動，請在「可編輯菜單後台」更新 JSON 並按每日確認。
