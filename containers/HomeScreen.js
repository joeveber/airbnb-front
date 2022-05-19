import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

export default function HomeScreen() {
  const [data, setData] = useState();
  const navigation = useNavigation();

  ///
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        // console.log(response.data[1]);
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error);
        console.log(error.response.data);
      }
    };
    fetchData();
  }, []);
  ///

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item._id)}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Room", { roomId: item._id });
              }}
            >
              <Image
                source={{
                  uri: item.photos[0].url,
                }}
                style={styles.image}
                resizeMode="contain"
              />
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.rating}>
                  <Text>{item.ratingValue} stars</Text>
                  <Text> {item.reviews} reviews</Text>
                </View>
              </View>
              <Text>{item.price} €</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      />
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
