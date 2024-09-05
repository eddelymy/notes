import {faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark } from '@fortawesome/free-solid-svg-icons'
import ModalComponent from '../../common/ModalComponent'
import categoryService from '../../../service/category/category.service'
import { setErrors } from '../../../helpers/error'
import { useState } from 'react'

export default function AddCategory({catgoryAdded}){

  const [show,setShow] = useState(false)
  const [category,setCategory] = useState('')
  const [color,setColor] = useState('')
  const [label,setLabel] = useState('')
  const [labels,setLabels] = useState(new Set([]))
  const [errors,setErr] = useState({})

  function close(){
    setShow(false)
    cancel()
  }
  async function submit(){
    setErr({})
    try{
      const response = await categoryService.addCategory({category:category,color:color,label:[...labels]})
      catgoryAdded()
      cancel()
      close()
    }catch(error){
      setErr(setErrors(error))
    }
    
  }
  function handleKeyDown(e){
    if (e.key === "Enter" && label ) {
      e.preventDefault()
      setLabels(prev=>{
        const newSet = new Set([...prev])
        newSet.add(label)

        return newSet
      })
      setLabel('')
    }
  }
  function deleteLabel(item){

    setLabels(prev=>{
      const newSet = new Set([...prev])
      newSet.delete(item)
      return newSet
    })
  }
  function cancel(){
    setCategory('')
    setColor('')
    setErr({})
    setLabels(new Set([]))
  }
  return(
    <div className="mt-10 w-full">
      <button type="button" className="cancel-btn float-end" onClick={()=>setShow(true)}>
        <FontAwesomeIcon icon={faPlus} className='mr-2' />
        Nouveau
      </button>
    {show && <ModalComponent close={close} title="Ajouter une categorie">
        <form className="mt-10">
          <div className="flex flex-col">
            <label>
              Categorie
            </label>
            <input 
              name="category"
              className="input_text"
              value={category}
              onChange={(e)=>{setCategory(e.target.value)}}
              />
            {errors.category && <div id="farmError" className="text-red-700">
              { errors.category }
            </div>}
          </div>
          <div className="flex flex-col mt-4">
            <label>
              Couleur
            </label>
            <input 
              name="color"
              className="input_text"
              value={color}
              onChange={(e)=>{setColor(e.target.value)}}
              />
            {errors.color && <div id="colorError" className="text-red-700">
              { errors.color }
            </div>}
          </div>
          <div className="flex flex-col mt-4">
            <label>
              Etiquette(s)
            </label>
            <input 
              name="label"
              className="input_text"
              value={label}
              onChange={(e)=>{setLabel(e.target.value)}}
              onKeyDown={(e)=>handleKeyDown(e)}/>
            {errors.label && <div id="labelError" className="text-red-700">
              { errors.label }
            </div>}
            {labels.size !== 0 && (
                <div className="mt-2 w-full flex flex-wrap">
                  {[...labels].map((item, index) => (
                    <div key={index} className='ml-2 my-1 p-2 rounded-md border border-1 flex justify-items-center'>
                      <span className='mr-2'>{item}</span>
                      <button type='button' onClick={(e)=>deleteLabel(item)}>
                        <FontAwesomeIcon icon={faXmark} className='text-[#9ca3af]' />
                      </button>
                    </div>
                  ))}
                </div>
              )}
          </div>
          <div className='flex mt-6 float-end'>
            <button className="cancel-btn mr-3" type='button' onClick={cancel}>Annuler</button>
            <button className="submit-btn" type='button' onClick={submit}>Enregistrer</button>
          </div>
        </form>
      </ModalComponent>}
    </div>
  )
}