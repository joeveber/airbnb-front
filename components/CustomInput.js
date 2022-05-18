import { View, Text, TextInput, StyleSheet } from "react-native";

const CustomInput = ({ placeholder, setState, value, password }) => {
  return (
    <TextInput
      value={value}
      placeholder={placeholder}
      style={styles.input}
      onChangeText={(text) => setState(text)}
      secureTextEntry={password ? true : false}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "80%",
    marginTop: 20,
    borderColor: "pink",
    borderBottomWidth: 2,
    height: 35,
  },
});

export default CustomInput;
