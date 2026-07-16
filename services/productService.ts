import db from "../database/db";
import { Product } from "../types/product";

export const ProductService = {

  getAll(): Product[] {
  return db.getAllSync<Product>(`
    SELECT *
    FROM products
    ORDER BY name COLLATE NOCASE
  `);
},

  getById(id: number) {
    return db.getFirstSync<Product>(
      "SELECT * FROM products WHERE id=?",
      [id]
    );
  },

  add(product: Product) {
    db.runSync(
      `INSERT INTO products
      (name,category,price,stock,image,barcode,favorite,createdAt)
      VALUES(?,?,?,?,?,?,?,?)`,
      [
        product.name,
        product.category,
        product.price,
        product.stock,
        product.image ?? "",
        product.barcode ?? "",
        product.favorite ?? 0,
        new Date().toISOString(),
      ]
    );
  },

  update(id: number, product: Product) {
    db.runSync(
      `UPDATE products
      SET
      name=?,
      category=?,
      price=?,
      stock=?,
      image=?,
      barcode=?,
      favorite=?
      WHERE id=?`,
      [
        product.name,
        product.category,
        product.price,
        product.stock,
        product.image ?? "",
        product.barcode ?? "",
        product.favorite ?? 0,
        id,
      ]
    );
  },

  delete(id: number) {
  db.runSync(
    "DELETE FROM products WHERE id=?",
    [id]
  );
 },
 
count() {
  const result = db.getFirstSync<{ count: number }>(
    `
    SELECT COUNT(*) as count
    FROM products
    `
  );

  return result?.count ?? 0;
},

search(keyword: string) {

  const value = `%${keyword}%`;

  return db.getAllSync<Product>(`
    SELECT *
    FROM products
    WHERE
      name LIKE ?
      OR category LIKE ?
      OR CAST(price AS TEXT) LIKE ?
      OR CAST(stock AS TEXT) LIKE ?
    ORDER BY name COLLATE NOCASE
  `,
  [
    value,
    value,
    value,
    value,
  ]);

},

  getCategories() {

  return db.getAllSync<{
    category: string;
  }>(`
    SELECT DISTINCT category
    FROM products
    WHERE
      category IS NOT NULL
      AND TRIM(category) != ''
    ORDER BY category COLLATE NOCASE
  `);

},

 exists(id: number) {
  return db.getFirstSync(
    "SELECT id FROM products WHERE id=?",
    [id]
  );
}

};
