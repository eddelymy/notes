import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser, faEnvelope, faLock, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import EditEmail from '../components/pages/parametrage/EditEmail'
import EditPassword from '../components/pages/parametrage/EditPassword'
import EditUsername from '../components/pages/parametrage/EditUsername'
import { useState } from 'react'

export default function ParametragePage(){

  const data = [
    {id:1,icon:faUser,label:'Utilisateur',data:JSON.parse(localStorage.getItem('user_notes')).username},
    {id:2,icon:faEnvelope,label:'E-mail',data:JSON.parse(localStorage.getItem('user_notes')).email},
    {id:3,icon:faLock,label:'Mot de passe',data:'123456'}]
  const [editItem, setEditItem] = useState(null)

  return(
    <div className='w-full h-full flex items-center'>
      <div className='rounded-md shadow-md bg-white w-[900px] mx-auto'>
        <div className="h-44 rounded-t-md bg-gradient-to-r from-fuchsia-200 to-rose-400 hover:from-blue-100 hover:to-purple-400 transition duration-500">
        </div>
        <div className="grid grid-rows-3 gap-5 px-6 py-8 min-[1134px]:grid-cols-3 min-[1134px]:grid-rows-1">
          {
            data.map(item => (
              <div key={item.id} className="flex border-gray-200 border p-2 rounded-md relative">
                <div className="mr-5">
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <div className="flex flex-col">
                  <span>{item.label}</span>
                  {item.id !== 3 &&<span className='text-pink-500'>{item.data}</span>}
                  {item.id === 3 && <input type='password' value={item.data} disabled/>}
                </div>
                <button className='absolute right-2 top-1' type='button' onClick={()=>setEditItem(item.id)}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
              </div>
            ))
          }
        </div>
      </div>
      {editItem === 2 && <EditEmail closeIt={()=>setEditItem(null)}/>}
      {editItem === 1 && <EditUsername closeIt={()=>setEditItem(null)}/>}
      {editItem === 3 && <EditPassword closeIt={()=>setEditItem(null)}/>}
    </div>
  )
}