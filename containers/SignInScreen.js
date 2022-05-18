import { useNavigation } from "@react-navigation/core";
import { Button, Text, TextInput, View, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState } from "react";
import axios from "axios";

export default function SignInScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  ///
  const handleSignin = async (event) => {
    console.log("aaa");
    try {
      event.preventDefault();

      const response = await axios.post(
        `https://express-airbnb-api.herokuapp.com/user/log_in`,
        {
          email: email,
          password: password,
        }
      );
      console.log("aaa");
      console.log(response.data);

      if (response.data.userToken) {
        console.log("User logged in");
        setUser(response.data.userToken);
        alert("Vous êtes connecté");
        navigate("/");
      } else {
        alert("Adresse e-mail ou mot de passe erroné");
      }
    } catch (error) {
      console.log(error);
      console.log(error.message);
      console.log(error.response.status);
    }
  };
  ///

  return (
    <KeyboardAwareScrollView>
      <View>
        <Text>Name: </Text>
        <TextInput
          placeholder="Username"
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
        />
        <Text>Password: </Text>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
        />
        <Button
          title="Sign in"
          onPress={async () => {
            const userToken = "secret-token";
            setToken(userToken);
            handleSignin;
            console.log({ email }, { password });
          }}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text>Create an account</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}
