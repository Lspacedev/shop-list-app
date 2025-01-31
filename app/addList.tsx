import {
  ScrollView,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import CustomInput from "@/components/CustomInput";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { router } from "expo-router";
import { insertListData, readLists } from "@/db/db";
import { useDispatch, useSelector } from "react-redux";

const addList = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const goBack = () => {
    router.push("/(tabs)");
  };
  const addList = async () => {
    setLoading(true);

    if (name === "" || category === "" || notes === "") {
      Alert.alert("Fields cannot be empty");
      setLoading(false);
    } else {
      const timestamp = Date.now().toString();

      await insertListData(name, category, notes, timestamp);
      await readLists(dispatch);

      router.push("/(tabs)");
    }
  };
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
        name="Category"
        handleChange={(text: string) => setCategory(text)}
        error={""}
        length={10}
      />
      <CustomInput
        name="Notes"
        handleChange={(text: string) => setNotes(text)}
        error={""}
        length={50}
      />

      <TouchableOpacity style={styles.button} onPress={addList}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
export default addList;
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
    marginTop: 20,
    borderRadius: 5,
    zIndex: 1,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    textTransform: "uppercase",
  },
});
