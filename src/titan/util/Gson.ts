
export function fromJson<T>(json: string, className: T) {
    const obj = JSON.parse(json);
    return Object.assign(new className(), obj);
}

export const embedTypeRecursive = (obj: any): any => {
    const type = obj.constructor.name;
    obj = { ...obj };
    obj.type = type;
    if (obj instanceof Array) {
        for (let i = 0; i < obj.length; i++) {
            obj[i] = embedTypeRecursive(obj[i]);
        }
        return obj;
    } else if (obj instanceof Object) {
        Object.keys(obj).forEach((key) => {
            if (key.includes("_")) {
                delete obj[key];
            } else {
                if (obj[key] instanceof Object) {
                    obj[key] = embedTypeRecursive(obj[key]);
                } else if (obj[key] instanceof Array) {
                    obj[key] = embedTypeRecursive(obj[key]);
                }

            }

        });
        return obj;
    }
    return obj;
}

export function toJson(obj: any) {
    const objCopy = embedTypeRecursive(obj);
    console.log(objCopy);
    return JSON.stringify(objCopy, null, 4);
}
