import { useState } from "react"
import ModalComponent from "../../common/ModalComponent"

export default function EditPassword({closeIt}){

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  function submit(){
    console.log(password)
  }
  function cancel(){
    setPassword('')
    setConfirmPassword('')
  }
  function closeModal(){
    cancel()
    closeIt()
  }
  return(
    <ModalComponent close={closeModal} title="Modifier le mot de passe">
      <form className="mt-10">
        <div className="flex flex-col">
          <label>
            Noveau mot de passe
          </label>
          <input 
            name="password"
            type="password"
            className="input_text"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            />
          {/* {errors.password && <div id="farmError" className="text-red-700">
            { errors.password }
          </div>} */}
        </div>
        <div className="flex flex-col mt-4">
          <label>
            Confirmer mot de passe
          </label>
          <input 
            name="confirmPassword"
            className="input_text"
            type="password"
            value={confirmPassword}
            onChange={(e)=>{setConfirmPassword(e.target.value)}}
            />
          {/* {errors.confirmPassword && <div id="farmError" className="text-red-700">
            { errors.confirmPassword }
          </div>} */}
        </div>
        <div className='flex mt-6 float-end'>
          <button className="cancel-btn mr-3" type='button' onClick={cancel}>Annuler</button>
          <button className="submit-btn" type='button' onClick={submit}>Enregistrer</button>
        </div>
      </form>
    </ModalComponent>
  )
}