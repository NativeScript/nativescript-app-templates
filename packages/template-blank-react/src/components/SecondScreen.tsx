import * as React from "react";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "./NavigationParamList";

type SecondScreenProps = {
    route: RouteProp<MainStackParamList, "second">,
    navigation: FrameNavigationProp<MainStackParamList, "second">,
}

export function Second({ navigation }: SecondScreenProps) {
    function onButtonTap() {
        navigation.goBack();
    }

    return (
        <flexboxLayout
            style={{
                flexGrow: 1,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "gold",
            }}
        >
            <label fontSize={24} text={"You're viewing the second route!"} />
            <button onTap={onButtonTap} fontSize={24} text={"Go back"} />
        </flexboxLayout>
    );
}