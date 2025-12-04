import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ResourcesListScreen from "../screens/ResourcesListScreen";
import MyReservationsScreen from "../screens/MyReservationsScreen";
import WeeklyReservationsScreen from "../screens/WeeklyReservationsScreen";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Ressources" component={ResourcesListScreen} />
      <Tab.Screen name="Réservations" component={MyReservationsScreen} />
      <Tab.Screen name="Semaine" component={WeeklyReservationsScreen} />
    </Tab.Navigator>
  );
}
