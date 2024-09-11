import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark} from '@fortawesome/free-solid-svg-icons'

export default function SuccessAlert({message,closeAlert}){

  return(
    <div className="rounded-md bg-[#d4edda] text-black font-serif border-[#c3e6cb] p-3 flex justify-between items-center">
      <span>
        {message}
      </span>
      <button type="button" onClick={closeAlert}>
        <FontAwesomeIcon icon={faXmark}/>
      </button>
    </div> 
  )
}