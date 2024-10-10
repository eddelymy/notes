import { useNavigate } from "react-router-dom"
import userService from "../service/user/user.service"
import ErrorAlert from "../components/common/ErrorAlert"
import { setErrors } from "../helpers/error"
import { useState } from "react"

export default function SignUpPage(){

  const navigate = useNavigate()
  const [errors,setErr] = useState({})
  const [error,setError] = useState('')
  const [showErrorAlert, setShowErrorAlert] = useState(false)

  const submit = async (e)=>{
    e.preventDefault()
    const form = e.target

    const formData = new FormData(form)

    const email = formData.get('email')
    const username = formData.get('username')
    const password = formData.get('password')
    const passwordConfirm = formData.get('passwordConfirm')

    try{
        const response = await userService.signUp({username:username,email:email,password:password,passwordConfirm:passwordConfirm})
        localStorage.setItem('tkn_notes', response.data.token) 
        localStorage.setItem('user_notes', JSON.stringify(response.data.user))       
        form.reset()
        navigate('/')
      
    }catch(error){
      setErr(setErrors(error))
      if(error?.response?.data?.message){
        setError(error.response.data.message)
        setShowErrorAlert(true)
      }
    }
    
  }

  return(
    <div className="login flex items-center justify-center">
      <div className="w-[350px] p-6 flex flex-col rounded-md bg-black bg-opacity-50 text-white">
        <div className="flex flex-col items-center w-full">
          <span className="text-2xl">Inscription</span>
        </div>
        <form onSubmit={submit} className="mt-10">
        {showErrorAlert &&
          <ErrorAlert error={error} closeAlert={()=>{setShowErrorAlert(false)}}/>}
        <div className="flex flex-col">
            <label>
              Utilisateur
            </label>
            <input 
              name="username"
              type="text"
              className="px-3 bg-white bg-opacity-20 mt-1 rounded-md h-8 focus:outline-none focus:border-white focus:ring-1 focus:ring-white"/>
              {errors.username && <div id="farmError" className="text-red-600">
              { errors.username }
            </div>}
          </div>
          <div className="flex flex-col mt-4">
            <label>
              Email
            </label>
            <input 
              name="email"
              type="email"
              className="px-3 bg-white bg-opacity-20 mt-1 rounded-md h-8 focus:outline-none focus:border-white focus:ring-1 focus:ring-white"/>
              {errors.email && <div id="farmError" className="text-red-600">
              { errors.email }
            </div>}
          </div>
          <div className="flex flex-col mt-4">
            <label>
              Mot de passe
            </label>
            <input 
              name="password"
              type="password"
              className="px-3 bg-white bg-opacity-20 mt-1 rounded-md h-8 focus:outline-none focus:border-white focus:ring-1 focus:ring-white"/>
              {errors.password && <div id="farmError" className="text-red-600">
              { errors.password }
            </div>}
          </div>
          <div className="flex flex-col mt-4">
            <label>
              Confirmer mot de passe
            </label>
            <input 
              name="passwordConfirm"
              type="password"
              className="px-3 bg-white bg-opacity-20 mt-1 rounded-md h-8 focus:outline-none focus:border-white focus:ring-1 focus:ring-white"/>
              {errors.passwordConfirm && <div id="farmError" className="text-red-600">
              { errors.passwordConfirm }
            </div>}
          </div>
          <button className="mt-6 h-8 bg-[#e11d48] w-full rounded-md">S'inscrire</button>
        </form>
      </div>
      
    </div>
  )
}