import { SettingsService } from "./settingsService";

export const PrintService = {

  async printReceipt(
    bill: any,
    items: any[]
  ) {

    const store = SettingsService.get() as any;

    const receipt = this.generateReceipt(
      store,
      bill,
      items
    );

    console.log(receipt);

    // Bluetooth printer connect hone ke baad
    // isi receipt ko printer ko bhejenge.
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

    text += `Bill : ${bill.billNo}\n`;

    text += `Date : ${new Date(
      bill.createdAt
    ).toLocaleString()}\n`;

    text += "------------------------------\n";

    items.forEach((item: any) => {

      const amount =
        item.qty * item.price;

      text +=
`${item.name}
${item.qty} x ${item.price} = ${amount}
`;

    });

    text += "------------------------------\n";

    text += `TOTAL : ₹ ${bill.total}\n`;

    text += `PAYMENT : ${bill.paymentMode}\n`;

    text += "==============================\n";

    text += "   THANK YOU\n";

    text += " Visit Again\n\n\n";

    return text;

  }

};