import {  faThumbsUp,faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function AlertComponent({msg,statut,close}){
  
  return(
    <div className="fixed top-0 left-0 w-full h-full min-h-screen bg-black bg-opacity-50 visible transition-opacity duration-150 z-10 flex items-center">
      <div className="rounded-md mx-auto text-center text-black justify-items-center p-7 bg-opacity-90 bg-white w-[390px] flex flex-col">
        <FontAwesomeIcon icon={statut ? faCircleExclamation : faThumbsUp} className=" text-5xl text-opacity-80 text-black" />
        <div className="mt-6">
           { msg }
        </div> 
        <button 
          className="rounded-md bg-opacity-80 mt-6 bg-black text-white"
          onClick={close} >
            Ok
        </button>
      </div>
  </div>
  )
}