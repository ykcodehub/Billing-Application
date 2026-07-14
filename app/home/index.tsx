import { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import AppHeader from "../../components/ui/AppHeader";
import DashboardCard from "../../components/ui/DashboardCard";
import IconMenuCard from "../../components/ui/IconMenuCard";
import { BillService } from "../../services/billService";

export default function HomeScreen() {

  const [todaySales, setTodaySales] = useState(0);
  const [todayBills, setTodayBills] = useState(0);
  const [recentBills, setRecentBills] = useState<any[]>([]);

  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  const loadDashboard = () => {

    setTodaySales(BillService.getTodaySales());

    setTodayBills(BillService.getTodayBillsCount());

    setRecentBills(
      BillService.getRecentBills(5) as any[]
    );

  };

  useFocusEffect(
    useCallback(() => {
      loadDashboard();
    }, [])
  );

  return (

    <SafeAreaView style={{ flex: 1 }}>

      <ScrollView
        style={[
          styles.container,
          isTablet && styles.tabletContainer,
        ]}
        contentContainerStyle={{ paddingBottom: 25 }}
        showsVerticalScrollIndicator={false}
      >

        <AppHeader
          title="Store"
          subtitle="Hello,"
        />

        <DashboardCard
          title="TODAY'S EARNINGS"
          value={`₹${todaySales.toFixed(2)}`}
          subtitle={`${todayBills} bill${todayBills === 1 ? "" : "s"} today`}
        />

        <View
          style={[
            styles.row,
            isTablet && styles.rowTablet,
          ]}
        >

          <IconMenuCard
            title="New Bill"
            color="#19C37D"
            icon={
              <Ionicons
                name="flash"
                size={26}
                color="#fff"
              />
            }
            onPress={() =>
              router.push("/billing/normal")
            }
          />

          <IconMenuCard
            title="Products"
            color="#111"
            icon={
              <Ionicons
                name="cube"
                size={26}
                color="#fff"
              />
            }
            onPress={() =>
              router.push("/products")
            }
          />

        </View>

        <View
          style={[
            styles.row,
            isTablet && styles.rowTablet,
          ]}
        >

          <IconMenuCard
            title="History"
            color="#4285F4"
            icon={
              <Ionicons
                name="time"
                size={26}
                color="#fff"
              />
            }
            onPress={() =>
              router.push("/history")
            }
          />

          <IconMenuCard
            title="Reports"
            color="#F5A623"
            icon={
              <Ionicons
                name="bar-chart"
                size={26}
                color="#fff"
              />
            }
            onPress={() =>
              router.push("/reports")
            }
          />

        </View>

        <View
          style={[
            styles.section,
            isTablet && styles.sectionTablet,
          ]}
        >

          <Text style={styles.sectionTitle}>
            Recent Bills
          </Text>

          {recentBills.length === 0 ? (

            <Text style={styles.emptyText}>
              No bills available.
            </Text>

          ) : (

            recentBills.map((bill: any) => (

              <DashboardCard
                key={bill.id}
                title={bill.billNo}
                value={`₹${Number(bill.total).toFixed(2)}`}
                subtitle={`${bill.paymentMode} • ${bill.billType}`}
                onPress={() =>
                  router.push(`/history/${bill.id}` as any)
                }
              />

            ))

          )}

        </View>

      </ScrollView>

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 18,
    paddingTop: 10,
  },

  tabletContainer: {
    maxWidth: 900,
    width: "100%",
    alignSelf: "center",
  },

  row: {
    flexDirection: "row",
    marginBottom: 8,
  },

  rowTablet: {
    marginBottom: 14,
  },

  section: {
    marginTop: 12,
    paddingBottom: 30,
  },

  sectionTablet: {
    marginTop: 18,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    color: "#111",
  },

  emptyText: {
    textAlign: "center",
    color: "#777",
    marginTop: 20,
    fontSize: 15,
  },

});