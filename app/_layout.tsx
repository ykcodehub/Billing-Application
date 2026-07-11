

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