import {
  ScrollView,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Touchable,
  TouchableOpacity,
  View,
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
    if (name === "" || notes === "" || quantity === "" || price === "") {
      Alert.alert("Fields cannot be empty");
    } else {
      if (isNaN(Number(quantity))) {
        Alert.alert("Quantity must be a number.");
        return;
      }
      if (isNaN(Number(price))) {
        Alert.alert("Price must be a number.");
        return;
      }
      setLoading(true);
      const timestamp = Date.now().toString();
      const qty = Number(quantity) ?? 0;
      const prc = Number(price) ?? 0;

      await insertItemData(name, notes, timestamp, qty, prc, Number(list));
      setLoading(false);
      router.back();
    }
  };
  if (loading)
    return <View style={{ flex: 1, backgroundColor: "#040406" }}></View>;
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flex: 1, gap: 25 }}
      keyboardShouldPersistTaps="always"
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
        length={12}
      />

      <CustomInput
        name="Notes"
        handleChange={(text: string) => setNotes(text)}
        error={""}
        length={25}
      />
      <CustomInput
        name="Quantity"
        handleChange={(text: string) => setQuantity(text)}
        error={""}
        length={3}
      />
      <CustomInput
        name="Price"
        handleChange={(text: string) => setPrice(text)}
        error={""}
        length={5}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          addItem();
        }}
      >
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
export default addItem;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: "#040406",
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
    backgroundColor: "#F97068",
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
