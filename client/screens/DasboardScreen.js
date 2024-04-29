import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DasboardScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons
          name="movie-open-play"
          size={55}
          color="#eab308"
        />
        <View style={{ marginVertical: 20 }}>
          <TouchableOpacity
            style={styles.submit}
            onPress={() => navigation.navigate("MovieTab")}
          >
            <Text style={styles.submitText}>Start</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
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
  card_image: {
    width: 130,
    height: 165,
    borderRadius: 10,
  },
  submit: {
    width: 100,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "orange",
  },
  submitText: {
    color: "#eab308",
    textAlign: "center",
  },
});

export default DasboardScreen;
