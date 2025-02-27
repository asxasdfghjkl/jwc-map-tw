import { useNativeEvent } from "@/utils/useNativeEvent";
import React from "react";

export function useHash() {
    const [hash, setHash] = React.useState();
    useNativeEvent(window, 'hashchange', () => {
        setHash(window.location.hash.substring(1))
    });
    return hash;
}