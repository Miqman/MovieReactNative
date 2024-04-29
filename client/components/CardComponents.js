import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CardComponent({ movie }) {
  // console.log(movie);
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.card_template}>
        <TouchableOpacity
          onPress={() => {
            console.log("pindah ke detail woy");
            navigation.navigate("Detail", {
              id: movie.id,
            });
          }}
        >
          <Image
            style={styles.card_image}
            source={{
              uri: movie.imgUrl,
            }}
          />
          <View style={styles.text_container}>
            <Text style={styles.card_title}>{movie.Genre.name}</Text>
          </View>
        </TouchableOpacity>

        <Text numberOfLines={2} style={{ color: "grey" }}>
          {movie.title}
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  container2: {
    flex: 1,
    flexDirection: "column",
  },
  scrollView: {
    flex: 1,
  },
  text: {
    fontSize: 38,
    color: "white",
  },
  stretch: {
    width: "auto",
    height: 380,
    resizeMode: "stretch",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  card_template: {
    width: 130,
    height: 200,
    marginTop: 10,
    marginStart: 8,

    boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)",
  },
  card_image: {
    width: 130,
    height: 165,
    borderRadius: 10,
  },
  text_container: {
    position: "absolute",
    width: 130,
    height: 30,
    bottom: 0,
    padding: 5,
    backgroundColor: "rgba(0,0,0, 0.3)",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  card_title: {
    color: "white",
  },
});
