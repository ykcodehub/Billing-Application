import db from "../database/db";

export const SettingsService = {

  get() {

    return db.getFirstSync(
      `SELECT * FROM settings LIMIT 1`
    );

  },

  save(data: any) {

    const exists = this.get();

    if (exists) {

      db.runSync(

        `UPDATE settings
        SET
        storeName=?,
        address=?,
        phone=?,
        logo=?,
        printerName=?,
        printerMac=?,
        autoPrint=?`,

        [
          data.storeName,
          data.address,
          data.phone,
          data.logo,
          data.printerName,
          data.printerMac,
          data.autoPrint,
        ]

      );

    } else {

      db.runSync(

        `INSERT INTO settings
        (
          storeName,
          address,
          phone,
          logo,
          printerName,
          printerMac,
          autoPrint
        )
        VALUES(?,?,?,?,?,?,?)`,

        [
          data.storeName,
          data.address,
          data.phone,
          data.logo,
          data.printerName,
          data.printerMac,
          data.autoPrint,
        ]

      );

    }

  },

  updatePrinter(
    name: string,
    mac: string
  ) {

    db.runSync(

      `UPDATE settings
      SET
      printerName=?,
      printerMac=?`,

      [
        name,
        mac,
      ]

    );

  },

};