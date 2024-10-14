import React, { useEffect } from "react";
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
type FormData =
  | {
      TypeDuLitige: string;
      DateLitige: Date;
      DateEcheanceLitige: Date;
      ContratId: number;
      FactureId: number;
    }
  | {
      DateEcheanceApresProrogation: Date;
      ContratId: number;
      FactureId: number;
      MotifProrogation: string;
      TypeProrogaton: string;
      Echeance: number;
    };
export default function Facture() {
  const { contractId } = useContract();
  const { fonts, colors, layout, backgrounds, gutters, borders } = useTheme();
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");
  const navigation = useNavigation();
  const { params } = useRoute();
  const { individuId } = params as { individuId: number };
  const { data, isError, isLoading } = useQuery({
    queryKey: ["facture"],
    queryFn: () => {
      return getFactureByAcheteur({ individuId, contractId });
    },
  });
  const [formData, setFormData] = React.useState<FormData>(() => {
    console.log(title);
    if (title === "litige") {
      return {
        TypeDuLitige: "",
        DateLitige: new Date(),
        DateEcheanceLitige: new Date(),
        ContratId: contractId,
        FactureId: 0,
      };
    }
    if (title === "prorogation") {
      return {
        DateEcheanceApresProrogation: new Date(),
        ContratId: contractId,
        FactureId: 0,
        MotifProrogation: "",
        TypeProrogaton: "",
        Echeance: 0,
      };
    }
  });
  useEffect(() => {
    console.log(formData);
  }, [formData]);
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
          ]}
        >
          <InputWithTag
            titleWidth={0}
            textInputPlaceholder="Search"
            tag={{
              type: "icon",
              name: "search1",
              iconType: "AntDesign",
            }}
          />
          <TouchableOpacity
            style={[backgrounds.purple500, borders.rounded_4, { padding: 5 }]}
            onPress={() => navigation.navigate("bordureau")}
          >
            <AppIcon
              name="plussquareo"
              type="AntDesign"
              color={colors.white}
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[backgrounds.blue50, borders.rounded_4, { padding: 5 }]}
          >
            <AppIcon
              name="filter"
              type="AntDesign"
              color={colors.white}
              size={30}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          {isLoading && <ActivityIndicator />}
          {isError && <Text>No facture for this buyer</Text>}
          {!isLoading && !isError && data && data.$values.length === 0 && (
            <Text>No facture for this buyer</Text>
          )}
          {!isLoading &&
            !isError &&
            data &&
            data.$values.length > 0 &&
            data.$values.map((data: any) => {
              return (
                <FactureComponent
                  key={data.factureId}
                  facture={data}
                  onButtonPress={(value) => {
                    setTitle(value);
                    setModalVisible(true);
                    setFormData({
                      ...formData,

                      FactureId: data.factureId as number,
                    });
                  }}
                  data={data}
                />
              );
            })}
        </ScrollView>
      </View>
      <BottomModal
        title={title}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      >
        {title === "litige" ? (
          <LitigeForm formData={formData} setFormData={setFormData} />
        ) : (
          <ProrogationForm formData={formData} setFormData={setFormData} />
        )}
      </BottomModal>
    </SafeScreen>
  );
}
