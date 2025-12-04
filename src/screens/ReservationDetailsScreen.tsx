import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Header from "../components/Header";

export default function ResourceDetailsScreen({ route, navigation }: any) {
  const { item } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <Header title="Détails" navigation={navigation} />

      <View style={styles.box}>
        <Text style={styles.title}>{item.name}</Text>

        <Text style={styles.text}>📌 Type : {item.type}</Text>
        <Text style={styles.text}>📐 Capacité : {item.capacity}</Text>
        <Text style={styles.text}>📍 Localisation : {item.location}</Text>
      </View>

      {/* Bouton Réserver */}
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: "#007bff" }]}
        onPress={() => navigation.navigate("MakeReservation", { item })}
      >
        <Text style={styles.btnText}>Réserver</Text>
      </TouchableOpacity>

      {/* Bouton Vérifier disponibilité */}
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: "#28a745" }]}
        onPress={() => navigation.navigate("CheckAvailability", { item })}
      >
        <Text style={styles.btnText}>Disponibilité</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  btn: {
    marginHorizontal: 20,
    marginTop: 12,
    padding: 15,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 17,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
