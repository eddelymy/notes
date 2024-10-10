import ModalComponent from "../../common/ModalComponent"
import { useState } from "react"

export default function EditUsername({closeIt}){

  const [username, setUsername] = useState('')

  function submit(){
    console.log(username)
  }
  function cancel(){
    setUsername('')
  }
  function closeModal(){
    cancel()
    closeIt()
  }
  return(
    <ModalComponent close={closeModal} title="Modifier l'Utilisateur">
      <form className="mt-10">
        <div className="flex flex-col">
          <label>
            Utilisateur
          </label>
          <input 
            name="category"
            className="input_text"
            value={username}
            onChange={(e)=>{setUsername(e.target.value)}}
            />
          {/* {errors.username && <div id="farmError" className="text-red-700">
            { errors.username }
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