import { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from "react-native";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";

import { ProductService } from "../../services/productService";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");

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
    <ScrollView
      style={styles.container}
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

        style={{

        width:140,
        height:140,
        borderRadius:10,
        alignSelf:"center",
        marginVertical:15

        }}

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    padding: 20,
  },

  input: {
    backgroundColor: "#fff",
    height: 55,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    elevation: 2,
  },

  button: {
    backgroundColor: "#111",
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});