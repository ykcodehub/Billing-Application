import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";import * as ImagePicker from "expo-image-picker";
import { Image, TouchableOpacity, Text } from "react-native";



import { ProductService } from "../../services/productService";

export default function EditProduct() {
  const { id } = useLocalSearchParams();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (!id) return;

    const product = ProductService.getById(Number(id));

    if (!product) {
      Alert.alert("Product not found");
      router.back();
      return;
    }

    setName(product.name);
    setCategory(product.category || "");
    setPrice(product.price.toString());
    setStock(product.stock.toString());
    setImage(product.image || "");
  }, []);

  async function pickImage() {

  const permission =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) return;

  const result =
    await ImagePicker.launchImageLibraryAsync({

      mediaTypes: ["images"],

      allowsEditing: true,

      quality: 0.7,

    });

  if (!result.canceled) {

    setImage(result.assets[0].uri);

  }

}

  const save = () => {
    ProductService.update(Number(id), {
      name,
      category,
      price: Number(price),
      stock: Number(stock),
      image,
      barcode: "",
      favorite: 0,
    });

    Alert.alert("Updated Successfully");
    router.back();
  };

  return (
    <View style={styles.container}>
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
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
        style={styles.input}
      />

      <TextInput
        placeholder="Stock"
        keyboardType="numeric"
        value={stock}
        onChangeText={setStock}
        style={styles.input}
      />
      <TouchableOpacity
      style={styles.imageButton}
      onPress={pickImage}
      >

      <Text style={{color:"#fff"}}>
      Change Image
      </Text>

      </TouchableOpacity>

      {
      image!=="" && (

      <Image

      source={{uri:image}}

      style={styles.image}

      />

      )
      }

      <Button title="Update Product" onPress={save} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
    borderRadius: 8,
    padding: 12,
  },

  imageButton:{
  backgroundColor:"#111",
  padding:14,
  borderRadius:10,
  alignItems:"center",
  marginBottom:15
  },

  image:{
  width:140,
  height:140,
  borderRadius:12,
  alignSelf:"center",
  marginBottom:20
},
});