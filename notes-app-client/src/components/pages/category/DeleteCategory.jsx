import {  faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import categoryService from '../../../service/category/category.service'

export default function DeleteCategory({categoryId, category, categoryDeleted}){

  async function deleteCategory(){
    if(confirm(`Voulez-vous supprimer la categorie : ${category}?`)){
      try{
        const response = await categoryService.deleteCategory(categoryId)
        categoryDeleted()
      }catch(error){
        console.log(error)
      } 
    }
  }

  return(
    <>
      <button type="button" className="rounded-sm" onClick={deleteCategory}>
        <FontAwesomeIcon icon={faTrash} className=" w-6 mr-2 text-[#EF5944]" />
      </button>
    </>
  )
}