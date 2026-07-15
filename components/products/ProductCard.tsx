import {
  Alert,
  Pressable,
  Text,
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";

export default function ProductCard({
  item,
  onPress,
  onDelete,
}: any) {

  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  const confirmDelete = () => {

    Alert.alert(
      "Delete Product",
      `Delete "${item.name}" ?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: onDelete,
        },
      ]
    );

  };

  return (

    <Pressable
      style={[
        styles.card,
        isTablet && styles.cardTablet,
      ]}
      onPress={onPress}
      onLongPress={confirmDelete}
    >

      {

        item.image ? (

          <Image
            source={{ uri: item.image }}
            style={styles.image}
          />

        ) : (

          <View
            style={[
              styles.image,
              styles.placeholder,
            ]}
          >

            <Text style={styles.placeholderIcon}>
              📦
            </Text>

          </View>

        )

      }

      {

        item.category ? (

          <View style={styles.categoryChip}>

            <Text style={styles.categoryText}>
              {item.category}
            </Text>

          </View>

        ) : null

      }

      <Text
        numberOfLines={2}
        style={styles.name}
      >
        {item.name}
      </Text>

      <Text style={styles.price}>
        ₹ {item.price}
      </Text>

      <Text style={styles.stock}>
        Stock : {item.stock}
      </Text>

    </Pressable>

  );

}

const styles = StyleSheet.create({

  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    margin: 5,
    padding: 10,
    elevation: 3,
  },

  cardTablet: {
    margin: 8,
    padding: 14,
  },

  image: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    backgroundColor: "#ECECEC",
  },

  placeholder: {
    justifyContent: "center",
    alignItems: "center",
  },

  placeholderIcon: {
    fontSize: 38,
  },

  categoryChip: {
    alignSelf: "flex-start",
    marginTop: 8,
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  categoryText: {
    color: "#19C37D",
    fontSize: 11,
    fontWeight: "700",
  },

  name: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
    minHeight: 40,
  },

  price: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: "800",
    color: "#19C37D",
  },

  stock: {
    marginTop: 4,
    fontSize: 12,
    color: "#777",
    fontWeight: "600",
  },

});