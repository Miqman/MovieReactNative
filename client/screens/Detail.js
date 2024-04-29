import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";

import YoutubePlayer from "react-native-youtube-iframe";
import {
  VStack,
  Skeleton,
  HStack,
  Center,
  Avatar,
  ScrollView,
} from "native-base";

import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@apollo/client";
import { GET_MOVIES, GET_ONE_MOVIE } from "../queries/movies";
import CardComponent from "../components/CardComponents";
import CardFreeMovie from "../components/CardFreeMovie";

export default function Detail({ route }) {
  const [playing, setPlaying] = useState(false);

  // console.log(route.params.id);

  const { loading, error, data } = useQuery(GET_ONE_MOVIE, {
    variables: {
      getOneMovieId: route.params.id,
    },
  });

  const {
    loading: loadMovies,
    error: errMovie,
    data: dataMovie,
  } = useQuery(GET_MOVIES);

  const movieRender = ({ item }) => {
    return <CardComponent movie={item}></CardComponent>;
  };
  const MovieFree = ({ item }) => {
    return <CardFreeMovie movieFree={item}></CardFreeMovie>;
  };

  if (loading) {
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
          <Center w="100%">
            <HStack
              w="90%"
              maxW="400"
              borderWidth="1"
              space={4}
              rounded="md"
              _dark={{
                borderColor: "coolGray.500",
              }}
              _light={{
                borderColor: "coolGray.200",
              }}
              p="4"
            >
              <VStack flex="3" space="4">
                <HStack space="2" alignItems="center">
                  <Skeleton h="90" flex="1" rounded="lg" />
                  <Skeleton
                    h="90"
                    flex="1"
                    rounded="lg"
                    startColor="indigo.300"
                  />
                  <Skeleton h="90" flex="1" rounded="lg" />
                </HStack>
                <HStack space="2" alignItems="center">
                  <Skeleton h="90" flex="1" rounded="lg" />
                  <Skeleton h="90" flex="1" rounded="lg" />
                  <Skeleton
                    h="90"
                    flex="1"
                    rounded="lg"
                    startColor="indigo.300"
                  />
                </HStack>
                <HStack space="2" alignItems="center">
                  <Skeleton
                    h="90"
                    flex="1"
                    rounded="lg"
                    startColor="indigo.300"
                  />
                  <Skeleton h="90" flex="1" rounded="lg" />
                  <Skeleton h="90" flex="1" rounded="lg" />
                </HStack>
              </VStack>
            </HStack>
          </Center>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
            backgroundColor: "black",
          }}
        >
          <Text style={{ color: "white" }}>Error bosku....</Text>;
        </View>
      </SafeAreaView>
    );
  }

  function linkId() {
    const link = data.getOneMovie.trailerUrl;
    let linkSplit = link.split("/");
    const linked = linkSplit[linkSplit.length - 1];
    return linked;
  }

  // console.log(route.params);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerView}>
        <View>
          <YoutubePlayer height={240} play={playing} videoId={`${linkId()}`} />
        </View>
        <ScrollView nestedScrollEnabled={true}>
          <View style={{ flex: 3 / 2 }}>
            <View style={{ flex: 1, padding: 10 }}>
              <Text
                style={{ fontWeight: "bold", fontSize: 38, color: "white" }}
              >
                {data.getOneMovie.title}
              </Text>
            </View>
          </View>
          <View style={{ flex: 5 }}>
            <View
              style={{
                flex: 1 / 2,
                paddingHorizontal: 10,
                paddingVertical: 5,
                flexDirection: "row",
              }}
            >
              <Ionicons name="ios-star" size={18} color="#eab308"></Ionicons>
              <Text
                style={{
                  marginStart: 5,
                  marginEnd: 15,
                  fontSize: 18,
                  color: "white",
                }}
              >
                {data.getOneMovie.rating}
                .6
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: "white",
                }}
              >
                |
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  marginHorizontal: 5,
                  fontSize: 18,
                  color: "white",
                }}
              >
                {data.getOneMovie.User.username}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: "white",
                }}
              >
                |
              </Text>
              <Text
                style={{
                  marginHorizontal: 5,
                  fontSize: 18,
                  color: "white",
                }}
              >
                {data.getOneMovie.Genre.name}
              </Text>
            </View>
            <View
              style={{
                flex: 3,

                padding: 10,
                height: "auto",
              }}
            >
              <Text style={{ color: "white", fontSize: 18 }}>
                {data.getOneMovie.synopsis}
              </Text>
            </View>
          </View>
          <View style={{ flex: 2, backgroundColor: "#161616" }}>
            {data.getOneMovie.Casts.length ? (
              <FlatList
                nestedScrollEnabled
                horizontal={true}
                data={data.getOneMovie.Casts}
                renderItem={({ item }) => (
                  <View style={styles.item}>
                    <HStack space={2}>
                      <Avatar bg="#eab308" source={item.profilePict}></Avatar>
                      <View
                        style={{
                          flexDirection: "column",
                          justifyContent: "space-between",
                          paddingVertical: 4,
                          width: 50,
                        }}
                      >
                        <Text numberOfLines={2} style={{ color: "white" }}>
                          {item.name}
                        </Text>
                        <Text style={{ color: "grey", fontSize: 12 }}>
                          Cast
                        </Text>
                      </View>
                    </HStack>
                  </View>
                )}
              />
            ) : (
              <View style={styles.item}>
                <Text style={{ color: "white" }}>Cast Not Found</Text>
              </View>
            )}
          </View>
          <View
            style={{
              backgroundColor: "#161616",
              flexDirection: "row",
              padding: 10,
            }}
          >
            <Ionicons
              style={{ marginEnd: 40 }}
              name="download-outline"
              size={22}
              color="white"
            />
            <Ionicons
              style={{ marginEnd: 40 }}
              name="ios-bookmark-outline"
              size={22}
              color="white"
            />
            <Ionicons name="ios-cloud-upload-outline" size={22} color="white" />
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: "darkyellow",
            }}
          >
            <FlatList
              nestedScrollEnabled={true}
              data={dataMovie.getMovie}
              renderItem={movieRender}
              numColumns={3}
              ListHeaderComponent={
                <>
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: "darkyellow",
                    }}
                  >
                    <FlatList
                      nestedScrollEnabled
                      horizontal={true}
                      data={[
                        { key: "For You" },
                        { key: "K-Drama" },
                        { key: "Drama" },
                        { key: "Anime" },
                        { key: "Movie" },
                        { key: "Variety" },
                        { key: "VIP" },
                      ]}
                      renderItem={({ item, index }) => (
                        <View style={styles.item}>
                          {index === 0 ? (
                            <Text
                              style={{
                                fontSize: 24,
                                color: "white",
                                textAlign: "center",
                                fontWeight: "bold",
                              }}
                            >
                              {item.key}
                            </Text>
                          ) : (
                            <Text style={styles.itemText}>{item.key}</Text>
                          )}
                        </View>
                      )}
                    />
                  </View>
                </>
              }
              ListFooterComponent={
                <>
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.text}>Free for Everyone</Text>
                  </View>
                  <FlatList
                    data={dataMovie.getMovie}
                    renderItem={MovieFree}
                    numColumns={3}
                  ></FlatList>
                </>
              }
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  containerView: {
    flex: 1,
    backgroundColor: "#191A19",
  },
  textStyle: {
    color: "white",
  },
  item: {
    padding: 8,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  itemText: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
  },
  text: {
    fontSize: 32,
    color: "white",
    marginTop: 30,
    marginVertical: 10,
  },
});
