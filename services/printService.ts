import { SettingsService } from "./settingsService";
import { BluetoothService } from "./bluetoothService";

export const PrintService = {
  async printReceipt(
    bill: any,
    items: any[]
  ) {
    const store = SettingsService.get() as any;

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

    if (!store?.autoPrint) return;

    if (!store?.printerMac) return;

    try {
      const receipt = this.generateReceipt(
        store,
        bill,
        items
      );

      await BluetoothService.print(
        store.printerMac,
        receipt
      );
    } catch {
      console.log("Auto Print Failed");
    }
  },

  generateReceipt(
    store: any,
    bill: any,
    items: any[]
  ) {

    const date = new Date(bill.createdAt);

    const formattedDate =
      date.toLocaleDateString("en-IN");

    const formattedTime =
      date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      });

    const line =
      "--------------------------------";

    let text = "";

    //--------------------------------
    // Store
    //--------------------------------

    text += `${line}\n`;

    text += `${(store?.storeName || "Billing Store").toUpperCase()}\n`;

    if (store?.address) {
      text += `${store.address}\n`;
    }

    if (store?.phone) {
      text += `${store.phone}\n`;
    }

    text += `${line}\n`;

    //--------------------------------
    // Bill Info
    //--------------------------------

    text += `Bill No : ${bill.billNo}\n`;
    text += `Date    : ${formattedDate}\n`;
    text += `Time    : ${formattedTime}\n`;

    text += `${line}\n`;

    //--------------------------------
    // Header
    //--------------------------------

    text += `ITEM\n`;
    text += `QTY x PRICE               TOTAL\n`;

    text += `${line}\n`;

    //--------------------------------
    // Items
    //--------------------------------

    items.forEach((item: any) => {

      const total =
        item.qty * item.price;

      text += `${item.name}\n`;

      const left =
        `${item.qty} x ${item.price}`;

      const right =
        `Rs.${total}`;

      const spaces =
        Math.max(
          1,
          28 -
            left.length -
            right.length
        );

      text +=
        left +
        " ".repeat(spaces) +
        right +
        "\n";
    });

    text += `${line}\n`;

    //--------------------------------
    // Summary
    //--------------------------------

    const totalQty = items.reduce(
      (sum: number, item: any) =>
        sum + item.qty,
      0
    );

    text += `Items   : ${totalQty}\n`;

    text += `Payment : ${bill.paymentMode}\n`;

    text += `${line}\n`;

    text += `GRAND TOTAL : Rs.${Number(
      bill.total
    ).toFixed(2)}\n`;

    text += `${line}\n`;

    //--------------------------------
    // Footer
    //--------------------------------

    text += `     THANK YOU\n`;
    text += `    Visit Again\n`;

    text += `\n\n\n\n\n`;

    return text;
  },
};