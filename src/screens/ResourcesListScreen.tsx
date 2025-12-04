import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { fetchResources } from "../api/api";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

export default function ResourceListScreen({ navigation }: any) {
  const [resources, setResources] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      const data = await fetchResources();
      setResources(data);
    } catch (e) {
      console.log("Erreur chargement ressources :", e);
    }
  };

  /** Nouveau bouton logout */
  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    navigation.replace("Login");
  };

  /** 🔍 Recherche par ID uniquement */
  const filtered = resources.filter((item) =>
    item.id.toString().includes(search)
  );

  return (
    <View style={{ flex: 1 }}>
      {/* ---------- HEADER ---------- */}
      <View style={styles.header}>
        <Text style={styles.title}>Ressources</Text>

        {/* Nouveau bouton logout avec icône */}
        <TouchableOpacity onPress={logout}>
          <Ionicons name="log-out-outline" size={30} color="red" />
        </TouchableOpacity>
      </View>

      {/* ---------- BARRE DE RECHERCHE ---------- */}
      <TextInput
        placeholder="Rechercher par ID"
        value={search}
        onChangeText={setSearch}
        style={styles.search}
        keyboardType="numeric"
      />

      {/* ---------- LISTE DES RESSOURCES ---------- */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("ResourceDetails", { item: item })
            }
          >
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text>ID : {item.id}</Text>
            <Text>Type : {item.type}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 55,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: "#ffffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  search: {
    margin: 15,
    padding: 12,
    borderWidth: 1,
    borderColor: "#dac9c9ff",
    borderRadius: 10,
  },
  card: {
    backgroundColor: "#ffffffff",
    marginHorizontal: 15,
    marginVertical: 8,
    padding: 15,
    borderRadius: 12,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
});
