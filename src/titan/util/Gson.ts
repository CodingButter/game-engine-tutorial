
export function fromJson<T>(json: string, className: T) {
    const obj = JSON.parse(json);
    return Object.assign(new className(), obj);
}

export const embedTypeRecursive = (obj: any) => {
    obj.type = obj.constructor.name;
    if (obj instanceof Array) {
        obj.forEach((element: any) => {
            embedTypeRecursive(element);
        });
    } else if (obj instanceof Object) {
        Object.keys(obj).forEach((key) => {
            if (key.includes("_")) {
                delete obj[key];
            } else {
                if (obj[key] instanceof Object) {
                    embedTypeRecursive(obj[key]);
                } else if (obj[key] instanceof Array) {
                    embedTypeRecursive(obj[key]);
                }
            }
        });
    }
}

export function toJson(obj: any) {
    const objCopy = { ...obj }
    embedTypeRecursive(objCopy);
    console.log(objCopy);
    return JSON.stringify(objCopy, null, 4);
}
