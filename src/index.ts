function replacer(key: string, value: any) {
    if (value instanceof Map) {
        return {
            dataType: 'Map',
            value: Array.from(value.entries()), // or with spread: value: [...value]
        };
    }
    else if (value instanceof Uint8Array) {
        return {
            dataType: 'Uint8Array',
            value: Array.from(value), // or with spread: value: [...value]
        };
    }
    else {
        return value;
    }
}

function reviver(key: string, value: any) {
    if (typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') {
            return new Map(value.value);
        }
        if (value.dataType === 'Uint8Array') {
            return new Uint8Array(value.value);
        }
    }
    return value;
}

export function stringify(value: any) {
    return JSON.stringify(value, replacer)
}
export function parse(text: string) {
    return JSON.parse(text, reviver)
}

// console.log("hi")
// const x:Uint8Array = new Uint8Array([1,2,3])
// console.log(x)
// console.log(parse(stringify(x)))