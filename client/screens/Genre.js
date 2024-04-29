import React from "react";
import {
  Box,
  FlatList,
  Heading,
  HStack,
  VStack,
  Text,
  Spacer,
  Skeleton,
  Center,
} from "native-base";
import { StyleSheet, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useQuery } from "@apollo/client";
import { GET_GENRES } from "../queries/movies";

export default function Genre() {
  const { loading, error, data } = useQuery(GET_GENRES);

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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="black" />
      <View
        style={{
          flex: 1,
          backgroundColor: "#191A19",
        }}
      >
        <Box>
          <Heading fontSize="xl" p="4" pb="3">
            <Text style={{ color: "white", fontWeight: "bold" }}>Genre</Text>
          </Heading>
          <FlatList
            data={data.getGenre}
            renderItem={({ item }) => (
              <Box
                borderBottomWidth="1"
                _dark={{
                  borderColor: "gray.600",
                }}
                borderColor="light.400"
                pl="4"
                pr="5"
                py="2"
              >
                <HStack space={3} justifyContent="space-between">
                  <AntDesign name="tags" size={24} color="#eab308" />
                  <VStack>
                    <Text
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="light.100"
                      bold
                    >
                      {item.name}
                    </Text>
                    <Text
                      color="coolGray.500"
                      _dark={{
                        color: "light.200",
                      }}
                    >
                      {item.name}
                    </Text>
                  </VStack>
                  <Spacer />
                </HStack>
              </Box>
            )}
            keyExtractor={(item) => item.id}
          />
        </Box>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
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
