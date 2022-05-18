import {
  Button,
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

import CustomInput from "../components/CustomInput";

export default function SignUpScreen({ setToken, navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    if (email && username && password && confirmpassword) {
      if (password === confirmpassword) {
        try {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email,
              username,
              description,
              password,
            }
          );
          console.log(response.data);
        } catch (error) {
          console.log(error);
          console.log(error.response.data);
          if (error.response.data) {
            setError(error.response.data.error);
          }
        }
      } else {
        setError("Vos mots de passe ne sont pas identiques");
      }
    } else {
      setError("Veuillez remplir tous les champs");
    }
  };

  return (
    <KeyboardAwareScrollView
    // contentContainerStyle=
    >
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../assets/images/airbnb-logo.png")}
        />
        <Text style={styles.title}>Sign Up</Text>
        <CustomInput placeholder="email" setState={setEmail} />
        <CustomInput placeholder="username" setState={setUsername} />
        <TextInput
          value={description}
          onChangeText={(text) => {
            setDescription(text);
          }}
          multiline={true}
          style={styles.bigInput}
          placeholder="Describe yourself in a few words"
        />
        <Text>{description}</Text>
        <CustomInput
          placeholder="password"
          setState={setPassword}
          password={true}
        />
        <CustomInput
          placeholder="confirm password"
          setState={setConfirmpassword}
          password={true}
        />
        {error ? <Text>{error}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signinRedirec}
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Text>Already have an account? Sign in.</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  logo: {
    marginTop: 10,
    height: 100,
    width: 100,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "grey",
    height: 70,
    marginTop: 10,
  },
  bigInput: {
    width: "80%",
    marginTop: 30,
    borderColor: "#FFBAC0",
    borderWidth: 2,
    height: 80,
  },
  button: {
    borderColor: "#FFBAC0",
    borderRadius: 20,
    borderWidth: 3,
    marginTop: 30,
    width: "60%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  signinRedirec: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    color: "#727272",
  },
});
