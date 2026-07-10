import {
Alert,
Pressable,
Text,
View,
StyleSheet,
Image
} from "react-native";

export default function ProductCard({
  item,
  onPress,
  onDelete,
}: any) {

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
      style={styles.card}
      onPress={onPress}
      onLongPress={confirmDelete}
    >
      <View
      style={{
      flexDirection:"row",
      alignItems:"center"
      }}
      >

      {

      item.image!=="" && (

      <Image

      source={{uri:item.image}}

      style={{

      width:60,
      height:60,
      borderRadius:10,
      marginRight:15

      }}

      />

      )

      }

      <View style={{flex:1}}>

      <Text style={styles.name}>
      {item.name}
      </Text>

      <Text style={styles.price}>
      ₹ {item.price}
      </Text>

      <Text style={styles.stock}>
      Stock : {item.stock}
      </Text>

      </View>

      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#fff",
    marginBottom: 12,
    borderRadius: 14,
    padding: 16,
    elevation: 2,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
  },

  price: {
    fontSize: 16,
    marginTop: 5,
  },

  stock: {
    color: "#777",
    marginTop: 4,
  },

});