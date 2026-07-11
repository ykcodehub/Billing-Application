export interface PrinterDevice {

  name: string;

  address: string;

}

export const BluetoothService = {

  async scan(): Promise<PrinterDevice[]> {

    // Bluetooth library add hone ke baad
    // yahan nearby printers scan honge.

    return [];

  },

  async connect(
    address: string
  ) {

    console.log("Connecting:", address);

    return true;

  },

  async disconnect() {

    console.log("Disconnected");

    return true;

  },

};