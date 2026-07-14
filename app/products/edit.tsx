import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  Text,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

import { ProductService } from "../../services/productService";

export default function EditProduct() {
  const { id } = useLocalSearchParams();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");

  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

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

    Alert.alert("Success", "Product Updated Successfully");
    router.back();
  };

  return (
    <SafeAreaView
      style={{ flex: 1 }}
      edges={["top", "bottom"]}
    >
      <View
        style={[
          styles.container,
          isTablet && styles.tabletContainer,
        ]}
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
          <Text style={styles.imageButtonText}>
            Change Image
          </Text>
        </TouchableOpacity>

        {image !== "" && (
          <Image
            source={{ uri: image }}
            style={[
              styles.image,
              {
                width: isTablet ? 220 : 140,
                height: isTablet ? 220 : 140,
              },
            ]}
          />
        )}

        <View style={{ marginTop: 10 }}>
          <Button
            title="Update Product"
            onPress={save}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  tabletContainer: {
    maxWidth: 700,
    width: "100%",
    alignSelf: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 56,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#fff",
  },

  imageButton: {
    backgroundColor: "#111",
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  imageButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  image: {
    borderRadius: 14,
    alignSelf: "center",
    marginBottom: 24,
  },
});