import qs from 'qs';

export function getQueryParam() {
    return qs.parse(location.search.substring(1));
}