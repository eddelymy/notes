import axios from '../axios'
import routes from './routes'
import validateData from '../../helpers/validateForm'
import {string,array,object} from 'yup'

let noteSchema = object({
  category: object({
    value: string().required('L\'ID de la catégorie est requis'), 
    label: string().required('Le label de la catégorie est requis')
  }).label('category').required('La catégorie est requise'),
  label: array().of(
    object()
  ).label('label').required('L\'étiquette doit contenir au moins un élément').min(1, 'L\'étiquette doit contenir au moins un élément'),
  title: string().label('title').required('Le titre est requis'),
  content: string().label('content').required('Le contenu est requis')
})
export default {
  async addNote(note){
    await validateData(noteSchema,note)
    return await axios().post(routes.note.create.url, note)
  },
  async deleteNote(noteId){
    return await axios().delete(`${routes.note.delete.url}${noteId}`)
  }
  ,
  async pagination(page, limit, search){
    return await axios().get(routes.note.pagination.url,{
      params: { page, limit, search }
  })
  }
}
