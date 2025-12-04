import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@expo/vector-icons/Ionicons";

import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import SplashScreen from "./src/screens/SplashScreen";
import ResourcesListScreen from "./src/screens/ResourcesListScreen";
import MyReservationsScreen from "./src/screens/MyReservationsScreen";
import WeeklyReservationsScreen from "./src/screens/WeeklyReservationsScreen";

import ResourceDetailsScreen from "./src/screens/ResourceDetailsScreen";
import CheckAvailabilityScreen from "./src/screens/CheckAvailabilityScreen";
import MakeReservationScreen from "./src/screens/MakeReservationScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Icon.glyphMap = "ellipse";
          if (route.name === "Ressources") iconName = "albums-outline";
          if (route.name === "Mes réservations") iconName = "calendar-outline";
          if (route.name === "Semaine") iconName = "time-outline";
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Ressources" component={ResourcesListScreen} />
      <Tab.Screen name="Mes réservations" component={MyReservationsScreen} />
      <Tab.Screen name="Semaine" component={WeeklyReservationsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

        <Stack.Screen name="MainTabs" component={MainTabs} />

        <Stack.Screen name="ResourceDetails" component={ResourceDetailsScreen} />
        <Stack.Screen name="CheckAvailability" component={CheckAvailabilityScreen} />
        <Stack.Screen name="MakeReservation" component={MakeReservationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
