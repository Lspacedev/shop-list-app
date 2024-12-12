import React from "react";
import { Link, router } from "expo-router";
import { View, Text, Dimensions, StyleSheet, Pressable } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
type ListType = {
  id: number;
  name: string;
  category: string;
  notes: string;
  quantity: number;
  timestamp: string;
};

type ListProps = {
  list: ListType;
};

const ListCard: React.FC<ListProps> = ({ list }) => {
  const goToList = () => {
    router.push({
      pathname: "../[list]",
      params: { list: list.id },
    });
  };
  return (
    <Pressable
      style={{ flex: 1, justifyContent: "center", marginHorizontal: 25 }}
      onPress={goToList}
    >
      <View style={styles.container}>
        <View style={styles.name}>
          <Text style={{ color: "#121b27" }}>{list && list.name}</Text>
        </View>
        <View style={styles.category}>
          <Text style={{ color: "#121b27" }}>{list && list.category}</Text>
        </View>
        <View style={styles.quantity}>
          <Text style={{ color: "#121b27" }}>{list && list.quantity}</Text>
        </View>
      </View>
    </Pressable>
  );
};
export default ListCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 50,
    backgroundColor: "yellow",
  },
  name: {},
  category: {},
  quantity: {},
});
