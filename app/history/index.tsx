import { useCallback, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect } from "expo-router";

import { BillService } from "../../services/billService";

export default function History() {

  const [bills, setBills] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  function loadBills() {
    setBills(BillService.getBills() as any[]);
  }

  function searchBills(text: string) {

    setSearch(text);

    if (text.trim() === "") {
      loadBills();
      return;
    }

    setBills(
      BillService.searchBills(text) as any[]
    );

  }

  useFocusEffect(
    useCallback(() => {
      loadBills();
    }, [])
  );

  return (

    <SafeAreaView style={{ flex: 1 }}>

      <View
        style={[
          styles.container,
          isTablet && styles.tabletContainer,
        ]}
      >

        <Text style={styles.title}>
          Bill History
        </Text>

        <TextInput
          placeholder="Search Bill No / Payment"
          value={search}
          onChangeText={searchBills}
          style={[
            styles.input,
            isTablet && styles.inputTablet,
          ]}
        />

        <FlatList
          data={bills}
          keyExtractor={(item: any) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <Text style={styles.empty}>
              No Bills Found
            </Text>
          }
          renderItem={({ item }) => (

            <Pressable
              style={[
                styles.card,
                isTablet && styles.cardTablet,
              ]}
              onPress={() =>
                router.push(`/history/${item.id}` as any)
              }
            >

              <Text style={styles.bill}>
                {item.billNo}
              </Text>

              <Text style={styles.amount}>
                ₹ {Number(item.total).toFixed(2)}
              </Text>

              <Text style={styles.info}>
                {item.paymentMode}
              </Text>

              <Text style={styles.info}>
                {item.billType}
              </Text>

            </Pressable>

          )}
        />

      </View>

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

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 18,
    color: "#111",
  },

  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    elevation: 2,
  },

  inputTablet: {
    padding: 18,
    fontSize: 18,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },

  cardTablet: {
    padding: 20,
  },

  bill: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },

  amount: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0a9b4f",
    marginTop: 6,
  },

  info: {
    marginTop: 5,
    fontSize: 15,
    color: "#666",
  },

  empty: {
    marginTop: 50,
    textAlign: "center",
    fontSize: 17,
    color: "#777",
  },

});