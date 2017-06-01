// Generate params from Array of { key, value }

export default function makeParams(params) {
    return encodeURIComponent(params.filter((param) => param.value)
                 .map((param) => `${param.key}=${JSON.stringify(param.value)}`)
                 .join('&'));
}