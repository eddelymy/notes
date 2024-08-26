import {faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function ModalComponent({children,close,title}){

  return(
    <div className="fixed top-0 left-0 w-full h-full min-h-screen bg-black bg-opacity-60 visible transition-opacity duration-150 z-10 flex items-center">
      <div className="rounded-md mx-auto text-black p-3  bg-white w-[600px] flex flex-col">
        <div className="w-full flex justify-between border-b pb-3 border-b-black">
          <span className='text-xl'>{title}</span>
          <button 
            className="float-end text-[#64748b] hover:text-black"
            onClick={close}>
              <FontAwesomeIcon icon={faXmark} className='text-xl' />
          </button>
        </div>
       <div className="p-3 w-full">
          {children}
       </div> 
       
      </div>
    </div>
  )
}