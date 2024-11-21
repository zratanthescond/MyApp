import {
  Dimensions,
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@/theme";
import MiddleIcon from "./MiddleIcon";
import { useNavigation } from "@react-navigation/native";
type NavigatorModalProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function NavigatorModal({
  modalVisible,
  setModalVisible,
}: NavigatorModalProps) {
  const { width, height } = Dimensions.get("screen");
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <Modal
      visible={modalVisible}
      setModalVisible={setModalVisible}
      transparent={true}
      animationType="fade"
    >
      <View
        style={{
          height: height / 7,
          backgroundColor: colors.white,
          position: "absolute",
          width: width - 20,
          bottom: 70,

          borderTopLeftRadius: 200,
          borderTopEndRadius: 200,
          borderTopRightRadius: 50,
          borderTopStartRadius: 200,
          zIndex: 0,
          alignSelf: "center",
        }}
      >
        <MiddleIcon
          center={true}
          modalVisible={modalVisible}
          // setModalVisible={setModalVisible}
          onPress={() => setModalVisible(!modalVisible)}
        />
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingHorizontal: 10,
          }}
        >
          <MiddleIcon
            modalVisible={modalVisible}
            //setModalVisible={setModalVisible}
            onPress={() => setModalVisible(!modalVisible)}
            bottom={0}
            left={15}
            onPress={() => {
              navigation.navigate("listBordereau");
              setModalVisible(!modalVisible);
            }}
            //color={[colors.purple50, colors.purple100, colors.purple500]}
            icon={"folder-eye"}
          />
          <MiddleIcon
            modalVisible={modalVisible}
            //setModalVisible={setModalVisible}
            onPress={() => {
              navigation.navigate("listFinancement");
              setModalVisible(!modalVisible);
            }}
            bottom={60}
            left={-15}
            //color={[colors.purple50, colors.blue50, colors.purple500]}
            icon={"cash-100"}
          />
          <MiddleIcon
            iconType="MaterialCommunityIcons"
            modalVisible={modalVisible}
            left={0}
            onPress={() => {
              navigation.navigate("listLimit");
              setModalVisible(!modalVisible);
            }}
            bottom={60}
            icon={"file-cancel-outline"}
          />
          <MiddleIcon
            iconType="AntDesign"
            modalVisible={modalVisible}
            // setModalVisible={setModalVisible}
            onPress={() => setModalVisible(!modalVisible)}
            bottom={0}
            left={-20}
            //color={[colors.purple50, colors.purple500, colors.blue100]}
            icon={"adduser"}
            onPress={() => {
              navigation.navigate("Individu");
              setModalVisible(!modalVisible);
            }}
          />
        </View>
      </View>
    </Modal>
  );
}
