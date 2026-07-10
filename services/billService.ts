// import db from "../database/db";

// export const BillService = {

//   save(
//   cart: any[],
//   total: number,
//   paymentMode: string,
//   billType = "NORMAL"
// ) {

//     const billNo = "BILL" + Date.now();

//     db.runSync(
//       `INSERT INTO bills
//       (billNo,total,paymentMode,billType,createdAt)
//       VALUES(?,?,?,?,?)`,
//       [
//         billNo,
//         total,
//         paymentMode,
//         billType,
//         new Date().toISOString(),
//     ]
//     );

//     const result = db.getFirstSync<any>(
//       "SELECT last_insert_rowid() id"
//     );

//     cart.forEach((item) => {

//       db.runSync(
//         `INSERT INTO bill_items
//         (billId,productId,qty,price)
//         VALUES(?,?,?,?)`,
//         [
//           result.id,
//           item.id,
//           item.qty,
//           item.price,
//         ]
//       );

//     });

//     return billNo;

//   },

//   getBills() {

//     return db.getAllSync(
//       "SELECT * FROM bills ORDER BY id DESC"
//     );

//   },
// };
// //   delete(id:number){

// //     db.runSync(
// //       "DELETE FROM bill_items WHERE billId=?",
// //       [id]
// //     );

// //     db.runSync(
// //       "DELETE FROM bills WHERE id=?",
// //       [id]
// //     );

// //   }

// // };



//New
import db from "../database/db";

export const BillService = {
  save(
    cart: any[],
    total: number,
    paymentMode: string,
    billType = "NORMAL"
  ) {
    const billNo = "BILL" + Date.now();

    db.runSync(
      `INSERT INTO bills
      (billNo,total,paymentMode,billType,createdAt)
      VALUES(?,?,?,?,?)`,
      [
        billNo,
        total,
        paymentMode,
        billType,
        new Date().toISOString(),
      ]
    );

   const result = db.getFirstSync<{ id: number }>(
  "SELECT last_insert_rowid() as id"
    );

    if (!result) {
      throw new Error("Failed to create bill.");
    }

    cart.forEach((item) => {
      db.runSync(
        `INSERT INTO bill_items
        (billId,productId,qty,price)
        VALUES(?,?,?,?)`,
        [
          result.id,
          item.id,
          item.qty,
          item.price,
        ]
      );

      // Reduce product stock after successful billing
      db.runSync(
        `UPDATE products
         SET stock = CASE
           WHEN stock >= ? THEN stock - ?
           ELSE stock
         END
         WHERE id = ?`,
        [item.qty, item.qty, item.id]
      );
    });

    return billNo;
  },

  getBills() {
    return db.getAllSync(
      `SELECT *
       FROM bills
       ORDER BY datetime(createdAt) DESC`
    );
  },

  getRecentBills(limit = 5) {
    return db.getAllSync(
      `SELECT *
       FROM bills
       ORDER BY datetime(createdAt) DESC
       LIMIT ?`,
      [limit]
    );
  },

  getTodaySales() {
    const result = db.getFirstSync<{ total: number }>(
      `
      SELECT
      COALESCE(SUM(total),0) as total
      FROM bills
      WHERE date(createdAt)=date('now','localtime')
      `
    );

    return result?.total ?? 0;
  },

  getTodayBillsCount() {
    const result = db.getFirstSync<{ count: number }>(
      `
      SELECT
      COUNT(*) as count
      FROM bills
      WHERE date(createdAt)=date('now','localtime')
      `
    );

    return result?.count ?? 0;
  },

  getBillById(id: number) {
    return db.getFirstSync(
      `SELECT *
       FROM bills
       WHERE id=?`,
      [id]
    );
  },

  getBillItems(billId: number) {
    return db.getAllSync(
      `
      SELECT
        bill_items.*,
        products.name
      FROM bill_items
      LEFT JOIN products
      ON products.id = bill_items.productId
      WHERE bill_items.billId=?
      `,
      [billId]
    );
  },

  getBillItemsWithTotal(billId:number){

  return db.getAllSync(

  `
  SELECT
  products.name,
  bill_items.qty,
  bill_items.price,
  bill_items.qty*bill_items.price subtotal
  FROM bill_items
  LEFT JOIN products
  ON products.id=bill_items.productId
  WHERE bill_items.billId=?
  `,
  [billId]

  );

  },

  searchBills(keyword: string) {
  return db.getAllSync(
    `
    SELECT *
    FROM bills
    WHERE
      billNo LIKE ?
      OR paymentMode LIKE ?
    ORDER BY datetime(createdAt) DESC
    `,
    [
      `%${keyword}%`,
      `%${keyword}%`,
    ]
  );
},
};