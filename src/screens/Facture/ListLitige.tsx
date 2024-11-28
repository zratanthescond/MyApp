import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@/theme";
import { useQuery } from "@tanstack/react-query";

import { useRoute } from "@react-navigation/native";
import listLitige from "@/services/Litige/listLitige";
import useRefresh from "@/contexts/auth/useRefresh";
const ListLitige = () => {
  const { fonts, layout, gutters, backgrounds, borders } = useTheme();

  const { params } = useRoute();
  const { refresh } = useRefresh();
  //console.log('facture id params', params);
  const { data, isError, isLoading } = useQuery({
    queryKey: ["litige", params.factureId, refresh],
    queryFn: () => listLitige(params.factureId),
  });

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loaderText}>Chargement des Limites...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <Text style={styles.errorText}>
        Erreur lors du chargement des Limites.
      </Text>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getButtonStyle = (statut) => {
    switch (statut) {
      case 0:
        return { backgroundColor: "green", color: "white" }; // Approved
      case 2:
        return { backgroundColor: "orange", color: "white" }; // Pending
      default:
        return { backgroundColor: "red", color: "white" }; // Rejected
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Litiges Détails</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {data && data.$values.length > 0 ? (
          data.$values.map((litige: any) => (
            <View key={litige.litigeId} style={[styles.card]}>
              <View style={(styles.header, [layout.row])}>
                <TouchableOpacity
                  style={[styles.statusButton, getButtonStyle(litige.statut)]}
                >
                  <Text style={styles.statusButtonText}>
                    {litige.statut === 0
                      ? "Approved"
                      : litige.statut === 2
                      ? "Pending"
                      : "Rejected"}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Facture Reference:</Text>
                <Text style={styles.value}>{params?.refFacture}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Date litige:</Text>
                <Text style={styles.value}>
                  {formatDate(litige.dateLitige)}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Date Echeance :</Text>
                <Text style={styles.value}>
                  {formatDate(litige.dateEcheanceLitige)}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Type du litige:</Text>
                <Text style={styles.value}>{litige.typeDuLitige}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>Aucun bordereau trouvé.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 15,
    marginHorizontal: 10,
  },
  container: {
    padding: 15,
    marginHorizontal: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  card: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: "white", // Card background set to white
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  header: {
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 15,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  label: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  value: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    textAlign: "right",
  },
  statusButton: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginLeft: 150,
  },
  statusButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  noDataText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
});

export default ListLitige;
