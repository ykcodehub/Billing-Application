import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export const CsvService = {

  async exportSales(rows: any[]) {

    let csv =
      "Bill No,Date,Product,Qty,Price,Amount,Payment Mode,Bill Type\n";

    rows.forEach((item) => {

      csv +=
        `${item.billNo},` +
        `${new Date(item.createdAt).toLocaleString()},` +
        `${item.name},` +
        `${item.qty},` +
        `${item.price},` +
        `${item.amount},` +
        `${item.paymentMode},` +
        `${item.billType}\n`;

    });

    const file = new FileSystem.File(
      FileSystem.Paths.document,
      "Reports.csv"
    );

    await file.write(csv);

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(file.uri);
    }

  }

};