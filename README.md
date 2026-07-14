# 🧾 BillingApp

A modern offline-first Billing & POS application built using **React Native**, **Expo**, **TypeScript**, and **SQLite**. The app allows users to manage products, generate bills, print receipts via Bluetooth thermal printers, and maintain billing history without requiring an internet connection.

---

## ✨ Features

- 📦 Product Management
- 🛒 Normal Billing
- ⚡ Quick Billing
- 🧾 Bill History
- 🖨️ Bluetooth Thermal Printing
- 🔄 Auto Print Support
- 📄 Receipt Preview
- 📑 PDF Receipt Generation
- 💾 Offline SQLite Database
- ⚙️ Store Settings
- 🔗 Bluetooth Printer Management

---

## 📱 Download Android APK

You can download and install the latest Android APK directly from this repository.

👉 **Download APK:** [BillingApp.apk](apk/BillingApp.apk)

### Installation

1. Download the APK.
2. Enable **Install from Unknown Sources** if prompted.
3. Install the APK.
4. Open the app and start using it.

> **Note:** This application is currently available only for Android.

---

## 📱 Screenshots

<table>

<tr>
<td align="center">
<b>1. Dashboard</b><br><br>
<img src="assets/screenshots/dashboard.jpeg" width="210", height="400">
</td>

<td align="center">
<b>2. Add Product</b><br><br>
<img src="assets/screenshots/addProduct.jpeg" width="210", height="400">
</td>

<td align="center">
<b>3. Products</b><br><br>
<img src="assets/screenshots/products.jpeg" width="210", height="400">
</td>

<td align="center">
<b>4. Normal Billing</b><br><br>
<img src="assets/screenshots/checkout.jpeg" width="210", height="400">
</td
</tr>

<tr>
<td align="center">
<b>5. Quick Billing</b><br><br>
<img src="assets/screenshots/quickBIll.jpeg" width="210", height="400">
</td>

<td align="center">
<b>6. History</b><br><br>
<img src="assets/screenshots/history.jpeg" width="210", height="400">
</td>

<td align="center">
<b>7. Sales Reports</b><br><br>
<img src="assets/screenshots/report1.jpeg" width="210", height="400">
</td>

<td align="center">
<b>8. CSV Reports</b><br><br>
<img src="assets/screenshots/report2.jpeg" width="210", height="400">
</td>
</tr>

<tr>
<td align="center">
<b>9. Receipt Preview</b><br><br>
<img src="assets/screenshots/receipt.jpeg" width="210", height="400">
</td>

<td align="center">
<b>10. Store Settings</b><br><br>
<img src="assets/screenshots/setting1.jpeg" width="210", height="400">
</td>

<td align="center">
<b>11. Printer Settings</b><br><br>
<img src="assets/screenshots/setting2.jpeg" width="210", height="400">
</td>

<td align="center">
<b>12. About</b><br><br>
<img src="assets/screenshots/about.jpeg" width="210", height="400">
</td>
</tr>

</table>

---

## 🛠️ Tech Stack

- React Native
- Expo SDK 54
- TypeScript
- Expo Router
- Expo SQLite
- AsyncStorage
- React Native Bluetooth Classic
- Expo Print
- Expo Sharing

---

# 📂 Project Structure

```
BillingApp/

├── app/
├── assets/
├── components/
├── database/
├── services/
├── screenshots/
├── package.json
└── README.md
```

---

# 🚀 Getting Started

## 1. Clone Repository

```bash
git clone https://github.com/ykcodehub/Billing-Application.git

cd BillingApp
```

---

## 2. Install Dependencies

```bash
npm install
```

or

```bash
npm install --legacy-peer-deps
```

---

## 3. Start Development Server

```bash
npx expo start
```

---

## 4. Run on Android

```bash
npx expo run:android
```

---

## 5. Build APK

```bash
eas build -p android --profile preview
```

---

# 📦 Required Permissions

Android permissions used:

- Bluetooth
- Bluetooth Scan
- Bluetooth Connect
- Location (for Bluetooth discovery)

---

# 📌 Current Features

- Offline Billing
- Product CRUD
- Bill History
- Receipt Preview
- Bluetooth Printer Connection
- Auto Print
- Quick Billing
- PDF Receipt
- Store Settings

---

# 🔮 Future Improvements

- GST Support
- Barcode Scanner
- Customer Management
- Sales Reports
- Cloud Backup
- Dark Theme
- Logo Printing on Thermal Receipt

---

# 👨‍💻 Author

**Yogendra Katuwal**

Bachelor of Technology (Computer Science & Engineering)

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
