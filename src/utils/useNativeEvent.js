import React from "react";

export function useNativeEvent(elm, eventName, func) {
    React.useEffect(
        () => {
            if (elm) {
                elm.addEventListener(eventName, func);
                return () => {
                    elm.removeEventListener(eventName, func);
                }
            }
        },
        [elm, func, eventName]
    );
}