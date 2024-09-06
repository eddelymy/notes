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
    edit:{
      name:'note.edit',
      method:'PUT',
      url:'/note/'
    },
    delete:{
      name:'note.delete',
      method:'DELETE',
      url:'/note/'
    },
    find:{
      name:'note.find',
      method:'GET',
      url:'/id/'
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