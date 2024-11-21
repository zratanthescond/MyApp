import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import { useTheme } from "@/theme";
import { SafeScreen } from "@/components/template";

import { InputWithTag } from "@/components/atoms";
import Button from "@/components/atoms/form/Button";
import { MMKV } from "react-native-mmkv";
import Individu from "../Individu/Individu";
import { useMutation } from "@tanstack/react-query";
import { updateIndividu } from "@/services/Individu/individu";
type User = {
  IndividuI: number;
  nom: string;
  prenom: string;
  email: string;
  numberPhone: string;
  password: string;
};
export default function ProfileUpdate() {
  const storage = new MMKV();

  const user = JSON.parse(storage.getString("user"));
  console.log(user);

  const [userData, setUserData] = useState<User>({
    individuId: user.individuId,
    nom: user?.nom,
    prenom: user?.prenom,
    email: user?.email,
    numberPhone: user?.numberPhone,
    password: "",
  });
  const handleInputChange = (value) => {
    setUserData({
      ...userData,
      [value.target.name]: value.target.value,
    });
  };
  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const mutation = useMutation({
    mutationFn: () => {
      return updateIndividu(userData);
    },
    onSuccess: () => {
      // Alert.alert(userData.nom, "Profile updated", [{ text: "OK" }]);
    },
  });
  const { colors, layout, backgrounds, fonts, gutters, borders } = useTheme();
  return (
    <SafeScreen>
      <View
        style={[
          layout.flex_1,
          backgrounds.blue100,
          layout.justifyStart,
          layout.itemsCenter,
        ]}
      >
        <View
          style={[
            layout.itemsCenter,
            layout.justifyStart,
            { height: 100 },
            gutters.paddingVertical_12,
          ]}
        >
          <Text style={[fonts.white, fonts.bold, fonts.size_16]}>
            edit Profile
          </Text>
          <View
            style={[
              { height: 100, width: 100, borderRadius: 50, borderWidth: 5 },
              backgrounds.gray100,
              layout.itemsCenter,
              layout.justifyCenter,
              gutters.marginVertical_16,
              borders.white,
              layout.absolute,
              { top: 35, zIndex: 10 },
            ]}
          >
            <Text style={[fonts.white, fonts.bold, fonts.size_40]}>A</Text>
          </View>
        </View>
        <View
          style={[
            layout.flex_1,
            backgrounds.white,
            layout.fullWidth,
            gutters.padding_16,
          ]}
        >
          <Text
            style={[
              fonts.gray800,
              fonts.bold,
              fonts.size_16,
              gutters.marginBottom_16,
            ]}
          >
            Nom
          </Text>
          <InputWithTag
            titleWidth={0}
            value={userData.nom}
            onChange={(value) => {
              handleInputChange({ target: { value, name: "nom" } });
            }}
          />
          <Text
            style={[
              fonts.gray800,
              fonts.bold,
              fonts.size_16,
              gutters.marginBottom_16,
            ]}
          >
            Prenom
          </Text>
          <InputWithTag
            titleWidth={0}
            value={userData.prenom}
            onChange={(value) =>
              handleInputChange({ target: { value, name: "prenom" } })
            }
          />
          <Text
            style={[
              fonts.gray800,
              fonts.bold,
              fonts.size_16,
              gutters.marginBottom_16,
            ]}
          >
            Email
          </Text>
          <InputWithTag
            titleWidth={0}
            value={userData.email}
            onChange={(value) =>
              handleInputChange({ target: { value, name: "email" } })
            }
          />
          <Text
            style={[
              fonts.gray800,
              fonts.bold,
              fonts.size_16,
              gutters.marginBottom_16,
            ]}
          >
            Phone number
          </Text>
          <InputWithTag
            titleWidth={0}
            value={userData.numberPhone}
            onChange={(value) =>
              handleInputChange({ target: { value, name: "numberPhone" } })
            }
          />
          <Text
            style={[
              fonts.gray800,
              fonts.bold,
              fonts.size_16,
              gutters.marginBottom_16,
            ]}
          >
            password
          </Text>
          <InputWithTag
            titleWidth={0}
            textInputPlaceholder="password"
            onChange={(value) =>
              handleInputChange({ target: { value, name: "password" } })
            }
          />
          <View
            style={[layout.fullWidth, layout.itemsCenter, layout.justifyCenter]}
          >
            <Button
              label="Valider"
              onPress={() => {
                mutation.mutate();
              }}
            />
          </View>
        </View>
      </View>
    </SafeScreen>
  );
}
