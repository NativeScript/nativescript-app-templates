import * as React from "react";
import { RouteProp } from '@react-navigation/core';
import { Dialogs } from '@nativescript/core';
import { NativeStackNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "./NavigationParamList";

type FirstScreenProps = {
    route: RouteProp<MainStackParamList, "first">,
    navigation: NativeStackNavigationProp<MainStackParamList, "first">,
}

export function First({ navigation }: FirstScreenProps) {
    function onButtonTap() {
        navigation.navigate('second');
    }

    return (
        <gridLayout
            rows={"*, auto, auto, auto, *"}
            columns={"*, 200, *"}
            style={{
                width: "100%",
                height: "100%",
                backgroundColor: "beige",
            }}
        >
            <label
                row={1}
                col={1}
                style={{
                    textAlignment: "center",
                    fontSize: 24,
                }}
            >
                <formattedString>
                    <span className="fas" text="&#xf135;" />
                    <span> Hello World!</span>
                </formattedString>
            </label>
            <button
                row={2}
                col={1}
                style={{
                    textAlignment: "center",
                    fontSize: 24,
                }}
                onTap={() => Dialogs.alert("Tap received!")}
            >
                Tap me for an alert
            </button>
            <button
                row={3}
                col={1}
                onTap={onButtonTap}
                style={{
                    fontSize: 24,
                }}
            >
                Go to next screen
            </button>
        </gridLayout>
    );
}
