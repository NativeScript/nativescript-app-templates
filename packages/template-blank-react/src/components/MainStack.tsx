import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";

import { ScreenOne } from "./ScreenOne";
import { ScreenTwo } from "./ScreenTwo";

const StackNavigator = stackNavigatorFactory();

/**
 * The main stack navigator for the whole app.
 */
export const MainStack = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="Screen One"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "white",
                },
                headerShown: true,
            }}
        >
            <StackNavigator.Screen
                name="One"
                component={ScreenOne}
            />
            <StackNavigator.Screen
                name="Two"
                component={ScreenTwo}
            />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);
