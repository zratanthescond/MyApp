import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import GrayCard from "@/components/atoms/dashboardAtoms/GrayCard";

import Button from "@/components/atoms/form/Button";
import { useTheme } from "@/theme";
import ProgressBar from "@/components/atoms/dashboardAtoms/ProgressBar";

import Dropdown from "@/components/atoms/Dropdown";
import { InputWithTag } from "@/components/atoms";
import { useNavigation, RouteProp } from "@react-navigation/native";
import DatePicker from "react-native-date-picker";
import { Facture, FormulaireData } from "@/types/bordereaux";
import createBorderau from "@/services/Bordereaux/createBorderau";
import { useMutation } from "@tanstack/react-query";
import WhiteCard from "@/components/atoms/form/WhiteCard";
import { SelectList } from "react-native-dropdown-select-list";
import { getAcheteur } from "@/services/Individu/individu";
import { useQuery } from "@tanstack/react-query";
import useContract from "@/contexts/auth/useContract";
export default function BordureauDetails({
  route,
}: {
  route: RouteProp<{
    params: {
      data: FormulaireData;
      setData: React.Dispatch<React.SetStateAction<FormulaireData>>;
    };
  }>;
}) {
  const { contractId } = useContract();
  const dataReglement = [
    { key: "1", value: "Traite" },
    { key: "2", value: "Chèque" },
    { key: "3", value: "Financements" },
  ];

  const dataDocument = [
    { key: "1", value: "Facture" },
    { key: "2", value: "B.Commande" },
    { key: "3", value: "Marche" },
  ];
  const navigate = useNavigation();
  const [date, setDate] = useState(new Date());
  const { data } = route.params;
  const [bordereau, setBordereau] = useState<FormulaireData>(data);
  const [facture, setFacture] = useState<Facture>({
    MontantDocument: bordereau.MontantTotal / bordereau.NombreDocuments,
    RefFacture: "",
    Echeance: 0,
    DateFacture: date,
    ModeReglement: dataReglement[0].value,
    TypeDocument: dataDocument[0].value,
    ContratId: contractId,
  });

  const { height } = Dimensions.get("window");
  const { layout, backgrounds, fonts, colors, gutters } = useTheme();

  const textStyle = [
    fonts.gray800,
    fonts.bold,
    { paddingVertical: 10 },
    { paddingHorizontal: 5 },
  ];

  const [open, setOpen] = useState(false);
  const handleInputChange = (
    field: keyof Facture,
    value: string | number | Date
  ) => {
    setFacture({
      ...facture,
      [field]: value,
    });
  };
  const handleAddData = (newData: Facture) => {
    setBordereau({
      ...bordereau,
      Factures: [...bordereau.Factures, newData],
    });
  };
  const mutatation = useMutation({
    mutationFn: () => {
      return createBorderau(bordereau);
    },
  });
  const buttonLable = () => {
    if (bordereau.Factures.length < bordereau.NombreDocuments) {
      return {
        label: `Suivant (${bordereau.Factures.length}/${bordereau.NombreDocuments})`,
        onPress: () => {
          handleAddData(facture);
        },
      };
    }
    return {
      label: "Envoyer",
      onPress: () => {
        mutatation.mutate();
      },
    };
  };
  useEffect(() => {
    console.log(facture);
  }, [facture]);

  const acheteur = useQuery({
    queryKey: ["acheteur"],
    queryFn: () => getAcheteur(contractId),
  });
  [acheteurList, setAcheteurList] = useState([]);
  useEffect(() => {
    setAcheteurList([]);
    if (acheteur.data?.$values) {
      acheteur.data.$values.map((acheteur) => {
        setAcheteurList((prevList) => [
          ...prevList,
          { key: acheteur.individuId, value: acheteur.nom },
        ]);
      });
    }
  }, [acheteur.data]);
  return (
    <SafeAreaView>
      <View style={[layout.fullWidth, layout.fullHeight, backgrounds.white]}>
        <GrayCard>
          <ScrollView contentContainerStyle={[layout.itemsCenter]}>
            {mutatation.isError && <Text>{mutatation.error.message}</Text>}

            <ProgressBar
              title="Simulation Pour Compléter"
              progress={
                (bordereau.Factures.reduce(
                  (acc, f) => acc + f.MontantDocument,
                  0
                ) *
                  100) /
                bordereau.MontantTotal
              }
              color="purple100"
              progressColor="purple500"
              accumulated={bordereau.Factures.reduce(
                (acc, f) => acc + f.MontantDocument,
                0
              )}
              part={data.MontantTotal}
            />

            <WhiteCard
              style={[
                layout.row,

                gutters.padding_16,
                layout.justifyBetween,
                layout.flex_1,
                layout.itemsCenter,
                //  gutters.marginHorizontal_12,
                { zIndex: 101 },
              ]}
            >
              <Text style={textStyle}>Acheteur</Text>
              {acheteur.data && (
                <Dropdown
                  data={acheteurList}
                  setSelected={(val: string) =>
                    handleInputChange("individuId", val)
                  }
                  save="key"
                  search={true}
                />
              )}
            </WhiteCard>
            <WhiteCard
              style={[
                layout.row,
                gutters.padding_16,
                layout.flex_1,
                layout.justifyBetween,
                layout.itemsCenter,
                gutters.marginHorizontal_12,
                layout.z10,
              ]}
            >
              <View style={[layout.flex_1, layout.col]}>
                <Text style={textStyle}>Type De reglement</Text>
                <Dropdown
                  data={dataReglement}
                  setSelected={(val: string) =>
                    handleInputChange("ModeReglement", val)
                  }
                />
              </View>
              <View style={[layout.flex_1, layout.col]}>
                <Text style={textStyle}>Type De document</Text>
                <Dropdown
                  data={dataDocument}
                  setSelected={(val: string) => {
                    handleInputChange("TypeDocument", val);
                  }}
                />
              </View>
            </WhiteCard>
            <WhiteCard style={[layout.row, gutters.padding_16]}>
              <InputWithTag
                title="Montant Doc"
                tag={{ type: "text", text: "TND" }}
                textInputPlaceholder={(
                  data.MontantTotal / data.NombreDocuments
                ).toString()}
                onChange={(text) => {
                  handleInputChange("MontantDocument", text as number);
                }}
                value={facture.MontantDocument}
              />
            </WhiteCard>

            <WhiteCard style={[layout.row, gutters.padding_16]}>
              <Text style={textStyle}>Ref Document</Text>
              <InputWithTag
                titleWidth={0}
                textInputPlaceholder="Ref Document"
                onChange={(text: string) =>
                  handleInputChange("RefFacture", text as string)
                }
              />
            </WhiteCard>
            <WhiteCard style={[layout.row, gutters.padding_16]}>
              <Text style={textStyle}>Echeance</Text>
              <InputWithTag
                titleWidth={0}
                textInputPlaceholder="Echeance"
                onChange={(text) => {
                  handleInputChange("Echeance", text as number);
                }}
              />
            </WhiteCard>
            <WhiteCard style={[layout.row, gutters.padding_16]}>
              <Text style={textStyle}>Date du document</Text>
              <InputWithTag
                inputDisabled={true}
                titleWidth={0}
                textInputPlaceholder={date.toLocaleString()}
                onChange={(text: Date) => {
                  handleInputChange("DateFacture", text as Date);
                }}
                tag={{
                  type: "icon",
                  name: "calendar-month",
                  iconType: "MaterialIcons",
                }}
                onIconPress={() => {
                  setOpen(true);
                }}
              />
            </WhiteCard>
            <DatePicker
              mode="date"
              modal
              open={open}
              date={date}
              onConfirm={(date) => {
                setOpen(false);
                setDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
            <View
              style={[
                layout.flex_1,
                layout.row,
                layout.justifyBetween,
                gutters.padding_12,
              ]}
            >
              <Button
                outlined={true}
                label={"Annulé"}
                onPress={() => navigate.goBack()}
              />
              <Button
                label={buttonLable().label}
                onPress={buttonLable().onPress}
              />
            </View>
          </ScrollView>
        </GrayCard>
      </View>
    </SafeAreaView>
  );
}
