import { Image, TouchableOpacity, View, Text, Modal, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@/theme";
import logo from "../../theme/assets/images/logo.png";

import { ImageVariant } from "../atoms";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import useContract from "@/contexts/auth/useContract";

import SelectContract from "../molecules/SelectContract";
import Button from "../atoms/form/Button";
import WhiteCard from "../atoms/form/WhiteCard";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import AppIcon from "../icons/AppIcons";
export default function HeaderLogo() {
  const { layout, backgrounds, gutters, colors, fonts, borders } = useTheme();
  const navigation = useNavigation();
  const { contractId, referenceContrat } = useContract();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [height, width] = [Dimensions.get("window").height, Dimensions.get("window").width];
  return (
    < >
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

        <ImageVariant
          source={logo}
          style={{ height: 80, width: "60%", aspectRatio: 6 }}
        />

        <TouchableOpacity
          onPress={() => {
            setModalVisible(!modalVisible);
          }}

        >
          <View style={[backgrounds.blue100, { padding: 4 }, borders.rounded_4]}>
            <Text style={[fonts.size_12, fonts.white]}>Contract: </Text>

            <View style={[backgrounds.white, borders.rounded_4, layout.row, layout.itemsCenter, layout.justifyBetween]}>
              <Text style={[fonts.size_12, fonts.blue100, { paddingLeft: 2 }]}>{referenceContrat && referenceContrat.substring(0, 6) + "..."}</Text>
              <AppIcon name="chevron-down" type="MaterialCommunityIcons" size={20} color={colors.blue100} />


            </View>


          </View>
        </TouchableOpacity>

      </View>
      {modalVisible &&
        <>
          < View style={[backgrounds.gray800, layout.absolute, { opacity: 0.7, height: height, width: width }]}>
          </View >
          < View style={[layout.absolute, layout.itemsCenter,
          layout.justifyCenter, backgrounds.white, gutters.padding_12, gutters.margin_12, borders.rounded_16, { top: 100, width: width - 24 }]}>

            <Text style={[fonts.gray800, fonts.bold, fonts.size_16, gutters.padding_12]}>Select Contract</Text>
            <SelectContract setModalVisible={setModalVisible} modalVisible={modalVisible} lastContractId={contractId} />

            <Button label="Close" onPress={() => setModalVisible(false)} />


          </View >
        </>
      }
    </>
  )
}
