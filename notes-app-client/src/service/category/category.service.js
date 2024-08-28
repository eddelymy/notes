import axios from '../axios'
import routes from './routes'
import validateData from '../../helpers/validateForm'
import {string,array,object} from 'yup'

let categorySchema = object({
  category: string().label('category').required('La categorie est requise'),
  label: array().label('label').of(string()).min(1, 'L\'étiquette doit contenir au moins un élément')
})
export default {
  async getCategories() {
    try{
      const { data } = await axios().get(routes.category.index.url)

      return data

    }catch(error){
      return []
    }
  },
  async addCategory(category){
    await validateData(categorySchema,category)
    return await axios().post(routes.category.create.url, category)
  },
  async deleteCategory(categoryId){
    return await axios().delete(`${routes.category.delete.url}${categoryId}`)
  },
  async editCategory(categoryId,newCategory){
    return await axios().put(`${routes.category.edit.url}${categoryId}`,newCategory)
  }
}
