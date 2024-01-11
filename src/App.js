import React from "react";
import RoutesConfig from "./RoutesConfig";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider} from '@apollo/client';
import { AuthProvider } from "./AuthContext/AuthContext";
import {client} from "./Config";



function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <BrowserRouter>
          <RoutesConfig />
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
