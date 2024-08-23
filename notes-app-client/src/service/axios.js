import instance from './instance'
import { useNavigate } from "react-router-dom"


export default () => {
  // const navigate = useNavigate()
  let axiosInstance = instance().createInstance()

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('tkn_notes')

      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
      }

      return config
    },

    (error) => {
      return Promise.reject(error)
    }
  )

  axiosInstance.interceptors.response.use(
    (response) => {
      return response
    },

    async (error) => {
      if (error?.response?.status === 401) {
        localStorage.removeItem('tkn_notes')
        // await router.push('/login')
        // navigate('/login')
      }

      return Promise.reject(error)
    }
  )

  return axiosInstance
}
