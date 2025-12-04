import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import * as SecureStore from "expo-secure-store";
import { fetchMyReservations } from "../api/api";

export default function SplashScreen({ navigation }: any) {
  useEffect(() => {
    const checkAuth = async () => {
      const token = await SecureStore.getItemAsync("token");
      console.log("🔎 TOKEN LU AU DÉMARRAGE =", token);

      //  AUCUN TOKEN → Login
      if (!token) {
        console.log("➡️ Aucun token → Login");
        return navigation.replace("Login");
      }

      // ✔ Token existe → Vérifier s'il est valide
      try {
        const res = await fetchMyReservations(token);

        if (res.error === "Invalid token" || res.error === "Token expired") {
          console.log("⚠️ Token invalide → suppression + Login");
          await SecureStore.deleteItemAsync("token");
          return navigation.replace("Login");
        }

        console.log("✔ Token valide → MainTabs");
        navigation.replace("MainTabs");
      } catch (e) {
        console.log("❌ Erreur API → On supprime le token par sécurité");
        await SecureStore.deleteItemAsync("token");
        navigation.replace("Login");
      }
    };

    setTimeout(checkAuth, 1200);
  }, []);

  return (
    <View style={styles.center}>
      <Text style={{ fontSize: 28, fontWeight: "bold" }}>Chargement...</Text>
      <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
