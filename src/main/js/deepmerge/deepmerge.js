

const deepMerge = (target, source) => {
    const isObject = item => item && typeof item === 'object' && !Array.isArray(item) && item !== null
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                deepMerge(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        });
    }
    return target;
}

console.log('merge: ', deepMerge({ a: { apa: 'kalle', banan: 'bruno' }}, { a: { apa: 'kevlar', guano: 'fågelskit' }, b: 2 }));
