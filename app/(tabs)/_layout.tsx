import { Tabs } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { LinearGradient } from "expo-linear-gradient";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveBackgroundColor: "#242A2E",
        tabBarInactiveBackgroundColor: "#242A2E",
        tabBarActiveTintColor: "whitesmoke",
        tabBarStyle: {
          borderTopWidth: 0.3,
          borderTopColor: "black",
          elevation: 1,
          shadowColor: "#5bc4ff",
          shadowOpacity: 1,
          shadowOffset: {
            height: 1,
            width: 1,
          },
          shadowRadius: 1,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "ShoppingList",
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "700",
          },

          headerTitleContainerStyle: {
            margin: 0,
          },
          headerBackground: () => (
            <LinearGradient
              colors={["#505558", "#242A2E"]}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />
          ),
          headerStyle: {
            elevation: 0,
            height: 100,
          },
          headerLeft: () => (
            <Entypo
              name="shopping-bag"
              size={24}
              color="#F97068"
              style={{ marginLeft: 15 }}
            />
          ),

          tabBarLabel: "Lists",
          tabBarActiveTintColor: "#F97068",
          tabBarIcon: ({ color, focused }) => {
            return (
              <FontAwesome5
                name="list-alt"
                size={24}
                color={focused ? "#F97068" : "white"}
              />
            );
          },
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          headerTitle: "Search",
          headerTintColor: "white",

          headerStyle: {
            backgroundColor: "#242A2E",
          },
          tabBarLabel: "Search",
          tabBarActiveTintColor: "#F9706",

          tabBarIcon: ({ color, focused }) => {
            return (
              <Feather
                name="search"
                size={24}
                color={focused ? "#F97068" : "white"}
              />
            );
          },
        }}
      />
    </Tabs>
  );
}
