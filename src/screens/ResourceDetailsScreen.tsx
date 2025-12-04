import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Header from "../components/Header";

export default function ResourceDetailsScreen({ route, navigation }: any) {
  const { item } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <Header title="Détails" navigation={navigation} />

      <View style={styles.box}>
        <Text style={styles.title}>{item.name}</Text>
        <Text>Type : {item.type}</Text>
        <Text>Capacité : {item.capacity}</Text>
        <Text>Localisation : {item.location}</Text>
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("MakeReservation", { item })}
      >
        <Text style={styles.btnText}>Réserver</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: "#30b186ff" }]}
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
    padding: 20,
    margin: 20,
    borderRadius: 10,
    elevation: 3,
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  btn: {
    backgroundColor: "#3997d1ff",
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  btnText: { textAlign: "center", color: "#fff", fontWeight: "bold" },
});
