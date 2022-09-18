import _ from "lodash";

export const selectObject = (Objectitem: object, excluded: string[] | string = []) => {
    if (_.isObject(Objectitem) && _.isString(excluded)) {
        const keyValueArray = Object.entries(Objectitem);
        const removeExcluded = keyValueArray.filter((item) => excluded !== item[0]);
        return Object.fromEntries(removeExcluded);
    }
    if (_.isObject(Objectitem) && _.isArray(excluded)) {
        const keyValueArray = Object.entries(Objectitem);
        const removeExcluded = keyValueArray.filter((item) => !excluded.includes(item[0]));
        return Object.fromEntries(removeExcluded);
    }
    return {};
};

export const selectList = (list: string[] | object[], excluded: string[] | string = []) => {
    const selected: any[] = [];

    list.forEach((item) => {
        if (_.isString(item) && _.isString(excluded)) {
            if (item !== excluded) selected.push(item);
        }
        if (_.isString(item) && _.isArray(excluded)) {
            if (!excluded.includes(item)) selected.push(item);
        }
        if (_.isObject(item) && _.isString(excluded)) {
            const keyValueArray = Object.entries(item);
            const removeExcluded = keyValueArray.filter((item) => excluded !== item[0]);
            selected.push(Object.fromEntries(removeExcluded));
        }
        if (_.isObject(item) && _.isArray(excluded)) {
            const keyValueArray = Object.entries(item);
            const removeExcluded = keyValueArray.filter((item) => !excluded.includes(item[0]));
            selected.push(Object.fromEntries(removeExcluded));
        }
    });

    return selected;
};
