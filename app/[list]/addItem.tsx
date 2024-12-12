import {
  ScrollView,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import CustomInput from "@/components/CustomInput";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { router, useLocalSearchParams } from "expo-router";
import { insertItemData } from "@/db/db";
//import { addItem } from "@/reducers/listReducer";
const addItem = () => {
  const { list } = useLocalSearchParams();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const goBack = () => {
    router.push({
      pathname: "../[list]",
      params: { list: list },
    });
  };
  const addItem = async () => {
    setLoading(true);

    if (
      name === "" ||
      category === "" ||
      notes === "" ||
      quantity === "" ||
      price === ""
    ) {
      Alert.alert("Fields cannot be empty");
      setLoading(false);
    } else {
      const timestamp = Date.now().toString();
      const qty = Number(quantity) ?? 0;
      const prc = Number(price) ?? 0;

      await insertItemData(
        name,
        category,
        notes,
        timestamp,
        qty,
        prc,
        Number(list)
      );
      setLoading(false);

      router.push({
        pathname: "../[list]",
        params: { list: list },
      });
    }
  };
  if (loading) return <ActivityIndicator />;
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flex: 1, gap: 25 }}
    >
      <Pressable onPress={goBack}>
        <EvilIcons
          name="close"
          size={24}
          color="black"
          style={{
            padding: 0,
            margin: 10,
            textAlign: "right",
          }}
        />
      </Pressable>
      <CustomInput
        name="Name"
        handleChange={(text: string) => setName(text)}
        error={""}
      />
      <CustomInput
        name="Category"
        handleChange={(text: string) => setCategory(text)}
        error={""}
      />
      <CustomInput
        name="Notes"
        handleChange={(text: string) => setNotes(text)}
        error={""}
      />
      <CustomInput
        name="Quantity"
        handleChange={(text: string) => setQuantity(text)}
        error={""}
      />
      <CustomInput
        name="Price"
        handleChange={(text: string) => setPrice(text)}
        error={""}
      />

      <Pressable
        style={styles.button}
        onPress={() => {
          addItem();
        }}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
    </ScrollView>
  );
};
export default addItem;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  label: {
    color: "#BDBDBD",
  },
  input: {
    borderRadius: 5,
    borderColor: "#BDBDBD",
    padding: 5,
    paddingHorizontal: 10,
    color: "#BDBDBD",
    borderWidth: 0.8,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  error: {
    color: "#B9382C",
    marginVertical: -5,
  },
  button: {
    backgroundColor: "#2E4057",
    padding: 15,
    marginTop: 50,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    textTransform: "uppercase",
  },
});
