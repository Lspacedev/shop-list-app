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
import { updateItem } from "@/db/db";
//import { addItem } from "@/reducers/listReducer";
const addItem = () => {
  const { item } = useLocalSearchParams();

  const [name, setName] = useState<string | null>("");
  const [category, setCategory] = useState<string | null>("");
  const [notes, setNotes] = useState<string | null>("");
  const [quantity, setQuantity] = useState<string | null>("");
  const [price, setPrice] = useState<string | null>("");
  const [loading, setLoading] = useState(false);

  const goBack = () => {
    router.back();
  };
  const addItem = async () => {
    setLoading(true);

    // if (
    //   name !== "" ||
    //   category !== "" ||
    //   notes !== "" ||
    //   quantity !== "" ||
    //   price !== ""
    // ) {
    //   Alert.alert("Fields cannot be empty");
    //   setLoading(false);
    // } else {
    const timestamp = Date.now().toString();
    const qty = Number(quantity) ?? null;
    const prc = Number(price) ?? null;
    console.log(name === "" ? null : name);

    await updateItem(
      name === "" ? null : name,
      category === "" ? null : category,
      notes === "" ? null : notes,
      qty === 0 ? null : qty,
      prc === 0 ? null : prc,
      Number(item)
    );
    setLoading(false);

    router.back();
    //}
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
