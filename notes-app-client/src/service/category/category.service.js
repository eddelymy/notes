import axios from '../axios'
import routes from './routes'
import validateData from '../../helpers/validateForm'
import {string,array,object} from 'yup'

let categorySchema = object({
  category: string().label('category').required('La categorie est requise'),
  color: string()
    .label('color')
    .matches(/^#([0-9A-F]{3}){1,2}$/i, 'La couleur doit être un code hexadécimal valide commençant par #')
    .required('La couleur est obligatoire'),
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
  },
  async pagination(page, limit, sortBy, order, search){
    return await axios().get(routes.category.pagination.url,{
      params: { page, limit, sortBy, order, search }
  })
  }
}
