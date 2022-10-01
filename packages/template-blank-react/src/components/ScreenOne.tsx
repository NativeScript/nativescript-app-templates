import { Dialogs } from '@nativescript/core';
import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";

import { MainStackParamList } from "../NavigationParamList";

type ScreenOneProps = {
    route: RouteProp<MainStackParamList, "One">,
    navigation: FrameNavigationProp<MainStackParamList, "One">,
};

export function ScreenOne({ navigation }: ScreenOneProps) {
    return (
        <flexboxLayout style={styles.container}>
            <label
                className="fas"
                style={styles.text}
            >
                &#xf135; You're viewing screen one!
            </label>
            <button
                style={styles.button}
                onTap={() => Dialogs.alert("Tapped!")}
            >
                Tap me for an alert
            </button>
            <button
                style={styles.button}
                onTap={() => navigation.navigate("Two", { message: "Hello, world!" })}
            >
                Go to next screen
            </button>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
    },
    text: {
        textAlignment: "center",
        fontSize: 24,
        color: "black",
    },
    button: {
        fontSize: 24,
        color: "#2e6ddf",
    },
});
