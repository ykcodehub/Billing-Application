import db from "../database/db";

export const ReportService = {

  today() {
    return db.getFirstSync(
      `SELECT
        COUNT(*) as bills,
        IFNULL(SUM(total),0) as sales
      FROM bills
      WHERE date(createdAt)=date('now','localtime')`
    );
  },

  weekly() {
    return db.getFirstSync(
      `SELECT
        COUNT(*) as bills,
        IFNULL(SUM(total),0) as sales
      FROM bills
      WHERE date(createdAt)>=date('now','-6 day','localtime')`
    );
  },

  monthly() {
    return db.getFirstSync(
      `SELECT
        COUNT(*) as bills,
        IFNULL(SUM(total),0) as sales
      FROM bills
      WHERE strftime('%Y-%m',createdAt)=strftime('%Y-%m','now','localtime')`
    );
  },

  yearly() {
    return db.getFirstSync(
      `SELECT
        COUNT(*) as bills,
        IFNULL(SUM(total),0) as sales
      FROM bills
      WHERE strftime('%Y',createdAt)=strftime('%Y','now','localtime')`
    );
  }, 

  totalSales() {
    return db.getFirstSync(
      `
      SELECT
      IFNULL(SUM(total),0) as sales
      FROM bills
      `
    );
  },

  paymentSummary() {
    return db.getAllSync(
      `
      SELECT
      paymentMode,
      COUNT(*) as bills,
      IFNULL(SUM(total),0) as sales
      FROM bills
      GROUP BY paymentMode
      `
    );
  },

  topProducts(limit = 5) {
    return db.getAllSync(
      `
      SELECT
        products.name,
        SUM(bill_items.qty) as qty
      FROM bill_items
      INNER JOIN products
        ON products.id = bill_items.productId
      GROUP BY products.id
      ORDER BY qty DESC
      LIMIT ?
      `,
      [limit]
    );
  },
  reportByDate(from: string, to: string) {

  return db.getAllSync(
    `
    SELECT

      bills.billNo,
      bills.createdAt,
      bills.paymentMode,
      bills.billType,
      bills.total,

      COALESCE(products.name,'-') as name,
      COALESCE(bill_items.qty,'-') as qty,
      COALESCE(bill_items.price,'-') as price,

      CASE
        WHEN bill_items.qty IS NULL
        THEN bills.total
        ELSE bill_items.qty * bill_items.price
      END as amount

    FROM bills

    LEFT JOIN bill_items
      ON bills.id = bill_items.billId

    LEFT JOIN products
      ON products.id = bill_items.productId

    WHERE date(bills.createdAt)
    BETWEEN date(?) AND date(?)

    ORDER BY bills.createdAt DESC
    `,
    [from, to]
  );

}

};