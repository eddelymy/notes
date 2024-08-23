import axios from 'axios'

const axiosInstance = function () {
  let instance

  function createInstance(token = '') {
    instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    instance.createInstance = createInstance

    return instance
  }

  return function () {
    if (!instance) {
      instance = createInstance()
    }

    return instance
  }
}

export default axiosInstance()
