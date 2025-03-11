import qs from 'qs';

export function updateUrl(values, replace = true) {
    const query = qs.parse(window.location.search.substring(1));
    for (let key in values) {
        if (key === 'hash') continue;
        const value = values[key];
        if (value) {
            query[key] = value;
        } else {
            delete query[key];
        }
    }

    const queryStr = qs.stringify(query);

    const fn = replace ? 'replaceState' : 'pushState';
    window.history[fn](query, '', `/?${queryStr}${values.hash ? '#' + values.hash : window.location.hash}`)
    window.dispatchEvent(new CustomEvent('urlchanged'));
}
