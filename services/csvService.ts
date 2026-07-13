import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export const CsvService = {

  async exportSales(rows: any[]) {

    let csv =
      "Bill No,Date,Time,Product,Qty,Price,Amount,Payment Mode,Bill Type\n";

    rows.forEach((item) => {

      const date = new Date(item.createdAt);

      const dateOnly = date.toLocaleDateString("en-GB");

      const timeOnly = date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      csv +=
        `${item.billNo},` +
        `${dateOnly},` +
        `${timeOnly},` +
        `"${item.name}",` +
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