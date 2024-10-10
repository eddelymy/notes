import ModalComponent from "../../common/ModalComponent"
import { useState } from "react"

export default function EditEmail({closeIt}){
  const [email, setEmail] = useState('')

  function submit(){
    console.log(email)
  }
  function cancel(){
    setEmail('')
  }
  function closeModal(){
    cancel()
    closeIt()
  }
  return(
    <ModalComponent close={closeModal} title="Modifier l'email">
      <form className="mt-10">
        <div className="flex flex-col">
          <label>
            E-mail
          </label>
          <input 
            name="category"
            className="input_text"
            type="mail"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            />
          {/* {errors.email && <div id="farmError" className="text-red-700">
            { errors.email }
          </div>} */}
        </div>
        <div className='flex mt-6 float-end'>
          <button className="cancel-btn mr-3" type='button' onClick={cancel}>Annuler</button>
          <button className="submit-btn" type='button' onClick={submit}>Enregistrer</button>
        </div>
      </form>
    </ModalComponent>)
}