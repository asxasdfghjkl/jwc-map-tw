export function addSearchHistory(text) {
    let arr = [... new Set([text, ...getSearchHistory()])];
    arr = arr.slice(0, 10);
    localStorage.history = JSON.stringify(arr);
    return arr;
}

export function getSearchHistory() {
    let arr = [];
    try {
        arr = JSON.parse(localStorage.history);
    } catch { }

    return arr;
}

export function removeSearchHistory(text) {
    let arr = [... new Set([text, ...getSearchHistory()])];
    arr = arr.slice(0, 10).filter(item => item !== text);
    localStorage.history = JSON.stringify(arr);
    return arr;
}