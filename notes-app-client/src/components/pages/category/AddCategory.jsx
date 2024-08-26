import {faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark } from '@fortawesome/free-solid-svg-icons'
import ModalComponent from '../../common/ModalComponent'
import categoryService from '../../../service/category/category.service'
import { useState } from 'react'

export default function AddCategory(){

  const [show,setShow] = useState(false)
  const [category,setCategory] = useState('')
  const [label,setLabel] = useState('')
  const [labels,setLabels] = useState([])

  function close(){
    setShow(false)
  }
  async function submit(){
    const response = await categoryService.addCategory({category:category,label:labels})
    console.log(response)
    cancel()
    close()
  }
  function handleKeyDown(e){
    if (e.key === "Enter") {
      e.preventDefault()
      setLabels(prev=>[...prev,label])
      setLabel('')
    }
  }
  function deleteLabel(item){
    const result = labels.filter((elmt) => elmt != item)
    setLabels([...result])
  }
  function cancel(){
    setCategory('')
    setLabels([])
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
            {labels.length !== 0 && (
                <div className="mt-2 w-full flex flex-wrap">
                  {labels.map((item, index) => (
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
            <button className="submit-btn" type='button' onClick={submit}>Ajouter</button>
          </div>
        </form>
      </ModalComponent>}
    </div>
  )
}