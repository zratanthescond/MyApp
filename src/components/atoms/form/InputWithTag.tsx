import AppIcon from "@/components/icons/AppIcons";
import { useTheme } from "@/theme";
import { FormulaireData } from "@/types/bordereaux";
import { BordereauSchema } from "@/types/schemas/Bordereau";
import React from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardTypeOptions, StyleSheet } from "react-native";

// Interface pour la balise (tag) de type texte
interface TextTag {
  type: "text";
  text: string;
}

// Interface pour la balise (tag) de type icône
interface IconTag {
  type: "icon";
  name: string;
  iconType: string;
}
enum inputType {
  "default",
  "number-pad",
  "decimal-pad",
  "numeric",
  "email-address",
  "phone-pad",
  "url",

}
// Union des deux types de balises possibles
type Tag = TextTag | IconTag;

// Interface pour les props du composant InputWithTag
interface InputWithTagProps {
  title: string | null;
  type: KeyboardTypeOptions;
  titleWidth: number | undefined;
  tag: Tag | undefined;
  onChange: (text: string | number | Date) => void | undefined;
  textInputPlaceholder: string;
  onIconPress: (arg: boolean) => void | undefined;
  inputDisabled: boolean | undefined;
  value: string | number | Date | undefined;
  // field: keyof FormulaireData; // Ajoutez cette ligne
  // data: FormulaireData; // Ajoutez cette ligne
}

function InputWithTag({
  title,
  titleWidth,
  tag,
  onChange,
  textInputPlaceholder,
  onIconPress,
  inputDisabled,
  value,
  type,
  errorMessage,
}: InputWithTagProps): JSX.Element {
  const { layout, fonts, colors, backgrounds } = useTheme();

  return (
    <View style={{ flexDirection: "col", flex: 1 }}>
      <View style={[layout.fullWidth, { flexDirection: "row", flex: 1 }]}>
        <Text
          style={[
            layout.flex_1,
            fonts.bold,
            fonts.size_16,
            fonts.gray800,
            {
              fontFamily: "Lato",
              maxWidth: titleWidth,
              textAlignVertical: "center",
            },
          ]}
        >
          {title}
        </Text>
        <View
          style={[
            layout.flex_1,
            layout.row,
            layout.justifyCenter,
            layout.itemsCenter,
            {
              shadowColor: colors.gray50,
              flex: 1,
              borderRadius: 10,
            },
          ]}
        >
          <TextInput
            style={[
              {
                textAlign: "center",
                backgroundColor: colors.white,
                borderRadius: 10,
                flex: 1,
                elevation: 20,
              },
            ]}
            onChangeText={(text) => {
              onChange(text);
            }}
            /*onBlur={() => {
              const result = BordereauSchema.safeParse(data);
              if (!result.success) {
                const formattedErrors = result.error.format();
                setErrors(prevErrors => ({
                  ...prevErrors,
                  [field]: formattedErrors[field]?._errors[0],
                }));
              } else {
                setErrors(prevErrors => ({ ...prevErrors, [field]: undefined })); // Clear error if valid
              }
            }}*/
            placeholder={textInputPlaceholder}
            keyboardType={type || "default"}
            maxLength={11}
            editable={!inputDisabled}
            selectTextOnFocus={!inputDisabled}
            value={value?.toString()}
          />
          {tag && tag.type === "text" && (
            <Text
              style={[
                backgrounds.white,
                fonts.bold,
                fonts.gray800,
                {
                  flex: 1,
                  right: 0,
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  textAlign: "center",
                  position: "absolute",
                  paddingHorizontal: 4,
                  borderLeftColor: colors.gray200,
                  borderLeftWidth: 2,
                  alignSelf: "center",
                },
              ]}
            >
              {tag.text}
            </Text>
          )}
          {tag && tag.type === "icon" && (
            <TouchableOpacity
              onPress={() => onIconPress(true)}
              style={{
                position: "absolute",
                right: 0,
                borderLeftColor: colors.gray200,
                borderLeftWidth: 2,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                backgroundColor: colors.white,
              }}
            >
              <AppIcon
                name={tag.name}
                type={tag.iconType}
                style={{ padding: 3, flex: 1 }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({

  errorText: {
    color: "red",
    fontSize: 10,
    marginLeft: 0

  },
});
export default InputWithTag;
