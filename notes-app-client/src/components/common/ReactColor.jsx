import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPalette } from '@fortawesome/free-solid-svg-icons'
import { HexColorPicker } from "react-colorful"
import { useState, useRef, useEffect } from 'react'

export default function ReactColor({colorSelected}){

  const [color, setColor] = useState('#000000')
  const [isDropDownOpen, setDropDown] = useState(false)
  const divRef = useRef(null)
  useEffect(() => {
    document.addEventListener('mousedown', closeDropDown)
    return () => {
      document.removeEventListener('mousedown', closeDropDown)
    }
  },[])
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
        <FontAwesomeIcon icon={faPalette} />
      </button>
        {isDropDownOpen && 
          <div className="absolute bg-white border rounded-lg p-2 left-4 top-10 z-10 flex flex-col">
            <HexColorPicker color={color} onChange={(newColor) => {
              colorSelected(newColor)
              setColor(newColor)
            }} />
          </div>}
      </div>
    </>
  )
}