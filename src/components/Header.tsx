import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Header({ title, navigation }: any) {
  const canGoBack = navigation && navigation.canGoBack();

  return (
    <View style={styles.container}>
      {/* Flèche retour uniquement si possible */}
      {canGoBack ? (
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 40 }} /> /* espace vide pour garder l'alignement */
      )}

      <Text style={styles.title}>{title}</Text>

      {/* espace vide à droite pour équilibrer */}
      <View style={{ width: 40 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 55,
    paddingBottom: 15,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  backBtn: {
    padding: 5,
  },
});
