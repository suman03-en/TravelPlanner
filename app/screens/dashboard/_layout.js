import { Tabs } from "expo-router";
import { Entypo,MaterialIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
export default function Layout() {
  return (
    <Tabs initialRouteName="home" screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={24} color="black" />
          ),
        }}
      />

      <Tabs.Screen
        name="trip"
        options={{
          title: "Trip",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="travel-explore" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="documents"
        options={{
          title: "Documents",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="documents" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={24} color="black" />
          ),
        }}
      />

      <Tabs.Screen name="index" options={{ tabBarButton: () => null }} />
    </Tabs>
  );
}
