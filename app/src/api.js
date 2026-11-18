import axios from 'axios'

const configuredApiUrl =
    process.env.REACT_APP_API_URL ||
    (process.env.NODE_ENV === 'production'
        ? 'https://final-ecommerce-backend-bnjb.onrender.com/api/'
        : '')

export const backendBaseUrl = configuredApiUrl
    .replace(/\/api\/?$/, '')
    .replace(/\/+$/, '')

if (axios.defaults) {
    axios.defaults.baseURL = backendBaseUrl
}

export const getMediaUrl = (url) => {
    if (!url || /^https?:\/\//i.test(url)) {
        return url
    }

    const filename = url.replace(/\\/g, '/').split('/').pop()
    const publicFilename = filename.replace(/_[A-Za-z0-9]{7}(?=\.[^.]+$)/, '')

    return `/images/${publicFilename}`
}

export default axios
