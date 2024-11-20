import React, { useEffect, useState } from "react";
import { SafeScreen } from "@/components/template";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/theme";

import AppIcon from "@/components/icons/AppIcons";
import { ScrollView } from "react-native-gesture-handler";
import IndividuComponent from "@/components/molecules/Individu";
import BottomModal from "@/components/molecules/BottomModal";
import Button from "@/components/atoms/form/Button";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  getAcheteur,
  getIndividu,
  addAcheteur,
} from "@/services/Individu/individu";
import useContract from "@/contexts/auth/useContract";
import GrayCard from "@/components/atoms/dashboardAtoms/GrayCard";
import SearchComponent from "@/components/molecules/SearchComponent";
export default function Individu(): React.ReactElement {
  const { fonts, colors, layout, backgrounds, gutters, borders } = useTheme();
  const [modalVisible, setModalVisible] = React.useState(false);
  const { contractId } = useContract();
  const [buyers, setBuyers] = React.useState<number[]>([]);
  //console.log(contractId);

  const mutation = useMutation({
    mutationKey: ["getAcheteur"],

    mutationFn: () => {

      return addAcheteur(buyers, contractId);
    },
    onSuccess: async (data) => {
      await acheteurs.refetch();
      await individuData.refetch();
      setBuyers([]);




      Alert.alert("success", "Acheteur ajouté", [{
        text: "OK",
        onPress: () => setModalVisible(false)

      }]);
    },
    onError: (error) => {
      Alert.alert("error", "Une erreur est survenue", [{ text: "Ok" }]);
    },
  }
  );

  const individuData = useQuery({
    queryKey: ["contractId"],
    queryFn: () => {
      return getIndividu(contractId);
    },
  });
  const acheteurs = useQuery({
    queryKey: ["acheteurs", modalVisible],
    queryFn: () => {

      //console.log("fetching data")
      return getAcheteur(contractId);
    },
  });
  const toggleNumber = (num) => {
    //console.log(buyers);
    setBuyers((prevNumbers) => {
      if (prevNumbers.includes(num)) {
        // If number exists, remove it
        return prevNumbers.filter((n) => n !== num);
      } else {
        // If number doesn't exist, add it
        return [...prevNumbers, num];
      }
    });
  };
  useEffect(() => {
    //console.log(buyers);
  }, [buyers]);

  const [filtredData, setFiltredData] = React.useState(acheteurs.data);



  return (
    <SafeScreen>
      <View style={[backgrounds.white, layout.flex_1]}>
        <Text
          style={[
            fonts.blue100,
            fonts.bold,
            fonts.size_16,
            { textAlign: "center" },
            gutters.margin_16,
          ]}
        >
          Liste des acheteurs
        </Text>
        <View
          style={[
            layout.row,
            layout.justifyEnd,
            gutters.marginHorizontal_16,
            {
              gap: 10,
            },
          ]}
        >
          <SearchComponent data={acheteurs.data} setfiltredData={setFiltredData} field="nom" Objectkey="acheteur" />
          <TouchableOpacity
            style={[backgrounds.purple500, borders.rounded_4, { padding: 5 }]}
            onPress={() => setModalVisible(true)}
          >
            <AppIcon
              name="adduser"
              type="AntDesign"
              color={colors.white}
              size={30}
            />
          </TouchableOpacity>

        </View>
        <ScrollView>
          {filtredData && filtredData.$values && filtredData.$values.map((acheteur: any) => {
            console.log(acheteur);
            return (
              <IndividuComponent

                key={acheteur.acheteur.individuId}

                individu={acheteur.acheteur}

                navigation={true}
                pendingLimiteCount={acheteur.pendingLimiteCount}

              />
            );
          })}
        </ScrollView>
        <BottomModal
          title="Liste des individus"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        >
          <ScrollView
            contentContainerStyle={[
              layout.justifyCenter,
              gutters.paddingBottom_80,
              backgrounds.gray50,
            ]}
          >
            {individuData.data?.$values.map((individu: any) => {
              //console.log(individu);
              return (
                <IndividuComponent
                  key={individu.individuId}
                  checkbox={true}
                  individu={individu}
                  onPress={() => toggleNumber(individu.individuId)}
                  buyers={buyers}
                />
              );
            })}
            <View
              style={[
                layout.row,
                layout.justifyAround,
                backgrounds.white,
                gutters.margin_12,
                layout.itemsCenter,
                borders.rounded_16,
              ]}
            >
              <Button
                outlined={true}
                label="annuler"
                onPress={() => {
                  setModalVisible(false);
                }}
              />
              <Button label="confirmer" onPress={() => mutation.mutate()} />
            </View>
          </ScrollView>
        </BottomModal>
      </View>
    </SafeScreen>
  );
}
