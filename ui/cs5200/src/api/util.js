// Fixes Jackson serialization such that circular references and such are properly
// represented in the "deserialized js object"
// You should basically call this on every API result so weird things don't happen
export function makeObjectGraph(apiResult, mapping = {}) {
    if (apiResult == null) return apiResult;
    if (Array.isArray(apiResult)) {
        return apiResult.map((item) => makeObjectGraph(item, mapping));
    } else if (typeof apiResult === 'object') {
        if (apiResult.hasOwnProperty('@id')) {
            const key = apiResult['@id'];

            const {type, id} = key;
            if (!mapping.hasOwnProperty(type)) {
                mapping[type] = {};
            }
            const result = {};
            mapping[type][id] = result;
            Object.keys(apiResult).forEach(key => {
                const value = apiResult[key];
                if (key !== '@id') {
                    result[key] = makeObjectGraph(value, mapping);
                } else {
                    result[key] = value;
                }
            });
            return result;
        } else if (apiResult.hasOwnProperty('type') && apiResult.hasOwnProperty('id')) {  
            const {type, id} = apiResult;
            return mapping[type][id];
        } else {
            return apiResult;
        }
    } else {
        return apiResult;
    }
}

