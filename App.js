import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback, useEffect } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import {
  RefreshControl,
  Button,
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";

import Restaurant from "./Restaurant";

const fetchFonts = async () => {
  return await Font.loadAsync({
    "montserrat-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "montserrat-regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "montserrat-medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "montserrat-light": require("./assets/fonts/Montserrat-Light.ttf"),
  });
};

export default function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [value, onChangeText] = React.useState();

  const loadRestaurants = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      const response = await fetch(
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=47.6204,-122.3491&radius=2500&type=restaurant&key=AIzaSyAIux_9gVtovYz4EOfxouSI5GXpkcT5KKs"
      );
      const resdata = await response.json();
      setRestaurants(resdata.results);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
    setIsLoading(false);
    setIsRefreshing(false);
  }, [setIsLoading, setError]);

  const searchRestaurants = useCallback(
    async (val) => {
      setError(null);
      onChangeText(val);
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=47.6204,-122.3491&radius=2500&type=restaurant&keyword=${value}&key=AIzaSyAIux_9gVtovYz4EOfxouSI5GXpkcT5KKs`
        );
        const resdata = await response.json();
        setRestaurants(resdata.results);
      } catch (err) {
        console.log(err);
        setError(err.message);
      }
      setIsLoading(false);
    },
    [value]
  );

  useEffect(() => {
    setIsLoading(true);
    loadRestaurants().then(() => setIsLoading(false));
  }, [loadRestaurants]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred !</Text>
        <Button title="Try again" onPress={loadRestaurants} />
      </View>
    );
  }

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  console.log(restaurants.length + " " + value);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search Restaurants"
          onChangeText={(text) => searchRestaurants(text)}
          value={value}
        />
      </View>
      {restaurants.length <= 0 ? (
        <View style={styles.centered}>
          <Text>No Results found.. Try with another keyword..</Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={loadRestaurants}
            />
          }
        >
          {restaurants.map((restaurant) => (
            <Restaurant key={restaurant.id} restaurantDetails={restaurant} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: {
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 10,
    width: "100%",
    height: 40,
    justifyContent: "center",
    marginVertical: 10,
  },
  input: {
    fontFamily: "montserrat-medium",
    fontSize: 16,
  },
});
