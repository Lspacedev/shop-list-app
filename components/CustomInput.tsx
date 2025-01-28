import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import React from "react";
import { useState } from "react";

type InputType = string;

type CustomInputProps = TextInputProps & {
  name: string;
  error: string | Array<string>;
  handleChange: (value: InputType) => void;
  length: number;
  value?: string | null;
};

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  handleChange,
  error,
  onBlur,
  length,
  value,
}) => {
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input]}
        placeholder={name}
        placeholderTextColor={"#717171"}
        onChangeText={(text) => handleChange(text)}
        onBlur={onBlur}
        maxLength={length}
        value={value}
      />

      {typeof error === "string" && error !== "" && (
        <Text style={styles.error}>{error}</Text>
      )}
      {typeof error === "object" &&
        error.length > 0 &&
        error.map((error: string, i: number) => {
          return (
            <Text key={i} style={styles.error}>
              {error}
            </Text>
          );
        })}
    </View>
  );
};

export default CustomInput;
const styles = StyleSheet.create({
  inputContainer: {
    gap: 5,
  },
  label: {
    color: "#BDBDBD",
  },
  input: {
    borderRadius: 5,
    borderColor: "#BDBDBD",
    padding: 5,
    paddingHorizontal: 10,
    color: "#BDBDBD",
    borderWidth: 0.8,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  error: {
    color: "#B9382C",
    marginVertical: -5,
  },
});
