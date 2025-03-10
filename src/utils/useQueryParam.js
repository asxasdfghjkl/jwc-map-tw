import { useNativeEvent } from "@/utils/useNativeEvent";
import React from "react";
import qs from 'qs';

export function useQueryParam() {
    const [, refresh] = React.useState();
    useNativeEvent(window, 'querychange', () => refresh(new Date()))

    return qs.parse(location.search.substring(1));
}
