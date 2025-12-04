import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { fetchMyReservations, deleteReservation } from "../api/api";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native";

export default function MyReservationsScreen({ navigation }) {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadReservations = useCallback(async () => {
    try {
      setLoading(true);

      const token = await SecureStore.getItemAsync("token");
      if (!token) return;

      const res = await fetchMyReservations(token);
      console.log("🟦 API RES =", res);

      if (!Array.isArray(res)) throw new Error("Réponse invalide de l’API");

      // Trier du plus récent au plus ancien
      const ordered = [...res].sort(
        (a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      // 🔥 Filtrer → afficher uniquement les réservations confirmées
      const filtered = ordered.filter(r => r.status === "confirmed");

      setReservations(filtered);
    } catch (err) {
      console.log("❌ Erreur chargement mes réservations :", err);
      Alert.alert("Erreur", "Impossible de charger vos réservations");
    }

    setLoading(false);
    setRefreshing(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadReservations();
    }, [loadReservations])
  );

  const handleDelete = (id) => {
    Alert.alert("Annuler", "Voulez-vous annuler cette réservation ?", [
      { text: "Non", style: "cancel" },
      {
        text: "Oui",
        onPress: async () => {
          try {
            const token = await SecureStore.getItemAsync("token");
            await deleteReservation(id, token);
            setReservations((prev) => prev.filter((r) => r.id !== id));
          } catch (err) {
            Alert.alert("Erreur", "Impossible d’annuler la réservation");
          }
        }
      }
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.header}>Mes réservations</Text>

      <FlatList
        data={reservations}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          loadReservations();
        }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.resource_name}</Text>
            <Text>
              {item.date} — {item.start_time} → {item.end_time}
            </Text>

            <TouchableOpacity
              style={styles.btn}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.btnText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 55,
    paddingBottom: 15,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#fff",
    elevation: 5
  },
  card: {
    backgroundColor: "#fff",
    margin: 12,
    padding: 15,
    borderRadius: 12,
    elevation: 3
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5
  },
  btn: {
    marginTop: 10,
    backgroundColor: "#761310ff",
    paddingVertical: 10,
    borderRadius: 8
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  }
});
