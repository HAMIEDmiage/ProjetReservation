import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Header from "../components/Header";
import { makeReservation } from "../api/api";
import { getToken } from "../utils/auth";

export default function MakeReservationScreen({ route, navigation }: any) {
  const { item } = route.params;

  const [date, setDate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const reserveNow = async () => {
    const token = await getToken();
    await makeReservation(item.id, date, start, end, token);

    Alert.alert("Succès", "Réservation confirmée !");
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Réservation" navigation={navigation} />

      <View style={styles.box}>
        <Text style={styles.title}>{item.name}</Text>

        <TextInput placeholder="Date YYYY-MM-DD" style={styles.input} onChangeText={setDate} />
        <TextInput placeholder="Début HH:MM" style={styles.input} onChangeText={setStart} />
        <TextInput placeholder="Fin HH:MM" style={styles.input} onChangeText={setEnd} />

        <TouchableOpacity style={styles.btn} onPress={reserveNow}>
          <Text style={styles.btnText}>Confirmer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { backgroundColor: "#fff", padding: 20, margin: 20, borderRadius: 10 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 10, marginBottom: 12 },
  btn: { backgroundColor: "#68c77eff", padding: 15, borderRadius: 10 },
  btnText: { textAlign: "center", color: "#fff", fontWeight: "bold" },
});
