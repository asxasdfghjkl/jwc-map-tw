import React from "react";

export function usePersistFunction(func) {
    const actualFn = React.useRef();
    actualFn.current = func;
    const proxyFn = React.useRef((...args) => actualFn.current(...args));
    return proxyFn.current;
}