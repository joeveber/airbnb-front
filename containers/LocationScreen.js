import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  StatusBar,
} from "react-native";

// Import du package expo-location
import * as Location from "expo-location";

import { useEffect, useState } from "react";
import axios from "axios";

// Import du package pour fficher des maps
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export default function LocationScreen({ setToken }) {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [coords, setCoords] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        /// Mapping and formatting existing coords
        const recupCoords = response.data.map((coords) => {
          return {
            id: coords._id,
            latitude: coords.location[1],
            longitude: coords.location[0],
          };
        });
        setCoords(recupCoords);
      } catch (error) {
        console.log(error);
        console.log(error.response.data);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getPermission = async () => {
      try {
        // Je demande la permission au user d'avoir accès à sa localisation
        const { status } = await Location.requestForegroundPermissionsAsync();
        console.log(status);
        // S'il répond oui
        if (response.status === "granted") {
          // Je récupère sa localisation
          const location = await Location.getCurrentPositionAsync();
          console.log(location);
          // Et je stocke sa position dans mes states
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
        } else {
          alert("Permission refusée");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPermission();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/images/airbnb-logo.png")}
        />
      </View>
      <MapView
        // Je dois donner une dimension à ma map
        style={styles.map}
        // provider={PROVIDER_GOOGLE}
        // Initial region pour dire où dans le monde apparaît ma map
        initialRegion={{
          latitude: 48.8,
          longitude: 2.3522219,
          latitudeDelta: 0.35,
          longitudeDelta: 0.35,
        }}
        // Pour montrer la position du user
        showsUserLocation={true}
      >
        {coords.map((elem, index) => {
          return (
            <MapView.Marker
              key={index}
              coordinate={{
                latitude: elem.latitude,
                longitude: elem.longitude,
              }}
              onPress={() => {
                // console.log(elem.id);
                navigation.navigate("Room", { roomId: elem.id });
              }}
            />
          );
        })}
      </MapView>
    </View>
  );
}

const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    height: "100%",
    backgroundColor: "white",
  },
  logo: {
    height: 30,
    width: 30,
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  map: {
    height: windowHeight,
  },
});
