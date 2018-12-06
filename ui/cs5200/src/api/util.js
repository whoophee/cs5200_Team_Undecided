// Fixes Jackson serialization such that circular references and such are properly
// represented in the "deserialized js object"
// You should basically call this on every API result so weird things don't happen
export function makeObjectGraph(apiResult, mapping = {}, reverseMapping = {}) {
    if (apiResult == null) return apiResult;
    if (Array.isArray(apiResult)) {
        return apiResult.map((item) => makeObjectGraph(item, mapping));
    } else if (typeof apiResult === 'object') {
        if (apiResult.hasOwnProperty('@id')) {
            const key = apiResult['@id'];

            const {__type: type, __id: id} = key;
            if (!mapping.hasOwnProperty(type)) {
                mapping[type] = {};
            }
            const result = (reverseMapping.hasOwnProperty(type) && reverseMapping[type].hasOwnProperty(id))
                ? reverseMapping[type][id] : {};
            mapping[type][id] = result;
            [...Object.keys(apiResult)].sort().forEach(key => {
                const value = apiResult[key];
                if (key !== '@id') {
                    result[key] = makeObjectGraph(value, mapping);
                } else {
                    result[key] = value;
                }
            });
            return result;
        } else if (apiResult.hasOwnProperty('__type') && apiResult.hasOwnProperty('__id')) {  
            const {__type, __id} = apiResult;
            if (!mapping.hasOwnProperty(__type) || !mapping[__type].hasOwnProperty(__id)) {
                const maybeNewObj = {};
                reverseMapping[__type] = reverseMapping[__type] || {};
                reverseMapping[__type][__id] = reverseMapping[__type][__id] || maybeNewObj;
                return reverseMapping[__type][__id];
            }
            return mapping[__type][__id];
        } else {
            return apiResult;
        }
    } else {
        return apiResult;
    }
}

