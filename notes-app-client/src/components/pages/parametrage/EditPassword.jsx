import { useState, useEffect } from "react"
import ModalComponent from "../../common/ModalComponent" 
import { setErrors } from "../../../helpers/error"
import userService from "../../../service/user/user.service"
import {flash} from '../../../plugins/flash'

export default function EditPassword({closeIt}){

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [errors, setErr] = useState({})
  const [id,setId] = useState('')

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user_notes'))
    setId(user.userId) 
  }, [JSON.parse(localStorage.getItem('user_notes'))])

  async function submit(){
    try{
      const response = await userService.editPassword(currentPassword,newPassword,id)
      localStorage.setItem('user_notes', JSON.stringify(response.data.user)) 
      flash(response.data.message, 'success')
      closeModal()
    }catch(error){
      if(error?.response?.data?.message){
        flash(error.response.data.message, 'error')
      }
      setErr(setErrors(error))
    }
  }
  function cancel(){
    setCurrentPassword('')
    setNewPassword('')
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
            Mot de passe actuel
          </label>
          <input 
            name="password"
            type="password"
            className="input_text"
            value={currentPassword}
            onChange={(e)=>{setCurrentPassword(e.target.value)}}
            />
          {errors.currentPassword && <div id="currentPasswordError" className="text-red-700">
            { errors.currentPassword }
          </div>}
        </div>
        <div className="flex flex-col mt-4">
          <label>
            Noveau mot de passe
          </label>
          <input 
            name="newPassword"
            className="input_text"
            type="password"
            value={newPassword}
            onChange={(e)=>{setNewPassword(e.target.value)}}
            />
          {errors.newPassword && <div id="newPasswordErr" className="text-red-700">
            { errors.newPassword }
          </div>}
        </div>
        <div className='flex mt-6 float-end'>
          <button className="cancel-btn mr-3" type='button' onClick={cancel}>Annuler</button>
          <button className="submit-btn" type='button' onClick={submit}>Enregistrer</button>
        </div>
      </form>
    </ModalComponent>
  )
}