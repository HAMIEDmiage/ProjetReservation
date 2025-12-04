import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ResourcesListScreen from "../screens/ResourcesListScreen";
import ResourceDetailsScreen from "../screens/ResourceDetailsScreen";
import MakeReservationScreen from "../screens/MakeReservationScreen";
import CheckAvailabilityScreen from "../screens/CheckAvailabilityScreen";
import MyReservationsScreen from "../screens/MyReservationsScreen";
import WeeklyReservationsScreen from "../screens/WeeklyReservationsScreen";
import MainTabs from "./MainTabs";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />

        <Stack.Screen name="ResourceDetails" component={ResourceDetailsScreen} />
        <Stack.Screen name="MakeReservation" component={MakeReservationScreen} />
        <Stack.Screen name="CheckAvailability" component={CheckAvailabilityScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
