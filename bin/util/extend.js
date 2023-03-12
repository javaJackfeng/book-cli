const isObject = (object) => {
    return Object.prototype.toString.call(object) === '[object Object]'
}
export const extend = (defaultOpt, customOpt = {}) => {
    for ( let name in customOpt) {
        const src = defaultOpt[name]
        const copy = customOpt[name]

        if (!customOpt.hasOwnProperty(name)) {
            continue
        }

        if (isObject(copy)) {
            const clone =  isObject(src) ? src : {}
            defaultOpt[name] = extend(clone, copy)
        } else {
            defaultOpt[name] = copy
        }
    }
    return defaultOpt
}