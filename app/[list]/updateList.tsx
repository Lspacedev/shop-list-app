import {
  ScrollView,
  Text,
  Pressable,
  StyleSheet,
  Alert,
  View,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useState, useCallback } from "react";
import CustomInput from "@/components/CustomInput";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { updateList, readList } from "@/db/db";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";

const UpdateList = () => {
  const { list } = useLocalSearchParams();
  const listObj = useSelector((state: RootState) => state.lists.list);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      (async () => {
        await readList(Number(list), dispatch);
        setName(listObj.name);
        setCategory(listObj.category);
        setNotes(listObj.notes);

        setLoading(false);
      })();
    }, [list, readList, dispatch, loading])
  );

  const goBack = () => {
    router.push("/(tabs)");
  };
  const update = async () => {
    if (name === "" || notes === "" || category === "") {
      Alert.alert("Fields cannot be empty");
    }
    setLoading(true);
    await updateList(
      name === "" ? null : name,
      category === "" ? null : category,
      notes === "" ? null : notes,
      Number(list)
    );
    router.push("/(tabs)");
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
        name="Category"
        handleChange={(text: string) => setCategory(text)}
        error={""}
        length={10}
        value={category}
      />
      <CustomInput
        name="Notes"
        handleChange={(text: string) => setNotes(text)}
        error={""}
        length={50}
        value={notes}
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

export default UpdateList;
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
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    textTransform: "uppercase",
  },
});
