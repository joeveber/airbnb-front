import { useRoute } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";

export default function RouteScreen() {
  const [data, setData] = useState();
  const { params } = useRoute();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${params.roomId}`
        );
        // console.log(response.data[1]);
        setData(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
        console.log(error.response.data);
      }
    };
    fetchData();
  }, [params]);

  const displayStars = (num) => {
    const tab = [];
    for (let i = 0; i < 5; i++) {
      if (i < num) {
        tab.push(<Entypo key={i} name="star" size={24} color="#F5C60D" />);
      } else {
        tab.push(<Entypo key={i} name="star" size={24} color="grey" />);
      }
    }
    return tab;
  };

  return isLoading === true ? (
    <View>
      <ActivityIndicator
        size="large"
        color="purple"
        style={{ marginTop: 100 }}
      />
    </View>
  ) : (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={{ uri: data.photos[0].url }}
      >
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{data.price} €</Text>
        </View>
      </ImageBackground>
      <View style={styles.bottomPart}>
        <View style={styles.leftPart}>
          <Text style={styles.title}>{data.title}</Text>
          <View style={styles.rating}>
            <View style={styles.ratingStars}>
              {displayStars(data.ratingValue)}
            </View>
            <Text> {data.reviews} reviews</Text>
          </View>
        </View>
        <View style={styles.rightPart}>
          <Image
            style={styles.imageUser}
            source={{ uri: data.user.account.photo.url }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  image: {
    height: 270,
    width: "100%",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  rating: {
    flexDirection: "row",
  },
  ratingStars: {
    flexDirection: "row",
  },
  imageBackground: {
    height: 250,
    justifyContent: "flex-end",
  },
  priceContainer: {
    height: 50,
    width: 100,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginLeft: 20,
  },
  price: {
    color: "white",
  },
  bottomPart: {
    flexDirection: "row",
    marginTop: 10,
  },
  leftPart: {
    width: "80%",
  },
  rightPart: {
    width: "20%",
  },
  imageUser: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
});
