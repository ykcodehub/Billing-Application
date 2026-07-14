import { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
  Image,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";


import { ProductService } from "../../services/productService";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  async function pickImage() {

  const permission =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    Alert.alert(
      "Permission Required",
      "Please allow gallery access."
    );
    return;
  }

  const result =
    await ImagePicker.launchImageLibraryAsync({

      mediaTypes: ["images"],

      quality: 0.7,

      allowsEditing: true,

    });

  if (!result.canceled) {

    setImage(result.assets[0].uri);

  }

}
  
  const saveProduct = () => {
    if (!name.trim()) {
      Alert.alert("Validation", "Product name is required.");
      return;
    }

    if (!price.trim()) {
      Alert.alert("Validation", "Price is required.");
      return;
    }

    ProductService.add({
      name,
      category,
      price: Number(price),
      stock: Number(stock || 0),
      image,
      barcode: "",
      favorite: 0,
    });

    Alert.alert("Success", "Product Added Successfully");

    router.back();
  };

  return (
  <SafeAreaView
  style={{ flex: 1 }}
  edges={["top", "bottom"]}
>
    <ScrollView
      style={[
        styles.container,
        isTablet && styles.tabletContainer,
      ]}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <TextInput
        placeholder="Product Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />

      <TextInput
        placeholder="Price"
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
        style={styles.input}
      />

      <TextInput
        placeholder="Stock"
        value={stock}
        keyboardType="numeric"
        onChangeText={setStock}
        style={styles.input}
      />

      <TouchableOpacity
          style={styles.button}
          onPress={pickImage}
        >

          <Text style={styles.buttonText}>
            Select Product Image
          </Text>

      </TouchableOpacity>
      {
        image!=="" && (

        <Image

        source={{uri:image}}

        style={[
          styles.image,
          {
            width: isTablet ? 220 : 140,
            height: isTablet ? 220 : 140,
          },
        ]}

        />

        )
        }

      <TouchableOpacity
        style={styles.button}
        onPress={saveProduct}
      >
        <Text style={styles.buttonText}>
          Save Product
        </Text>
      </TouchableOpacity>
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
    maxWidth: 700,
    width: "100%",
    alignSelf: "center",
  },

  input: {
    backgroundColor: "#fff",
    height: 58,
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#111",
    height: 58,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },

  image: {
    alignSelf: "center",
    borderRadius: 14,
    marginVertical: 18,
  },

});