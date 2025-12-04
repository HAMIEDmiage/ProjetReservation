import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Header from "../components/Header";
import { checkAvailability } from "../api/api";

export default function CheckAvailabilityScreen({ route, navigation }: any) {
  const { item } = route.params;

  const [date, setDate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [result, setResult] = useState("");

  const verify = async () => {
    const res = await checkAvailability(item.id, date, start, end);
    setResult(res.available ? "Disponible ✔" : "Indisponible ❌");
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Disponibilité" navigation={navigation} />

      <View style={styles.box}>
        <Text style={styles.title}>{item.name}</Text>

        <TextInput placeholder="Date YYYY-MM-DD" style={styles.input} onChangeText={setDate} />
        <TextInput placeholder="Début HH:MM" style={styles.input} onChangeText={setStart} />
        <TextInput placeholder="Fin HH:MM" style={styles.input} onChangeText={setEnd} />

        <TouchableOpacity style={styles.btn} onPress={verify}>
          <Text style={styles.btnText}>Vérifier la Disponibilité </Text>
        </TouchableOpacity>

        {result !== "" && <Text style={styles.result}>{result}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { backgroundColor: "#fff", padding: 20, margin: 20, borderRadius: 10 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  input: {
    borderWidth: 1, borderColor: "#ccc", padding: 12,
    borderRadius: 10, marginBottom: 12,
  },
  btn: { backgroundColor: "#2fcd66ff", padding: 15, borderRadius: 10 },
  btnText: { textAlign: "center", color: "#fff", fontWeight: "bold" },
  result: { marginTop: 20, fontSize: 18, fontWeight: "bold" },
});
