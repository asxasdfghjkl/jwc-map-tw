import qs from 'qs';

export function updateQuery(key, value, hash) {
    const query = qs.parse(window.location.search.substring(1));
    if (value) {
        query[key] = value;
    } else {
        delete query[key];
    }

    const queryStr = qs.stringify(query);
    if (hash !== undefined) {
        window.location.hash = hash;
    }
    window.history.pushState(query, '', `/?${queryStr}${window.location.hash}`);
    window.dispatchEvent(new CustomEvent('querychange'));
}