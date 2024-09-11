import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark} from '@fortawesome/free-solid-svg-icons'

export default function ErrorAlert({error,closeAlert}){

  return(
    <div className="rounded-md mb-6 text-black font-serif bg-[#f8d7da] border-[#f5c6cb] p-3 flex justify-between items-center">
      <span>
        {error}
      </span>
      <button type="button"  onClick={closeAlert}>
        <FontAwesomeIcon icon={faXmark}/>
      </button>
    </div>
  )
}