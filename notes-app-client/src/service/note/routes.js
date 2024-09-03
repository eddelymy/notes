export default {
  note: {
    index: {
      name: 'note.index',
      method: 'GET',
      url: 'all/notes'
    },
    create:{
      name:'note.create',
      method:'POST',
      url:'/note/new'
    },
    delete:{
      name:'note.delete',
      method:'DELETE',
      url:'/note/'
    },
    edit:{
      name:'note.edit',
      method:'PUT',
      url:'/note/'
    },
    pagination:{
      name:'note.pagination',
      method:'GET',
      url:'notes'
    }
    
  }
}