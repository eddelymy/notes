import {  faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import noteService from '../../../service/note/note.service'
import {flash} from '../../../plugins/flash'

export default function DeleteNote({noteId,noteDeleted}){

  async function deleteNote(){
    if(confirm(`Voulez-vous supprimer la note : ${noteId}?`)){
      try{
        const response = await noteService.deleteNote(noteId)
        flash(response.data.message, 'success')
        noteDeleted()
      }catch(error){
        if(error?.response?.data?.message){
          flash(error.response.data.message, 'error')
        }      } 
    }
  }

  return(
    <button type="button" onClick={deleteNote} className="rounded-full text-white text-[12px] bg-[#020617] px-2 py-1">
      <FontAwesomeIcon icon={faTrash} />
    </button>
  )
}