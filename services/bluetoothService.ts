import RNBluetoothClassic, {
  BluetoothDevice,
} from "react-native-bluetooth-classic";

export interface PrinterDevice {
  name: string;
  address: string;
}

export const BluetoothService = {

  async enableBluetooth() {

    const enabled =
      await RNBluetoothClassic.requestBluetoothEnabled();

    return enabled;

  },

  async scan(): Promise<PrinterDevice[]> {

    await this.enableBluetooth();

    const devices =
      await RNBluetoothClassic.startDiscovery();

    return devices.map((item: BluetoothDevice) => ({
      name: item.name || "Unknown Printer",
      address: item.address,
    }));

  },

  async paired(): Promise<PrinterDevice[]> {

    const devices =
      await RNBluetoothClassic.getBondedDevices();

    return devices.map((item: BluetoothDevice) => ({
      name: item.name || "Unknown Printer",
      address: item.address,
    }));

  },

  async connect(address: string) {

    const bonded =
      await RNBluetoothClassic.getBondedDevices();

    const printer =
      bonded.find(
        d => d.address === address
      );

    if (!printer)
      throw new Error("Printer not found");

    const connected =
      await printer.connect();

    return connected;

  },

  async disconnect(address: string) {

    const connected =
      await RNBluetoothClassic.getConnectedDevices();

    const printer =
      connected.find(
        d => d.address === address
      );

    if (printer)
      await printer.disconnect();

  },

  async print(
    address: string,
    text: string
  ) {

    const connected =
      await RNBluetoothClassic.getConnectedDevices();

    let printer =
      connected.find(
        d => d.address === address
      );

    if (!printer) {

      const bonded =
        await RNBluetoothClassic.getBondedDevices();

      printer =
        bonded.find(
          d => d.address === address
        );

      if (!printer)
        throw new Error("Printer not found");

      await printer.connect();

    }

    await printer.write(text);

  },

};