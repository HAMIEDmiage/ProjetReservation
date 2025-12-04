import React, { useCallback, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { fetchWeeklyReservations } from "../api/api";
import * as SecureStore from "expo-secure-store";

export default function WeeklyReservationsScreen() {
  const [data, setData] = useState<any>(null);

  const load = useCallback(async () => {
    const token = await SecureStore.getItemAsync("token");
    if (!token) return;

    try {
      const res = await fetchWeeklyReservations(token);

      // 🔥 Filtrer seulement confirmed
      const confirmed = res.reservations.filter(
        (r: any) => r.status === "confirmed"
      );

      setData({
        ...res,
        reservations: confirmed,
      });
    } catch (err) {
      console.log("Erreur semaine :", err);
    }
  }, []);

  // Recharge automatiquement à chaque fois que l'écran est ouvert
  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  if (!data) return null;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Semaine</Text>
      </View>

      <Text style={styles.range}>
        {data.week_start} → {data.week_end}
      </Text>

      {data.reservations.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 30, fontSize: 16 }}>
          Aucune réservation cette semaine
        </Text>
      ) : (
        <FlatList
          data={data.reservations}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.resource_name}</Text>
              <Text style={styles.date}>
                {item.date} — {item.start_time} → {item.end_time}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 55,
    paddingBottom: 15,
    alignItems: "center",
    backgroundColor: "#ffffffff",
    elevation: 5,
  },
  headerTitle: { fontSize: 22, fontWeight: "bold" },
  range: { textAlign: "center", fontSize: 18, marginVertical: 15 },
  card: {
    backgroundColor: "#ffffffff",
    margin: 12,
    padding: 18,
    borderRadius: 12,
    elevation: 3,
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  date: { fontSize: 16, color: "#131614ff" },
});
