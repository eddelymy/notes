import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ModalComponent from '../../common/ModalComponent'
import categoryService from '../../../service/category/category.service'
import { setErrors } from '../../../helpers/error'
import { useState } from 'react'

export default function EditCategory({item}){

  const [show,setShow] = useState(false)
  const [category,setCategory] = useState(''),
        [labels,setLabels] = useState(new Set([])),
        [label,setLabel] = useState(''),
        [errors,setErr] = useState({})

  function showModal(){
    setShow(true)
    setCategory(item.category)
    setLabels(new Set([...item.label]))
  }
  function closeModal(){
    setShow(false)
    cancel()
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
  async function submit(){
    console.log({category:category,label:[...labels]})
    setErr({})
    try{
      const response = await categoryService.editCategory(item.categoryId,{category:category,label:[...labels]})
      console.log(response)
      closeModal()
    }catch(error){
      setErr(setErrors(error))
    }
    
  }
  function cancel(){
    setCategory(item.category)
    setLabels(item.label)
    setErr({})
  }
  return(
    <>
    <button type="button" className="mr-2 rounded-sm" onClick={showModal}>   
      <FontAwesomeIcon icon={faPenToSquare} className="w-6 mr-2 text-[#4B5563]" />
    </button>
    {show && <ModalComponent close={closeModal} title="Modifier une categorie">
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
    </>
  )
}