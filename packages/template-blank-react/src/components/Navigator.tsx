import * as React from "react";
import { BaseNavigationContainer } from '@react-navigation/core';
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { Home } from "./HomeScreen";
import { Secondary } from "./SecondaryScreen";

const StackNavigator = stackNavigatorFactory();

export const mainStackNavigator = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "white",
                },
                headerShown: true,
            }}
        >
            <StackNavigator.Screen
                name="Home"
                component={Home}
            />
            <StackNavigator.Screen
                name="Secondary"
                component={Secondary}
            />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);
