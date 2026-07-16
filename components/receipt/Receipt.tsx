import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";

export default function Receipt({
  store,
  bill,
  items,
}: any) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const totalQty = items.reduce(
    (sum: number, item: any) => sum + item.qty,
    0
  );

  return (
    <View style={styles.paper}>
      {!!store?.logo && (
        <Image
          source={{ uri: store.logo }}
          style={styles.logo}
        />
      )}

      <Text style={styles.store}>
        {store?.storeName || "Billing Store"}
      </Text>

      {!!store?.address && (
        <Text style={styles.info}>
          {store.address}
        </Text>
      )}

      {!!store?.phone && (
        <Text style={styles.info}>
          {store.phone}
        </Text>
      )}

      <View style={styles.line} />

      <View style={styles.detailRow}>
        <Text style={styles.label}>
          Bill No
        </Text>

        <Text style={styles.value}>
          {bill.billNo}
        </Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>
          Date
        </Text>

        <Text style={styles.value}>
          {formatDate(bill.createdAt)}
        </Text>
      </View>

      <View style={styles.line} />

      <View style={styles.headerRow}>
        <Text
          style={[
            styles.header,
            { flex: 1.7 },
          ]}
        >
          Item
        </Text>

        <Text
          style={[
            styles.header,
            { flex: 0.6, textAlign: "center" },
          ]}
        >
          Qty
        </Text>

        <Text
          style={[
            styles.header,
            { flex: 0.9, textAlign: "right" },
          ]}
        >
          Total
        </Text>
      </View>

      {items.map((item: any) => (
        <View
          key={item.id}
          style={styles.itemRow}
        >
          <Text
            numberOfLines={1}
            style={[
              styles.itemText,
              { flex: 1.7 },
            ]}
          >
            {item.name}
          </Text>

          <Text
            style={[
              styles.itemText,
              {
                flex: 0.6,
                textAlign: "center",
              },
            ]}
          >
            {item.qty}
          </Text>

          <Text
            style={[
              styles.itemText,
              {
                flex: 0.9,
                textAlign: "right",
              },
            ]}
          >
            Rs. {(item.qty * item.price).toFixed(2)}
          </Text>
        </View>
      ))}

      <View style={styles.line} />

      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>
          Total Items
        </Text>

        <Text style={styles.summaryValue}>
          {totalQty}
        </Text>
      </View>

      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>
          Payment
        </Text>

        <Text style={styles.summaryValue}>
          {bill.paymentMode}
        </Text>
      </View>

      <View style={styles.summaryRow}>
        <Text style={styles.totalLabel}>
          GRAND TOTAL
        </Text>

        <Text style={styles.totalValue}>
          Rs. {Number(bill.total).toFixed(2)}
        </Text>
      </View>

      <View style={styles.line} />

      <Text style={styles.footerTitle}>
        THANK YOU
      </Text>

      <Text style={styles.footer}>
        Visit Again
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  paper: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 18,
    margin: 10,
    elevation: 2,
  },

  logo: {
    width: 80,
    height: 80,
    borderRadius: 12,
    alignSelf: "center",
    marginBottom: 10,
    resizeMode: "cover",
  },

  store: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
  },

  info: {
    textAlign: "center",
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },

  line: {
    borderBottomWidth: 1,
    borderStyle: "dashed",
    borderColor: "#777",
    marginVertical: 12,
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },

  value: {
    fontSize: 14,
    color: "#222",
  },

  headerRow: {
    flexDirection: "row",
    marginBottom: 8,
  },

  header: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
  },

  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  itemText: {
    fontSize: 13,
    color: "#222",
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  summaryLabel: {
    fontSize: 14,
    color: "#444",
  },

  summaryValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
  },

  totalLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },

  totalValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },

  footerTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 4,
    color: "#111",
  },

  footer: {
    textAlign: "center",
    fontSize: 15,
    color: "#555",
    marginTop: 4,
  },
});