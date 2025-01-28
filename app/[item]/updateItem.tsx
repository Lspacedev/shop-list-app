import {
  ScrollView,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState, useCallback } from "react";
import CustomInput from "@/components/CustomInput";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { updateItem, readItem } from "@/db/db";
import type { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

//import { addItem } from "@/reducers/listReducer";
const addItem = () => {
  const { item } = useLocalSearchParams();
  const itemObj = useSelector((state: RootState) => state.lists.item);

  const [name, setName] = useState(itemObj.name);
  const [notes, setNotes] = useState(itemObj.notes);
  const [quantity, setQuantity] = useState(itemObj.quantity.toString());
  const [price, setPrice] = useState(itemObj.price.toString());
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await readItem(Number(item), dispatch);
        setName(itemObj.name);
        setNotes(itemObj.notes);
        setPrice(itemObj.price.toString());
        setQuantity(itemObj.quantity.toString());
        setLoading(false);
      })();
    }, [item, loading])
  );

  const goBack = () => {
    router.back();
  };
  const update = async () => {
    setLoading(true);

    if (name === "" || notes === "" || quantity === "" || price === "") {
      Alert.alert("Fields cannot be empty");
      setLoading(false);
    }
    const timestamp = Date.now().toString();
    const qty = Number(quantity) ?? null;
    const prc = Number(price) ?? null;

    await updateItem(
      name === "" ? null : name,
      notes === "" ? null : notes,
      qty === 0 ? null : qty,
      prc === 0 ? null : prc,
      Number(item)
    );
    setLoading(false);

    router.back();
    //}
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
        value={name}
      />

      <CustomInput
        name="Notes"
        handleChange={(text: string) => setNotes(text)}
        error={""}
        length={25}
        value={notes}
      />
      <CustomInput
        name="Quantity"
        handleChange={(text: string) => setQuantity(text)}
        error={""}
        length={3}
        value={quantity}
      />
      <CustomInput
        name="Price"
        handleChange={(text: string) => setPrice(text)}
        error={""}
        length={5}
        value={price}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          update();
        }}
      >
        <Text style={styles.buttonText}>Submit</Text>
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
