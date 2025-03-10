import React from "react";
import { Href, router } from "expo-router";
import { TouchableOpacity } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

type Props = {
  urlText: Href<string>;
};
const FAB: React.FC<Props> = ({ urlText }) => {
  return (
    <TouchableOpacity
      onPress={() => router.push(urlText)}
      style={{
        height: 50,
        width: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F97068",
        position: "absolute",
        bottom: 30,
        right: 30,
      }}
    >
      <FontAwesome6 name="add" size={24} color="black" />
    </TouchableOpacity>
  );
};
export default FAB;
