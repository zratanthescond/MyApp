import React, { useState, useEffect } from "react";
import DatePicker from "react-native-date-picker";
import { InputWithTag } from "../atoms";
import { StyleSheet, Text } from "react-native";

export default function InputDate({ onchange, title, disabledAction = false, errorMessage, value }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(
    value ? new Date(value) : new Date());

  useEffect(() => {
    onchange(date);
  }, [date]);
  return (
    <>
      <InputWithTag
        title={title}
        inputDisabled
        tag={{
          type: "icon",
          name: "calendar",
          iconType: "AntDesign",
        }}
        value={date.toLocaleDateString("en-us")}
        onChange={(val) => { }}
        textInputPlaceholder="Date litige"
        onIconPress={() => {
          if (!disabledAction) {
            setOpen(true);
          }



        }}
        errorMessage={errorMessage}
      />
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
    </>
  );

}
const styles = StyleSheet.create({

  errorText: {
    color: "red",
    fontSize: 10,
    marginLeft: 0

  },
})