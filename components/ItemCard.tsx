import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { View, Text, Dimensions, StyleSheet, Pressable } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { deleteItem } from "@/db/db";
type ItemType = {
  id: number;
  name: string;
  category: string;
  notes: string;
  quantity: number;
  timestamp: string;
  price: number;
};

type ItemProps = {
  item: ItemType;
  pressedItems: Number[];
  addToPressed: (id: Number) => void;
};

const ItemCard: React.FC<ItemProps> = ({
  item,
  pressedItems,
  addToPressed,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  useEffect(() => {
    if (pressedItems.indexOf(item.id) !== -1) {
      setIsPressed(true);
    } else {
      setIsPressed(false);
    }
  }, [pressedItems]);
  const goToUpdate = () => {
    router.push({
      pathname: "../[item]/updateItem",
      params: { item: item.id },
    });
  };
  const removeItem = async () => {
    await deleteItem(item.id);
    router.back();
  };
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: pressed ? "#D9D9D9" : "#E2EFDE" },
      ]}
      onPress={() => addToPressed(item.id)}
    >
      <View
        style={{
          flex: 4,
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Text
          style={[
            isPressed && { textDecorationLine: "line-through", color: "grey" },
          ]}
        >
          {item.name}
        </Text>
        <Text
          style={[
            isPressed && { textDecorationLine: "line-through", color: "grey" },
          ]}
        >
          {item.category}
        </Text>
        <Text
          style={[
            isPressed && { textDecorationLine: "line-through", color: "grey" },
          ]}
        >
          {item.quantity}
        </Text>
        <Text
          style={[
            isPressed && { textDecorationLine: "line-through", color: "grey" },
          ]}
        >
          {item.price}
        </Text>
      </View>

      <Pressable
        onPress={isPressed ? () => removeItem() : () => goToUpdate()}
        style={{ flex: 1 }}
      >
        {isPressed ? (
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
        ) : (
          <MaterialIcons name="edit" size={24} color="black" />
        )}
      </Pressable>
    </Pressable>
  );
};
export default ItemCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 50,
    marginVertical: 10,
    marginHorizontal: 25,
  },

  category: {},
  quantity: {},
});
