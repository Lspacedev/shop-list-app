import React from "react";
import { useState } from "react";
import { Link, router } from "expo-router";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import EvilIcons from "@expo/vector-icons/EvilIcons";

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
  const [openMenu, setOpenMenu] = useState(false);

  const goToList = () => {
    router.push({
      pathname: "../[list]",
      params: { list: list.id },
    });
  };

  return (
    <Pressable
      style={{ flex: 1, justifyContent: "center", marginHorizontal: 10 }}
      onPress={goToList}
    >
      <View style={styles.container}>
        <View style={styles.name}>
          <Text style={{ color: "#E5E7E6", fontSize: 20 }}>
            {list && list.name}
          </Text>
        </View>
        <View style={styles.category}>
          <Text style={{ color: "#E5E7E6", fontSize: 20 }}>
            {list && list.category}
          </Text>
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
    justifyContent: "space-between",
    alignItems: "center",
    height: 70,
    backgroundColor: "#242A2E",
    marginVertical: 2,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderLeftColor: "#9C528B",
    borderLeftWidth: 5,
  },
  name: {},
  category: {},
  quantity: {},
  menuModal: {
    flex: 1,
  },
  menu: {
    position: "absolute",
    right: 0,
    width: 200,
    height: 100,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 15,
    alignItems: "center",
    padding: 5,
  },
});
