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
    findRecentNotes:{
      name:'note.findRecentNotes',
      method:'GET',
      url:'/recentNotes'
    },
    findToDoTasks:{
      name:'note.findToDoTasks',
      method:'GET',
      url:'/toDoTasks'
    },
    categoryOccurrences:{
      name:'note.categoryOccurrences',
      method:'GET',
      url:'/category/occurrence'
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