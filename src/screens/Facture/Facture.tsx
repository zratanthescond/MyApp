import React, { useEffect, useState } from "react";
import WhiteCard from "@/components/atoms/form/WhiteCard";
import { SafeScreen } from "@/components/template";
import layout from "@/theme/layout";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "@/theme";
import AppIcon from "@/components/icons/AppIcons";
import { useQuery } from "@tanstack/react-query";
import FactureComponent from "@/components/molecules/Facture";
import { InputWithTag } from "@/components/atoms";
import BottomModal from "@/components/molecules/BottomModal";
import LitigeForm from "@/components/molecules/LitigeForm";
import ProrogationForm from "@/components/molecules/ProrogationForm";
import useContract from "@/contexts/auth/useContract";
import { useNavigation, useRoute } from "@react-navigation/native";
import getFactureByAcheteur from "@/services/Factures/Facture";
import { Litige, Prorogation } from "@/types/type";
import { use } from "i18next";
import SearchComponent from "@/components/molecules/SearchComponent";
import { set } from "zod";
import SelectBuyer from "@/components/molecules/SelectBuyer";
export default function Facture() {
  const { contractId } = useContract();
  const { fonts, colors, layout, backgrounds, gutters, borders } = useTheme();
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");
  const navigation = useNavigation();
  const { params } = useRoute();
  const { individuId } = params as { individuId: number };
  const [inputState, setInputState] = useState<string>("search");
  const [filtredData, setFiltredData] = useState<any>({});
  const [newIndividuId, setNewIndividuId] = useState<number>(individuId);
  const { data, isError, isLoading } = useQuery({

    queryKey: ["facture", newIndividuId],


    queryFn: () => {

      return getFactureByAcheteur({ newIndividuId, contractId });
    },
  });
  const [litigeForm, setlitigeForm] = React.useState<Litige>(

    {

      TypeDuLitige: "",
      DateLitige: new Date(),
      DateEcheanceLitige: new Date(),
      ContratId: contractId,
      FactureId: 0,

    });
  const [prorogationForm, setprorogationForm] = React.useState<Prorogation>(
    {

      DateEcheanceApresProrogation: new Date(),
      ContratId: contractId,
      FactureId: 0,
      MotifProrogation: "",
      TypeProrogation: "achat",
      Echeance: new Date(),


    });



  useEffect(() => {
    setFiltredData(data);
  }, [data]);
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
            { gap: 20 },
            layout.itemsCenter,
            layout.justifyEnd,
            backgrounds.white,
            gutters.paddingHorizontal_12,
            borders.rounded_16,
            gutters.paddingVertical_12,
            layout.z10,

          ]}
        >
          {inputState === "search" ? (
            <SearchComponent data={data} setfiltredData={setFiltredData} field="refFacture" Objectkey="facture" />
          ) :
            (<SelectBuyer onSelect={(value: number) => { setNewIndividuId(value); }} />
            )}


          <TouchableOpacity
            style={[backgrounds.purple500, borders.rounded_4, { padding: 5 }]}
            onPress={() => {
              setInputState(inputState === "search" ? "select" : "search");
            }}

          >
            {inputState === "search" ? (
              <AppIcon
                name="account-sync"
                type="MaterialCommunityIcons"
                color={colors.white}
                size={30}
              />
            ) : (
              <AppIcon
                name="text-box-search-outline"
                type="MaterialCommunityIcons"
                color={colors.white}
                size={30}
              />
            )}

          </TouchableOpacity>
        </View>

        <ScrollView>
          {isLoading && <ActivityIndicator />}
          {isError && <Text>No factures found for this buyer</Text>}
          {!isLoading && !isError && (!data || !data.$values || data.$values.length === 0) && (
            <Text>No factures found for this buyer</Text>
          )}
          {!isLoading && !isError && data && data.$values && data.$values.length > 0 &&
            filtredData && filtredData.$values && filtredData.$values.map((data: any) => {

              return (
                <FactureComponent

                  key={data.facture.factureId}
                  facture={data.facture}
                  litigeCount={data.litigeCount}
                  prorogationCount={data.prorogationCount}
                  // data={data}
                  onButtonPress={(value: string, factureId: number, dateFacture: Date) => {

                    setTitle(value);

                    setModalVisible(true);
                    value === "litige"

                      ?
                      setlitigeForm({
                        ...litigeForm,

                        FactureId: data.factureId as number,

                      })
                      : setprorogationForm({
                        ...prorogationForm,
                        FactureId: factureId as number,
                        Echeance: data.dateFacture,
                      });

                  }}

                />
              );
            })}
        </ScrollView>

      </View>
      <BottomModal
        header={<Text style={[fonts.bold, fonts.size_16, fonts.gray800]}>{title && capitalizeFirstLetter(title)}</Text>}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      >
        {title === "litige" ? (
          <LitigeForm formData={litigeForm} setFormData={setlitigeForm} setModalVisible={() => setModalVisible(false)} />
        ) : (
          <ProrogationForm formData={prorogationForm} setFormData={setprorogationForm} setModalVisible={() => setModalVisible(false)} />
        )}
      </BottomModal>
    </SafeScreen>
  );
}
