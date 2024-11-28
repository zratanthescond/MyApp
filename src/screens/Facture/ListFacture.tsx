import React, { useEffect, useState } from "react";
import { SafeScreen } from "@/components/template";
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useTheme } from "@/theme";
import { useQuery } from "@tanstack/react-query";
import FactureComponent from "@/components/molecules/Facture";
import getFactureByBordereau from "@/services/Factures/listFactureBordereau";
import useContract from "@/contexts/auth/useContract";
import { useNavigation, useRoute } from "@react-navigation/native";
import AppIcon from "@/components/icons/AppIcons";
import BottomModal from "@/components/molecules/BottomModal";
import { set } from "zod";
import useRefresh from "@/contexts/auth/useRefresh";
export default function ListFacture() {
  const { contractId } = useContract();
  const { colors, layout, gutters, borders, fonts, backgrounds } = useTheme();
  const [filtredData, setFiltredData] = useState<any>([]);
  const { params } = useRoute();
  const { bordereauId } = params as { bordereauId: number };
  const navigation = useNavigation();
  const { refresh } = useRefresh();
  const [title, setTitle] = React.useState<string>("");
  const { data, isError, isLoading } = useQuery({
    queryKey: ["facture", bordereauId, refresh],
    queryFn: () =>
      getFactureByBordereau({ newBordereauId: bordereauId, contractId }),
  });

  useEffect(() => {
    if (data && data.$values) {
      setFiltredData(data.$values);
    }
  }, [data]);

  const handleSearch = (text: string) => {
    if (data && data.$values) {
      const filtered = data.$values.filter((item: any) =>
        item.refFacture.toLowerCase().includes(text.toLowerCase())
      );
      setFiltredData(filtered);
    }
  };

  // Gérer l'ouverture du modal avec un contrôle de titre

  // Gérer la logique de navigation dans le modal
  const handleNavigation = (
    factureId: number,
    refFacture: string,
    path: string
  ) => {
    if (path === "litige") {
      navigation.navigate("ListLitige", { factureId, refFacture });
    } else if (path === "prorogation") {
      navigation.navigate("ListProrogation", { factureId, refFacture });
    }
  };
  function capitalizeFirstLetter(title: string) {
    return title[0].toUpperCase() + title.slice(1);
  }
  return (
    <SafeScreen>
      <View
        style={[
          { height: "100%", width: "100%" },
          gutters.paddingHorizontal_12,
        ]}
      >
        <View
          style={[
            layout.row,
            layout.itemsCenter,
            layout.justifyEnd,
            gutters.paddingHorizontal_12,
            borders.rounded_16,
            gutters.paddingVertical_24,
          ]}
        >
          {/* Champ de recherche avec icône à l'intérieur */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: colors.gray200,
              borderRadius: 8,
              height: 40,
              width: "100%",
              paddingLeft: 10, // Espace pour l'icône
            }}
          >
            {/* Icône de recherche */}
            <AppIcon
              name={"magnify"} // Icône de recherche de MaterialCommunityIcons
              type={"MaterialCommunityIcons"}
              size={20} // Taille de l'icône
              color={colors.gray500} // Couleur de l'icône
              style={{ marginRight: 10 }} // Espacement entre l'icône et le texte
            />
            {/* Input de recherche */}
            <TextInput
              style={{
                flex: 1, // Prendre toute la largeur restante
                height: "100%",
              }}
              placeholder="Search Facture..."
              onChangeText={handleSearch} // Filtrage lors de la saisie
            />
          </View>
        </View>

        <ScrollView>
          {isLoading && <ActivityIndicator />}
          {isError && <Text>No factures found for this bordereau</Text>}
          {!isLoading && !isError && filtredData.length === 0 && (
            <Text>No factures match your search</Text>
          )}
          {!isLoading &&
            !isError &&
            filtredData.length > 0 &&
            filtredData.map((data: any) => (
              <FactureComponent
                key={data.factureId}
                facture={data}
                data={data}
                onButtonPress={(path: string, factureId: number) => {
                  handleNavigation(factureId, data.refFacture, path);
                }}
              />
            ))}
        </ScrollView>
      </View>
    </SafeScreen>
  );
}
