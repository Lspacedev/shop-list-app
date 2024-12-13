import { Stack } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import store from "@/store/store";
import { Provider } from "react-redux";
import ListHeader from "@/components/ListHeader";
export default function TabLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="addList"
          options={{
            headerTitle: "Add List",
            headerTintColor: "white",
            headerShown: true,
            headerStyle: {
              backgroundColor: "#1D1E2C",
            },
          }}
        />

        <Stack.Screen
          name="[list]/index"
          options={({ route }) => ({
            headerShown: true,
            header: () => <ListHeader id={route.params} />,
          })}
        />
        <Stack.Screen
          name="[list]/addItem"
          options={{
            headerTitle: "Add Item",
            headerTintColor: "white",
            headerShown: true,
            headerStyle: {
              backgroundColor: "#1D1E2C",
            },
          }}
        />
        <Stack.Screen
          name="[list]/updateList"
          options={{
            headerTitle: "Update List",
            headerTintColor: "white",
            headerShown: true,
            headerStyle: {
              backgroundColor: "#1D1E2C",
            },
          }}
        />
        <Stack.Screen
          name="[item]/updateItem"
          options={{
            headerTitle: "Update Item",
            headerTintColor: "white",
            headerShown: true,
            headerStyle: {
              backgroundColor: "#1D1E2C",
            },
          }}
        />
      </Stack>
    </Provider>
  );
}
