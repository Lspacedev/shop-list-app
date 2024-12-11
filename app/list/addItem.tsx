import { ScrollView, Text, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import CustomInput from "@/components/CustomInput";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { router } from "expo-router";
import { insertListData } from "@/db/db";
//import { addItem } from "@/reducers/listReducer";
const addItem = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState("");
  const goBack = () => {
    router.push("/(tabs)");
  };
  const addItem = async () => {
    const timestamp = Date.now().toString();
    const qty = Number(quantity) ?? 0;
    await insertListData(name, category, notes, timestamp, qty);
    router.push("/(tabs)");
  };
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
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    textTransform: "uppercase",
  },
});
