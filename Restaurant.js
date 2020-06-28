import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const Restaurant = (props) => {
  const res = props.restaurantDetails;
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            // uri: `${res.icon}`,
            uri:
              "https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80",
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.headContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{res.name}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>
              {res.rating ? res.rating : "2.5"}
            </Text>
          </View>
        </View>
        <Text style={{ ...styles.Text }}>{res.vicinity}</Text>
        <Text style={{ ...styles.Text }}>200 per person</Text>
        <Text style={{ ...styles.Text }}>Promoted</Text>
        <Text style={{ ...styles.Text, color: "red" }}>
          {res.opening_hours ? "Open Now" : "Closed"}
        </Text>
        <View style={styles.types}>
          {res.types.map((ele) => (
            <Text style={{ ...styles.Text, color: "blue" }}>{`${ele} * `}</Text>
          ))}
        </View>
      </View>
    </View>
  );
};
//  Well sanitized kitchen * Daily temperature checks * Rider hand wash{" "}
// Use the below mentioned API contract to perform restaurant search based on keyword.

//     Request Method : GET
//     Endpoint : https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=47.6204,-122.3491&radius=2500&type=restaurant&keyword=:keyword&key=AIzaSyAIux_9gVtovYz4EOfxouSI5GXpkcT5KKs
const styles = StyleSheet.create({
  card: {
    margin: 10,
    width: "90%",
    flexDirection: "row",
  },
  imageContainer: {
    width: "30%",
    alignItems: "center",
    height: "100%",
  },
  image: {
    borderRadius: 10,
    marginVertical: 5,
    width: "95%",
    height: 100,
  },
  content: {
    width: "70%",
    height: "100%",
    marginLeft: 10,
  },
  headContainer: {
    flexDirection: "row",
  },
  titleContainer: {
    flexDirection: "row",
    width: "80%",
  },
  title: {
    fontSize: 18,
    fontFamily: "montserrat-bold",
    // fontWeight: "bold",
  },
  ratingContainer: {
    backgroundColor: "green",
    borderRadius: 5,
    width: "20%",
    height: 24,
    paddingHorizontal: 5,
    alignItems: "center",
  },
  ratingText: {
    fontSize: 18,
    fontFamily: "montserrat-regular",
    color: "white",
  },
  Text: {
    fontFamily: "montserrat-medium",
    fontSize: 14,
    color: "grey",
  },
  types: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default Restaurant;
