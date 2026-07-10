import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

export const PdfService = {

  async generate(html: string) {

    const file = await Print.printToFileAsync({
      html,
    });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(file.uri);
    }

  }

};