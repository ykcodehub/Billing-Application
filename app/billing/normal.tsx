import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NormalBilling() {

  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  return (

    <SafeAreaView style={{ flex: 1 }}>

      <View
        style={[
          styles.container,
          isTablet && styles.tabletContainer,
        ]}
      >

        <Text
          style={[
            styles.title,
            isTablet && styles.titleTablet,
          ]}
        >
          Normal Billing
        </Text>

      </View>

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  tabletContainer: {
    maxWidth: 700,
    width: "100%",
    alignSelf: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111",
    textAlign: "center",
  },

  titleTablet: {
    fontSize: 32,
  },

});