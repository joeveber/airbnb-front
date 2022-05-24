import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import axios from "axios";

export default function App() {
  const [selectedPicture, setSelectedPicture] = useState();
  const [takenPicture, setTakenPicture] = useState();
  const [imageSending, setImageSending] = useState(false);

  const getPermissionAndOpenLibrary = async () => {
    // Je demande la permission d'ouvrir la galerie
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // Si j'y suis autorisé
    if (status === "granted") {
      // J"ouvre la galerie
      const result = await ImagePicker.launchImageLibraryAsync();
      // Si le user n'annule pas la sélection
      if (result.cancelled === false) {
        // Je stocke l'url dans un state
        setSelectedPicture(result.uri);
      } else {
        console.log("Sélection annulée");
      }
    } else {
      console.log("Permission refusée");
    }
  };

  const getPermissionAndTakePicture = async () => {
    // Je demande la permission d'ouvrir la camera
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    // S'il accepte
    if (status === "granted") {
      // J'ouvre la camera
      const result = await ImagePicker.launchCameraAsync();
      // S'il n'anulle pas
      if (result.cancelled === false) {
        // Je stocke l'url dans un state
        setTakenPicture(result.uri);
      } else {
        console.log("Prise de photo annulée");
      }
    } else {
      console.log("Permission refusée");
    }
  };

  const sendPicture = async () => {
    try {
      setImageSending(true);
      // Je split mon url avec "." en séparateur
      const tab = selectedPicture.split(".");
      // L'extension de mon image sera le dernier élément de mon tableau
      const extension = tab[tab.length - 1];
      const formData = new FormData();
      // Je dois utiliser cette syntaxe pour append
      formData.append("photo", {
        uri: selectedPicture,
        name: `my-picture.${extension}`,
        type: `image/${extension}`,
      });
      const response = await axios.put(
        "https://express-airbnb-api.herokuapp.com/user/upload_picture",
        formData,
        {
          headers: {
            // Je dois informer axios du fait que j'envoie un formdata
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setImageSending(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/images/airbnb-logo.png")}
        />
      </View>
      <Button
        title="Accéder à la galerie photo"
        onPress={getPermissionAndOpenLibrary}
      />
      {selectedPicture && (
        <Image
          style={{ height: 150, width: 150 }}
          source={{ uri: selectedPicture }}
        />
      )}
      <Button
        title="Prendre une photo avec l'appareil"
        onPress={getPermissionAndTakePicture}
      />
      {takenPicture && (
        <Image
          style={{ height: 150, width: 150 }}
          source={{ uri: takenPicture }}
        />
      )}
      {imageSending ? (
        <ActivityIndicator />
      ) : (
        <Button title="Envoyer la photo au serveur" onPress={sendPicture} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 30,
    width: 30,
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
});
