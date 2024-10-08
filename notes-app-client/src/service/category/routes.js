export default {
  category: {
    index: {
      name: 'category.index',
      method: 'GET',
      url: 'all/categories'
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
    },
    edit:{
      name:'category.edit',
      method:'PUT',
      url:'/category/'
    },
    pagination:{
      name:'category.paginatio',
      method:'GET',
      url:'categories'
    }
    
  }
}