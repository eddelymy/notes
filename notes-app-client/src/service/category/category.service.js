import axios from '../axios'
import routes from './routes'
import validateData from '../../helpers/validateForm'
import {string,array,object} from 'yup'

let categorySchema = object({
  category: string().label('category').required(),
  label: array().label('label').of(string()).min(1).required('Ce champ est obligatoire')
})
export default {
  async getCategories() {
    try{
      const { data } = await axios().get(routes.category.index.url)

      return data

    }catch(error){
      console.log(error) 
      return []
    }
  },
  async addCategory(category){
    await validateData(categorySchema,category)
    return await axios().post(routes.category.create.url, category)
  }
}
