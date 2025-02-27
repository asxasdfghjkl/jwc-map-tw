import { getQueryParam } from "@/utils/Query";
import { useNativeEvent } from "@/utils/useNativeEvent";
import React from "react";

export function useQueryParam() {
    const [, refresh] = React.useState();

    useNativeEvent(window, 'navigate', () => refresh(new Date()));
    return getQueryParam();
}