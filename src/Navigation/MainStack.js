import React from "react";
import {createStackNavigator} from '@react-navigation/stack'
import TabRoutes from "./TabRoutes";
import navigationStrings from "../constant/navigationStrings";
import { HomePage } from "../Screen"

const Stack=createStackNavigator();
export default function MainStack(){


  return(
    <>
    <Stack.Screen
      name={navigationStrings.HOMEPAGE}
      options={{
        headerShown:false
      }}
      component={HomePage}
    />
    
      </>
  )
}