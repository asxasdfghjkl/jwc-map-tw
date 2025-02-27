import React from "react";

export function usePersistFunction(func) {
    const ref = React.useRef();
    ref.current = func;
    return React.useCallback((...args) => ref.current(...args), []);
}