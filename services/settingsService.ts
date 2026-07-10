import db from "../database/db";

export const SettingsService = {

  get() {

    return db.getFirstSync(
      "SELECT * FROM settings LIMIT 1"
    );

  },

  save(data: any) {

    const exists = db.getFirstSync(
      "SELECT id FROM settings LIMIT 1"
    );

    if (exists) {

      db.runSync(
        `
        UPDATE settings
        SET
        storeName=?,
        address=?,
        phone=?,
        printerName=?,
        printerMac=?
        `,
        [
          data.storeName,
          data.address,
          data.phone,
          data.printerName,
          data.printerMac
        ]
      );

    } else {

      db.runSync(
        `
        INSERT INTO settings
        (
          id,
          storeName,
          address,
          phone,
          printerName,
          printerMac
        )
        VALUES(1,?,?,?,?,?)
        `,
        [
          data.storeName,
          data.address,
          data.phone,
          data.printerName,
          data.printerMac
        ]
      );

    }

  }

};