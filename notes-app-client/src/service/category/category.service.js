import axios from '../axios'
import routes from './routes'

export default {
  async getCategories() {
    try{
      const { data } = await axios().get(routes.category.index.url)

      return data

    }catch(error){
      console.log(error) 
    }
  },
}
