import React from "react";
import { Link } from "expo-router";
import { View, Text, Dimensions, StyleSheet } from "react-native";
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
  return (
    <Link
      href={{
        pathname: "/list/[list]",
        params: { list: list.id },
      }}
    >
      <View style={styles.container}>
        <View style={styles.name}>
          <Text style={{ color: "#121b27" }}>{list.name}</Text>
        </View>
        <View style={styles.category}>
          <Text style={{ color: "#121b27" }}>{list.category}</Text>
        </View>
        <View style={styles.quantity}>
          <Text style={{ color: "#121b27" }}>{list.quantity}</Text>
        </View>
      </View>
    </Link>
  );
};
export default ListCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: (Dimensions.get("window").width - 60) / 2,
    height: 200,
    borderRadius: 25,
    marginTop: 15,
  },
  name: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    fontWeight: 600,
  },
  category: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    fontWeight: 600,
  },
  quantity: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    fontWeight: 600,
  },
});
