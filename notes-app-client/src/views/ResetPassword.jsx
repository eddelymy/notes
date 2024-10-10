import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBookOpen} from '@fortawesome/free-solid-svg-icons'
import { setErrors } from "../helpers/error"

export default function ResetPassword(){

  const [errors,setErr] = useState({})

  function submit(){
    setErr(setErrors(''))
  }
  return(
    <div className="h-screen w-full flex flex-col p-6">
      <div className="flex flex-row items-center">
        <FontAwesomeIcon icon={faBookOpen} className="text-2xl mr-2 text-[#e11d48]" />
      </div>
      <div className="flex items-center justify-center h-full">
        <div className="w-[400px] p-6 flex flex-col rounded-md border bg-white">
          <div className="flex flex-col items-center w-full">
            <span className="mt-6 text-black text-xl">Définir un nouveau mot de passe</span>
            <span className="mt-4 text-center">Doit contenir au moins 8 caractères.</span>
          </div>
          <form onSubmit={submit} className="mt-10">
            <div className="flex flex-col mt-4">
              <label>
                Mot de passe
              </label>
              <input 
                name="password"
                type="password"
                className="input_text"/>
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
                className="input_text"/>
                {errors.passwordConfirm && <div id="farmError" className="text-red-600">
                { errors.passwordConfirm }
              </div>}
            </div>
            <button type="submit" className="mt-6 submit-btn w-full mb-6">Réinitialiser le mot de passe</button>
          </form>
        </div>
      </div>
    </div>
  )
}