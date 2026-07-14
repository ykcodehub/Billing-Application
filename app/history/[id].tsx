import { useLocalSearchParams } from "expo-router";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Pressable,
  Alert,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BillService } from "../../services/billService";
import { SettingsService } from "../../services/settingsService";
import Receipt from "../../components/receipt/Receipt";
import { PrintService } from "../../services/printService";

export default function BillDetails() {

  const { id } = useLocalSearchParams();

  const bill = BillService.getBillById(Number(id)) as any;
  const items = BillService.getBillItems(Number(id)) as any[];
  const store = SettingsService.get();

  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  if (!bill) {

    return (

      <SafeAreaView style={{ flex: 1 }}>

        <View style={styles.center}>
          <Text>Bill Not Found</Text>
        </View>

      </SafeAreaView>

    );

  }

  return (

    <SafeAreaView style={{ flex: 1 }}>

      <ScrollView
        style={[
          styles.container,
          isTablet && styles.tabletContainer,
        ]}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >

        <Text
          style={[
            styles.heading,
            isTablet && styles.headingTablet,
          ]}
        >
          Receipt Preview
        </Text>

        <Receipt
          store={store}
          bill={bill}
          items={items}
        />

        <Pressable
          style={[
            styles.pdf,
            isTablet && styles.pdfTablet,
          ]}
          onPress={async () => {

            try {

              await PrintService.printReceipt(
                bill,
                items
              );

              Alert.alert(
                "Success",
                "Print command sent."
              );

            } catch (e: any) {

              Alert.alert(
                "Print Failed",
                e.message
              );

            }

          }}
        >

          <Text style={styles.pdfText}>
            Print Bill
          </Text>

        </Pressable>

      </ScrollView>

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
  },

  tabletContainer: {
    maxWidth: 850,
    width: "100%",
    alignSelf: "center",
  },

  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    color: "#111",
  },

  headingTablet: {
    fontSize: 30,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },

  pdf: {
    marginTop: 20,
    backgroundColor: "#111",
    minHeight: 58,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  pdfTablet: {
    minHeight: 64,
  },

  pdfText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },

});