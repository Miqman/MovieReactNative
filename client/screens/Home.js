import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ImageBackground,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  Icon,
  VStack,
  Input,
  Skeleton,
  HStack,
  Center,
} from "native-base";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import CardComponent from "../components/CardComponents";
import CardFreeMovie from "../components/CardFreeMovie";
import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "../queries/movies";

const Home = () => {
  const images = [
    "https://dcywrb6nqrsdp.cloudfront.net/attachment/90461282925443011705",
    "https://assets.pikiran-rakyat.com/crop/0x135:1077x860/x/photo/2021/12/15/3447885708.jpg",
    "https://upload.wikimedia.org/wikipedia/id/a/a8/Sonic_The_hedgehog_2_film_poster.jpg",
    "https://mpics.mgronline.com/pics/Images/565000002301602.JPEG",
  ];

  const { loading, error, data } = useQuery(GET_MOVIES);
  // console.log(loading, error, data);

  const movieRender = ({ item }) => {
    return <CardComponent movie={item}></CardComponent>;
  };
  const MovieFree = ({ item }) => {
    return <CardFreeMovie movieFree={item}></CardFreeMovie>;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container2}>
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
      <SafeAreaView style={styles.container2}>
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

  return (
    <SafeAreaView style={styles.container2}>
      <StatusBar backgroundColor="black" />
      <View style={{ flex: 1, backgroundColor: "darkorange" }}>
        <View
          style={{ flex: 1, backgroundColor: "blue", flexDirection: "row" }}
        >
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
              size={32}
              color="#eab308"
            />
          </View>
          <View
            style={{
              flex: 4,
              backgroundColor: "black",
              paddingHorizontal: 5,
            }}
          >
            <VStack my="2" w="100%" maxW="250px">
              <Input
                opacity="40"
                placeholder="Search"
                variant="filled"
                width="100%"
                borderRadius="10"
                py="1"
                px="2"
                borderWidth="0"
                InputLeftElement={
                  <Icon
                    ml="2"
                    size="4"
                    color="white"
                    as={<Ionicons name="ios-search" />}
                  />
                }
              />
            </VStack>
          </View>
          <View style={{ flex: 2, backgroundColor: "black", padding: 5 }}>
            {/* <NativeBaseProvider> */}

            <Button
              key="xs"
              colorScheme="yellow"
              size="xs"
              leftIcon={
                <Icon
                  as={MaterialCommunityIcons}
                  name="crown-outline"
                  size="lg"
                />
              }
            >
              <Text
                style={{ fontWeight: "bold", color: "white", fontSize: 18 }}
              >
                Vip
              </Text>
            </Button>

            {/* </NativeBaseProvider> */}
          </View>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "darkyellow",
          }}
        >
          <FlatList
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
      </View>
      <View
        style={{
          flex: 6,
          backgroundColor: "black",
        }}
      >
        <FlatList
          style={[styles.scrollView, {}]}
          data={data.getMovie}
          renderItem={movieRender}
          numColumns={3}
          ListHeaderComponent={
            <View
              style={{
                backgroundColor: "yellow",
                height: 380,
              }}
            >
              <ImageBackground
                blurRadius={10}
                source={{
                  uri: "https://mpics.mgronline.com/pics/Images/565000002301602.JPEG",
                }}
                resizeMode="cover"
                style={{ width: "auto", height: 380 }}
              >
                <Image
                  style={styles.stretch}
                  source={{
                    uri: "https://mpics.mgronline.com/pics/Images/565000002301602.JPEG",
                  }}
                ></Image>
              </ImageBackground>
            </View>
          }
          ListFooterComponent={
            <>
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.text}>Free for Everyone</Text>
              </View>
              <FlatList
                data={data.getMovie}
                renderItem={MovieFree}
                numColumns={3}
              ></FlatList>
            </>
          }
        />
      </View>
    </SafeAreaView>
  );
};

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
    fontSize: 32,
    color: "white",
    marginTop: 30,
    marginVertical: 10,
  },
  stretch: {
    width: "auto",
    height: 380,
    resizeMode: "contain",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  card_template: {
    width: 130,
    height: 165,
    marginTop: 10,
    marginEnd: 6,
    boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)",
  },
  card_image: {
    width: 130,
    height: 165,
    borderRadius: 10,
  },
  text_container: {
    position: "absolute",
    width: 250,
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
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },

  item: {
    padding: 8,
    backgroundColor: "black",
    width: 120,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  itemText: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
  },
});

export default Home;
