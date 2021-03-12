import React, { Component } from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomePage } from "../Screen";
import navigationStrings from "../constant/navigationStrings";


const Tab = createBottomTabNavigator();

function TabRoutes({ navigation }) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={navigationStrings.HOMEPAGE}
        component={HomePage}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
      />
     
    </Tab.Navigator>
  );
}

export default TabRoutes;
