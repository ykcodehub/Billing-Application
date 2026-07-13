import { SettingsService } from "./settingsService";
import { BluetoothService } from "./bluetoothService";

export const PrintService = {

  async printReceipt(
    bill: any,
    items: any[]
  ) {

    const store = SettingsService.get() as any;

    // Printer select nahi hai
    if (!store?.printerMac) {
      throw new Error("No printer connected.");
    }

    const receipt = this.generateReceipt(
      store,
      bill,
      items
    );

    await BluetoothService.print(
      store.printerMac,
      receipt
    );

  },

  async autoPrint(
    bill: any,
    items: any[]
  ) {

    const store = SettingsService.get() as any;

    if (!store?.autoPrint) {
      return;
    }

    if (!store?.printerMac) {
      return;
    }

    const receipt = this.generateReceipt(
      store,
      bill,
      items
    );

    try {

      await BluetoothService.print(
        store.printerMac,
        receipt
      );

    } catch (e) {

      console.log("Auto Print Failed");

    }

  },

  generateReceipt(
    store: any,
    bill: any,
    items: any[]
  ) {

    let text = "";

    text += "==============================\n";
    text += `${store?.storeName || "Billing Store"}\n`;

    if (store?.address)
      text += `${store.address}\n`;

    if (store?.phone)
      text += `${store.phone}\n`;

    text += "------------------------------\n";

    text += `Bill No : ${bill.billNo}\n`;

    text += `Date : ${new Date(
      bill.createdAt
    ).toLocaleString()}\n`;

    text += "------------------------------\n";

    items.forEach((item: any) => {

      const amount = item.qty * item.price;

      text += `${item.name}\n`;
      text += `${item.qty} x ${item.price} = ${amount}\n`;

    });

    text += "------------------------------\n";

    text += `TOTAL : ₹ ${bill.total}\n`;
    text += `PAYMENT : ${bill.paymentMode}\n`;

    text += "==============================\n";
    text += "      THANK YOU\n";
    text += "     Visit Again\n\n\n\n";

    return text;

  },

};