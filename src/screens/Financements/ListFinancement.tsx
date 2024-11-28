import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "@/theme";
import { useQuery } from "@tanstack/react-query";
import useContract from "@/contexts/auth/useContract";
import getMycontract from "@/services/Contrats/getByuser";
import listFinancement from "@/services/Financement/listFinancement";
import AppIcon from "@/components/icons/AppIcons";
import BackgroundDispoCard from "@/components/molecules/BackgroundDispoCard";
import useRefresh from "@/contexts/auth/useRefresh";
const ListFinancement = () => {
  const { fonts, layout, gutters, backgrounds } = useTheme();
  const { contractId, referenceContrat } = useContract();
  const [activeCard, setActiveCard] = useState<number>(1);

  const refresh = useRefresh();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["financement", contractId, refresh],
    queryFn: () => listFinancement(contractId),
  });

  const contract = useQuery({
    queryKey: ["contract"],
    queryFn: () => getMycontract(),
  });

  if (isLoading) {
    return <Text>Chargement des financements...</Text>;
  }

  if (isError) {
    return <Text>Erreur lors du chargement des financements.</Text>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getBackgroundColor = (statut) => {
    switch (statut) {
      case "Approved":
        return "#E9FFE9"; // Vert
      case "Pending":
        return "#FFF5E5"; // Orange
      default:
        return "#ffa1a1"; // Rouge
    }
  };

  const filteredFinancements = data?.$values.filter((financement) => {
    const type = activeCard === 1 ? "Financement" : "LiberationFDG";
    return financement.typeDeFinancement === type;
  });

  return (
    <View style={{ flex: 1 }}>
      {/* BackgroundDispoCard moved above ScrollView */}
      <BackgroundDispoCard
        activeCard={activeCard}
        text1={"Financement"}
        text2={"LiberationFDG"}
        setActiveCard={(val: number) => {
          setActiveCard(val);
        }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        {filteredFinancements && filteredFinancements.length > 0 ? (
          filteredFinancements.map((financement) => (
            <View
              key={financement.financementId}
              style={[
                styles.card,
                {
                  backgroundColor: getBackgroundColor(
                    financement.statutFinancement
                  ),
                },
              ]}
            >
              <View style={styles.header}>
                <Text style={styles.title}>Financement </Text>
              </View>
              <Text style={styles.price}>
                {financement.montantFinancement} TND
              </Text>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Réf Contrat:</Text>
                <Text style={styles.value}>{referenceContrat}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Type :</Text>
                <Text style={styles.value}>
                  {financement.typeDeFinancement}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Date :</Text>
                <Text style={styles.value}>
                  {formatDate(financement.dateDeFinancement)}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Paiement:</Text>
                <Text style={styles.value}>
                  {financement.methodeDePaiement}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Statut:</Text>
                <AppIcon
                  name={
                    financement.statutFinancement === "Approved"
                      ? "bookmark-check"
                      : financement.statutFinancement === "Pending"
                      ? "bookmark"
                      : "bookmark-remove"
                  }
                  type="MaterialCommunityIcons"
                  size={40}
                  color={
                    financement.statutFinancement === "Approved"
                      ? "green"
                      : financement.statutFinancement === "Pending"
                      ? "orange"
                      : "red"
                  }
                />
              </View>
            </View>
          ))
        ) : (
          <Text>Aucun financement trouvé.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
    margin: 10,
  },
  card: {
    width: "48%",
    marginBottom: 15,
    padding: 15,
    marginTop: 15,

    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 5,
    borderBottomWidth: 0.5,
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
    //textAlign: 'right',
    flexWrap: "nowrap",
  },
});

export default ListFinancement;
