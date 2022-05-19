import {
  Button,
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import axios from "axios";

import CustomInput from "../components/CustomInput";

export default function SignInScreen({ setToken, navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  ///
  const handleSubmit = async () => {
    setError("");
    if (email && password) {
      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email,
            password,
          }
        );
        console.log(response.data);
        setToken(response.data.token);
        alert("You are signed in!");
      } catch (error) {
        console.log(error);
        console.log(error.response.data);
        if (error.response.data) {
          setError(error.response.data.error);
        }
      }
    } else {
      setError("Veuillez remplir tous les champs");
    }
  };
  ///

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView
      // contentContainerStyle=
      >
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require("../assets/images/airbnb-logo.png")}
          />
          <Text style={styles.title}>Sign In</Text>
          <CustomInput placeholder="email" setState={setEmail} />
          <CustomInput
            placeholder="password"
            setState={setPassword}
            password={true}
          />

          {error ? <Text>{error}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signinRedirec}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text>No account? Register.</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    height: windowHeight,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
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
