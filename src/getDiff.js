import _ from 'lodash';

export default (data1, data2) => {
    const keys1 = _.sortBy(Object.keys(data1));
    const keys2 = _.sortBy(Object.keys(data2));

    const keys = _.uniq(keys1.concat(keys2));
    
    const diff = keys.map((key) => {
        if(!Object.hasOwn(data1, key)) {
            return {key: key, value: data2[key], status: 'added'}
        }
        if(!Object.hasOwn(data2, key)) {
            return {key: key, value: data1[key], status: 'deleted'}
        }
        if(data1[key] === data2[key]) {
            return {key: key, value: data1[key], status: 'equal'}
        }
        if(data1[key] !== data2[key]) {
            return {key: key, value1: data1[key], value2: data2[key], status: 'unequal'}
        }
    })

    return diff;
}