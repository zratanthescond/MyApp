import {
  Image,
  TouchableOpacity,
  View,
  Text,
  Modal,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@/theme";
import logo from "../../theme/assets/images/logo.png";

import { ImageVariant } from "../atoms";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import useContract from "@/contexts/auth/useContract";
import SelectContract from "../molecules/SelectContract";
import Button from "../atoms/form/Button";
import useRefresh from "@/contexts/auth/useRefresh";
import AppIcon from "../icons/AppIcons";
export default function HeaderLogo() {
  const { layout, backgrounds, gutters, colors, fonts, borders } = useTheme();
  const navigation = useNavigation();
  const { contractId, referenceContrat } = useContract();
  const [modalVisible, setModalVisible] = React.useState(false);
  const { refresh, setRefresh } = useRefresh();
  const [height, width] = [
    Dimensions.get("window").height,
    Dimensions.get("window").width,
  ];
  return (
    <>
      <View
        style={[
          layout.row,
          layout.justifyBetween,

          gutters.marginHorizontal_12,
          layout.itemsStart,
          { height: 80 },
          layout.itemsCenter,
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            }
          }}
        >
          <Icon name="arrow-left" size={30} color={colors.gray800} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setRefresh(refresh + 1);
          }}
          style={{
            flex: 1,
            alignItems: "center",
            maxWidth: "60%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            paddingHorizontal: 15,
            height: 50,
            borderRadius: 10,
            elevation: 10,
            backgroundColor: "white",
          }}
        >
          <ImageVariant
            source={logo}
            style={{
              height: 80,
              width: "100%",
              resizeMode: "contain",
            }}
          />
          <AppIcon
            name="cloud-refresh"
            type="MaterialCommunityIcons"
            size={30}
            color={colors.blue100}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View
            style={[
              backgrounds.blue100,
              { paddingVertical: 6, paddingHorizontal: 12 },
              borders.rounded_16,
              layout.itemsCenter,
            ]}
          >
            <Text style={[fonts.size_12, fonts.white, fonts.bold]}>
              Contract:
            </Text>

            <View
              style={[
                backgrounds.white,
                borders.rounded_16,
                layout.row,
                layout.itemsCenter,
                layout.justifyBetween,
              ]}
            >
              <Text style={[fonts.size_12, fonts.blue100, { paddingLeft: 2 }]}>
                {referenceContrat && referenceContrat.substring(0, 6) + "..."}
              </Text>
              <AppIcon
                name="chevron-down"
                type="MaterialCommunityIcons"
                size={20}
                color={colors.blue100}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {modalVisible && (
        <>
          <View
            style={[
              backgrounds.gray800,
              layout.absolute,
              { opacity: 0.7, height: height, width: width },
            ]}
          ></View>
          <View
            style={[
              layout.absolute,
              layout.itemsCenter,
              layout.justifyCenter,
              backgrounds.white,
              gutters.padding_12,
              gutters.margin_12,
              borders.rounded_16,
              { top: 100, width: width - 24 },
            ]}
          >
            <Text
              style={[
                fonts.gray800,
                fonts.bold,
                fonts.size_16,
                gutters.padding_12,
              ]}
            >
              Select Contract
            </Text>
            <SelectContract
              setModalVisible={setModalVisible}
              modalVisible={modalVisible}
              lastContractId={contractId}
            />

            <Button label="Close" onPress={() => setModalVisible(false)} />
          </View>
        </>
      )}
    </>
  );
}
