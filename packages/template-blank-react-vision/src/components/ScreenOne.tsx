import { Dialogs } from '@nativescript/core';
import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";

import { MainStackParamList } from "../NavigationParamList";

type ScreenOneProps = {
    route: RouteProp<MainStackParamList, "One">,
    navigation: FrameNavigationProp<MainStackParamList, "One">,
};

export function ScreenOne({ navigation }: ScreenOneProps) {
    return (
        <gridLayout rows="*,auto,auto,*,auto,100">
            <label
                row="1"
                className="fas text-3xl text-center leading-8"
                height="40"
            >
                &#xf135; You're viewing screen one!
            </label>
            <button
                row="2"
                className="ronded-full text-3xl p-5 my-5" 
                width="300"
                onTap={() => Dialogs.alert("Tapped!")}
            >
                Tap me for an alert
            </button>
            <button
                row="4"
                className="ronded-full text-2xl p-5" 
                width="300"
                onTap={() => navigation.navigate("Two", { message: "Hello, world!" })}
            >
                Go to next screen
            </button>
        </gridLayout>
    );
}
