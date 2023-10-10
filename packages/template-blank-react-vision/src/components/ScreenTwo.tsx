import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";

import { MainStackParamList } from "../NavigationParamList";

type ScreenTwoProps = {
    route: RouteProp<MainStackParamList, "Two">,
    navigation: FrameNavigationProp<MainStackParamList, "Two">,
};

export function ScreenTwo({ navigation, route }: ScreenTwoProps) {
    return (
        <gridLayout rows="*,auto,auto,*,auto,100">
            <label row="1" className="text-3xl text-center">
                You're viewing screen two!
            </label>
            <label row="2" className="text-3xl text-center my-5">
                Message: {route.params.message}
            </label>
            <button
                row="4"
                className="ronded-full text-2xl p-5"
                width="300"
                onTap={() => navigation.goBack()}
            >
                Go back
            </button>
        </gridLayout>
    );
}
