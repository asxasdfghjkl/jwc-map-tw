import { usePersistFunction } from "@/utils/usePersistFunction";
import React from "react";

export function useNativeEvent(elm, eventName, func) {
    const fn = usePersistFunction(func);
    React.useEffect(
        () => {
            if (elm) {
                elm.addEventListener(eventName, fn);
                return () => {
                    elm.removeEventListener(eventName, fn);
                }
            }
        },
        [elm, fn, eventName]
    );
}