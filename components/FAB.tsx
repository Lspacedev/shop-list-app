import React from "react";
import { Href, router } from "expo-router";
import { Pressable } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

type Props = {
  urlText: Href<string>;
};
const FAB: React.FC<Props> = ({ urlText }) => {
  return (
    <Pressable
      onPress={() => router.push(urlText)}
      style={{
        height: 50,
        width: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#C0D461",
        position: "absolute",
        bottom: 30,
        right: 30,
      }}
    >
      <FontAwesome6 name="add" size={24} color="black" />
    </Pressable>
  );
};
export default FAB;
