import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIcons } from '@fortawesome/free-solid-svg-icons'
import { useState, useRef, useEffect } from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

export default function ReactEmoji({emojiSelected}){

  const [isDropDownOpen, setDropDown] = useState(false)
  const divRef = useRef(null)
  useEffect(() => {
    document.addEventListener('mousedown', closeDropDown)
    return () => {
      document.removeEventListener('mousedown', closeDropDown)
    }
  })
  const toggleDropDown = () => {
    setDropDown(!isDropDownOpen)
  }
  const closeDropDown = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setDropDown(false)
    }
  }

  return(
    <>
    <div ref={divRef} className="relative inline-block text-left whitespace-nowrap">
      <button type="button" className='mr-2 btn-icon' onClick={toggleDropDown}>
        <FontAwesomeIcon icon={faIcons} />
      </button>
        {isDropDownOpen && 
          <div className="absolute bg-white border rounded-lg p-2 left-4 top-10 z-10 flex flex-col">
            <Picker data={data} onEmojiSelect={(emoji)=>emojiSelected(emoji.native)} theme="light" locale="fr" />
          </div>}
      </div>
    </>
  )
}
