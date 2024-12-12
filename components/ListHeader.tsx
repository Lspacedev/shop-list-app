import {
  Pressable,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { deleteList } from "@/db/db";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ListType = {
  id: number;
  name: string;
  category: string;
  notes: string;
  quantity: number;
  timestamp: string;
};

const ListHeader = (id: any) => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<ListType>();

  const [openMenu, setOpenMenu] = useState(false);
  const listId = id.id.list;
  const lists: Array<ListType> = useSelector(
    (state: RootState) => state.lists?.lists
  );

  //const [list] = lists.filter((list) => list.id === Number(listId));

  useEffect(() => {
    const findList = lists.filter((list) => list.id === Number(listId));
    const listObj: ListType = findList[0];
    setList(listObj);
  }, [listId]);

  const goToLists = () => {
    router.push("/(tabs)");
  };
  const removeList = async () => {
    setLoading(true);
    await deleteList(Number(listId));
    await AsyncStorage.removeItem("pressed");
    router.push("/");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={goToLists} style={{ flex: 1 }}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable>
      <Text style={styles.text}>{list?.name}</Text>
      <Modal
        style={styles.menuModal}
        animationType="fade"
        transparent={true}
        visible={openMenu}
        onRequestClose={() => {
          setOpenMenu(false);
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setOpenMenu(false);
          }}
        >
          <View style={{ backgroundColor: "transparent", flex: 1 }}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.menu}>
                <Text
                  onPress={() => {
                    setOpenMenu(false);
                  }}
                  style={{
                    padding: 0,
                    margin: 0,
                    textAlign: "right",
                  }}
                >
                  <EvilIcons name="close" size={24} color="black" />
                </Text>

                <Pressable
                  style={styles.menuItem}
                  onPress={() => {
                    removeList();
                  }}
                >
                  <Text>Delete</Text>
                </Pressable>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Pressable
        style={{ flex: 1 }}
        onPress={() => {
          setOpenMenu(true);
        }}
      >
        <SimpleLineIcons
          name="options-vertical"
          size={24}
          style={{
            color: "black",
            padding: 5,
            borderRadius: 50,
          }}
        />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    height: 80,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 25,
    borderBottomWidth: 0,
    shadowOpacity: 0,
  },
  text: {
    flex: 8,
    textAlign: "center",
  },
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
export default ListHeader;
