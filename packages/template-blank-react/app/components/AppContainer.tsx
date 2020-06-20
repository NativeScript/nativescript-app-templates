import * as React from "react";
import { alert } from "tns-core-modules/ui/dialogs";

export default function Greeting({}) {
    return (
        <gridLayout
            width={"100%"}
            height={"100%"}
            rows={"*, auto, auto, *"}
            columns={"*, 200, *"}
        >
            <label
                row={1}
                col={1}
                className="info"
                textAlignment={"center"}
                fontSize={24}
            >
                <formattedString>
                    <span className="fas" text="&#xf135;"/>
                    <span> Hello World!</span>
                </formattedString>
            </label>
            <button
                row={2}
                col={1}
                fontSize={24}
                textAlignment={"center"}
                onTap={() => alert("Tap received!")}
            >
                Tap me
            </button>
        </gridLayout>
    );
}
