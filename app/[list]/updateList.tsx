import { ScrollView, Text, Pressable, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import CustomInput from "@/components/CustomInput";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { router, useLocalSearchParams } from "expo-router";
import { updateList } from "@/db/db";
const UpdateList = () => {
  const { list } = useLocalSearchParams();

  const [name, setName] = useState<string | null>("");
  const [category, setCategory] = useState<string | null>("");
  const [notes, setNotes] = useState<string | null>("");
  const [loading, setLoading] = useState(false);

  const goBack = () => {
    router.push("/(tabs)");
  };
  const update = async () => {
    setLoading(true);

    await updateList(
      name === "" ? null : name,
      category === "" ? null : category,
      notes === "" ? null : notes,
      Number(list)
    );
    router.push("/(tabs)");
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

      <Pressable
        style={styles.button}
        onPress={() => {
          update();
        }}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
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
