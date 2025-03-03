import { useNativeEvent } from "@/utils/useNativeEvent";
import React from "react";

export function useHash() {
    const [, setHash] = React.useState('');


    useNativeEvent(window, 'hashchange', () => {
        setHash(window.location.hash.substring(1))
    });

    return window.location.hash.substring(1);
}