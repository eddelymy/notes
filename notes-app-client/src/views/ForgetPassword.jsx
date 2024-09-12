import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBookOpen} from '@fortawesome/free-solid-svg-icons'
import userService from "../service/user/user.service"
import { setErrors } from "../helpers/error"

export default function ForgetPassword(){

  const [errors,setErr] = useState({})

  async function submit(e){
    e.preventDefault()
    const form = e.target

    const formData = new FormData(form)

    const email = formData.get('email')
    console.log(email)
    try{
      const response = await userService.sendResetPasswordEmail(email)
      console.log(response)
    }catch(error){
      console.log(error)
      setErr(setErrors(error))
    }
  }
  return(
     <div className="h-screen w-full flex flex-col p-6">
      <div className="flex flex-row items-center">
           <FontAwesomeIcon icon={faBookOpen} className="text-2xl mr-2 text-[#e11d48]" />
      </div>
      <div className="flex items-center justify-center h-full">
        <div className="w-[400px] p-6 flex flex-col rounded-md border bg-white">
          <div className="flex flex-col items-center w-full">
            <span className="mt-6 text-black text-xl">Mot de passe oublié ?</span>
            <span className="mt-4 text-center">Pas de souci, nous vous enverrons des instructions de réinitialisation.</span>
          </div>
          <form onSubmit={submit} className="mt-10">
            <div className="flex flex-col">
              <label>
                Email
              </label>
              <input 
                name="email"
                type="email"
                className="input_text"/>
                {errors.email && <div id="farmError" className="text-red-600">
                { errors.email }
              </div>}
            </div>
            <button className="mt-6 submit-btn w-full mb-1">Réinitialiser le mot de passe</button>
            <a href="/login" className=" mb-5 text-[11px] float-end text-blue-600">Retour à la page de connexion</a>
          </form>
        </div>
     </div>
     
   </div>
   
  )
}