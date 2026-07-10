import db from "./db";

export const ProductDB = {

  getAll() {
    return db.getAllSync(
      "SELECT * FROM products ORDER BY name ASC"
    );
  },

  add(
    name: string,
    price: number,
    category: string,
    stock: number,
    image: string
  ) {
    db.runSync(
      `INSERT INTO products
      (name,price,category,stock,image)
      VALUES (?,?,?,?,?)`,
      [name, price, category, stock, image]
    );
  },

  update(
    id: number,
    name: string,
    price: number,
    category: string,
    stock: number,
    image: string
  ) {
    db.runSync(
      `UPDATE products
      SET
      name=?,
      price=?,
      category=?,
      stock=?,
      image=?
      WHERE id=?`,
      [name, price, category, stock, image, id]
    );
  },

  delete(id: number) {
    db.runSync(
      "DELETE FROM products WHERE id=?",
      [id]
    );
  }

};