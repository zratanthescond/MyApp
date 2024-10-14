import React, { useState, useEffect } from "react";
import DatePicker from "react-native-date-picker";
import { InputWithTag } from "../atoms";

export default function InputDate({ onchange }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    onchange(date.toLocaleDateString("en-us"));
  }, [date]);
  return (
    <>
      <InputWithTag
        // inputDisabled
        titleWidth={0}
        tag={{
          type: "icon",
          name: "calendar",
          iconType: "AntDesign",
        }}
        value={date.toLocaleDateString("en-us")}
        onChange={(val) => console.log(val)}
        textInputPlaceholder="Date litige"
        onIconPress={() => {
          setOpen(true);
        }}
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
