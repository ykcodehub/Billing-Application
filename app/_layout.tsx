// import { Tabs } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import { useEffect } from "react";
// import { initializeDatabase } from "../database/schema";

// export default function Layout() {

//   useEffect(() => {
//     initializeDatabase();
//   }, []);

//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarActiveTintColor: "#111",
//         tabBarInactiveTintColor: "#999",
//       }}
//     >
//       <Tabs.Screen
//         name="home"
//         options={{
//           title: "Home",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="home" color={color} size={size} />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="billing"
//         options={{
//           title: "Bills",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="receipt" color={color} size={size} />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="settings"
//         options={{
//           title: "Settings",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="settings" color={color} size={size} />
//           ),
//         }}
//       />

//       {/* Hidden Screens */}

//       <Tabs.Screen
//         name="products"
//         options={{
//           href: null,
//         }}
//       />

//       <Tabs.Screen
//         name="history"
//         options={{
//           href: null,
//         }}
//       />

//       <Tabs.Screen
//         name="reports"
//         options={{
//           href: null,
//         }}
//       />
//     </Tabs>
//   );
// }

import { Stack } from "expo-router";
import { initializeDatabase } from "../database/schema";

initializeDatabase();

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}