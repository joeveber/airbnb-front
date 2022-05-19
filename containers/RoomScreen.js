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
} from "react-native";
import { useState, useEffect } from "react";
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
  ///

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
      <Image
        source={{
          uri: data.photos[0].url,
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <View>
        <Text style={styles.title}>{data.title}</Text>
        <View style={styles.rating}>
          <Text>{data.ratingValue} stars</Text>
          <Text> {data.reviews} reviews</Text>
        </View>
      </View>
      <Text>{data.price} €</Text>
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
});
