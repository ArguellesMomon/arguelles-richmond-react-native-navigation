import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "../context/ThemeContext";

import HomeScreen from "../screens/Home";
import CartScreen from "../screens/Cart";
import CheckoutScreen from "../screens/Checkout";

export type RootStackParamList = {
  Home: undefined;
  Cart: undefined;
  Checkout: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { 
          backgroundColor: colors.background, // Theme-aware background
        },
        // Theme-aware header styling (for screens that show headers)
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
          color: colors.text,
        },
        headerShadowVisible: true,
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      />
      <Stack.Screen 
        name="Cart" 
        component={CartScreen}
        options={{
          headerShown: true, // Cart has its own custom header
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      />
      <Stack.Screen 
        name="Checkout" 
        component={CheckoutScreen}
        options={{
          headerShown: true, // Checkout has its own custom header
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      />
    </Stack.Navigator>
  );
}