import { View, Modal, Dimensions, TouchableOpacity, Text } from "react-native";
import { useTheme } from "@/theme";
import AppIcon from "../icons/AppIcons";

export default function BottomModal({
  modalVisible,
  setModalVisible,
  children,
  title,
}) {
  const { width, height } = Dimensions.get("screen");
  const { colors, fonts } = useTheme();
  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={{ flex: 1, backgroundColor: "#00009920" }}>
        <View
          style={{
            height: height / 1.6,
            backgroundColor: colors.white,
            bottom: 0,
            position: "absolute",
            width: width,
            alignSelf: "center",
            borderTopEndRadius: 30,
          }}
        >
          <View
            style={{
              height: height / 10,
              padding: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={[{ color: colors.gray800 }, fonts.bold]}>{title}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <AppIcon name="close" type="AntDesign" color={colors.gray800} />
            </TouchableOpacity>
          </View>
          <View>{children}</View>
        </View>
      </View>
    </Modal>
  );
}
