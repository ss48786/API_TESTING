import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import MainStack from "./MainStack";
// import {Login,Signup} from '../Screen/index'
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";

const Stack = createStackNavigator();

export default function Routes({isLoggedin}) {
  console.log(isLoggedin, "Routes")
  return (
    <NavigationContainer>
      <Stack.Navigator>
       
        {!isLoggedin && AuthStack()}
           {MainStack()}
      
      </Stack.Navigator>


    </NavigationContainer>
  );
}
