export const store = {
    setItem: async function (key, value) {
        const stringValue = await promisedStringifyJSON(value)
        await setLocalStorageValue(key, stringValue)
        return true;
    },
    getItem: async function (key) {
        const stringValue = await getLocalStorageValue(key);
        const jsonValue = await promisedParseJSON(stringValue)
        return jsonValue;
    }
};

function promisedParseJSON(json) {
    return new Promise((resolve, reject) => {
        try {
            resolve(JSON.parse(json))
        } catch (e) {
            reject(e)
        }
    })
}

function getLocalStorageValue(key) {
    return new Promise((resolve, reject) => {
        try {
            const value = localStorage.getItem(key);
            resolve(value)
        } catch (e) {
            reject(e)
        }
    })
}

function setLocalStorageValue(key, data) {
    return new Promise((resolve, reject) => {
        try {
            const result = localStorage.setItem(key, data);
            resolve(result)
        } catch (e) {
            reject(e)
        }
    })
}

function promisedStringifyJSON(json) {
    return new Promise((resolve, reject) => {
        try {
            resolve(JSON.stringify(json))
        } catch (e) {
            reject(e)
        }
    })
}