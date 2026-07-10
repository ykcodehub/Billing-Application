import db from "../database/db";
import { Product } from "../types/product";

export const ProductService = {

  getAll(): Product[] {
    return db.getAllSync<Product>(
      "SELECT * FROM products ORDER BY id DESC"
    );
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

search(keyword:string){

return db.getAllSync(

`
SELECT *
FROM products
WHERE
name LIKE ?
OR category LIKE ?
ORDER BY id DESC
`,
[
`%${keyword}%`,
`%${keyword}%`
]

);

},

 exists(id: number) {
  return db.getFirstSync(
    "SELECT id FROM products WHERE id=?",
    [id]
  );
}

};
