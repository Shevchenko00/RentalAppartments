function toSnakeCase(str) {
    return str.replace(/([A-Z])/g, "_$1").toLowerCase();
}

function convertCamelToSnake(obj) {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [toSnakeCase(key), value])
    );
}


export default convertCamelToSnake;