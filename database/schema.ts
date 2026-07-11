import db from "./db";

export function initializeDatabase() {

  db.execSync(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT,
      price REAL NOT NULL,
      stock INTEGER DEFAULT 0,
      image TEXT,
      barcode TEXT,
      favorite INTEGER DEFAULT 0,
      createdAt TEXT
    );

    CREATE TABLE IF NOT EXISTS bills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      billNo TEXT,
      total REAL,
      paymentMode TEXT,
      customerName TEXT,
      billType TEXT,
      createdAt TEXT
    );

    CREATE TABLE IF NOT EXISTS bill_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      billId INTEGER,
      productId INTEGER,
      qty INTEGER,
      price REAL
    );

    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      storeName TEXT,
      address TEXT,
      phone TEXT,
      logo TEXT,
      printerName TEXT,
      printerMac TEXT,
      autoPrint INTEGER DEFAULT 1
    );
  `);

  // Insert default settings row only once
  db.runSync(`
    INSERT INTO settings (
      storeName,
      address,
      phone,
      logo,
      printerName,
      printerMac,
      autoPrint
    )
    SELECT
      'Billing Store',
      '',
      '',
      '',
      '',
      '',
      1
    WHERE NOT EXISTS (
      SELECT 1 FROM settings
    );
  `);

}