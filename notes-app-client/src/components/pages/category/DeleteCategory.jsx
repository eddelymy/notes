import {  faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import categoryService from '../../../service/category/category.service'
import {flash} from '../../../plugins/flash'

export default function DeleteCategory({categoryId, category, categoryDeleted}){

  async function deleteCategory(){
    if(confirm(`Voulez-vous supprimer la categorie : ${category}?`)){
      try{
        const response = await categoryService.deleteCategory(categoryId)
        flash(response.data.message, 'success')
        categoryDeleted()
      }catch(error){
        if(error?.response?.data?.message){
          flash(error.response.data.message, 'error')
        }        
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