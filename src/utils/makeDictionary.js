export const makeDictionary = (arr, keyProp, valueProp) => {
    const dict = {};

    const makeGetter = (getter) => typeof getter === 'string' ? (item) => item[getter] : getter;
    const getKey = makeGetter(keyProp);
    const getValue = makeGetter(valueProp);

    for (const item of arr) {
        dict[getKey(item)] = getValue(item);
    }
    return dict;
}