function replacer(key:string, value:any) {
    if (value instanceof Map) {
        return {
            dataType: 'Map',
            value: Array.from(value.entries()), // or with spread: value: [...value]
        };
    } else {
        return value;
    }
}

function reviver(key:string, value:any) {
    if (typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') {
            return new Map(value.value);
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