import { Stack } from "expo-router";
import React from "react";
import "../global.css";
import { View } from "react-native-web";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#f4511e" },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)"/>
    </Stack>
  );
};

export default _layout;
