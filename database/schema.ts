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
      autoPrint INTEGER DEFAULT 1,
      theme TEXT DEFAULT 'Light'
    );
  `);

  // -----------------------------
  // Database Migration
  // -----------------------------

  const migrations = [

    "ALTER TABLE settings ADD COLUMN logo TEXT",

    "ALTER TABLE settings ADD COLUMN printerName TEXT",

    "ALTER TABLE settings ADD COLUMN printerMac TEXT",

    "ALTER TABLE settings ADD COLUMN autoPrint INTEGER DEFAULT 1",

    "ALTER TABLE settings ADD COLUMN theme TEXT DEFAULT 'Light'",

  ];

  migrations.forEach((sql) => {

    try {

      db.execSync(sql);

    } catch (e) {
      // Ignore if column already exists
    }

  });

  // -----------------------------
  // Default Settings Row
  // -----------------------------

  db.runSync(`
    INSERT INTO settings (
      storeName,
      address,
      phone,
      logo,
      printerName,
      printerMac,
      autoPrint,
      theme
    )
    SELECT
      'Billing Store',
      '',
      '',
      '',
      '',
      '',
      1,
      'Light'
    WHERE NOT EXISTS (
      SELECT 1 FROM settings
    );
  `);

}