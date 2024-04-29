import React from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider } from "@apollo/client";
import client from "./configs/apolloClient";

import MainStack from "./navigations/MainStack";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <NativeBaseProvider>
          <MainStack></MainStack>
        </NativeBaseProvider>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
