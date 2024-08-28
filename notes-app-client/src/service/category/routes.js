export default {
  category: {
    index: {
      name: 'category.index',
      method: 'GET',
      url: 'categories'
    },
    create:{
      name:'category.create',
      method:'POST',
      url:'/category/new'
    },
    delete:{
      name:'category.delete',
      method:'DELETE',
      url:'/category/'
    }
    
  }
}