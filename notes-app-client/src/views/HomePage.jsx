import { UrlPage } from "../components/common/UrlPage"
import noteService from "../service/note/note.service"
import NoteComponent from "../components/pages/note/NoteComponent"
import { BarChart,Cell, Label, Tooltip, ResponsiveContainer, Bar, CartesianGrid, XAxis, YAxis } from 'recharts'
import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"

export default function HomePage(){

  const [recentNotes,setRecentNotes] = useState([]),
        [categoryOccurrences,setCategoryOccurrences] = useState([])

  async function getRecentNotes(){
    try{
      const response = await noteService.getRecentNotes()
      setRecentNotes(response.data)
    }catch(error){
      console.log(error)
    }
  }

  async function getCategoryOccurrences(){
    try{
      const response = await noteService.getCategoryOccurrences()
      setCategoryOccurrences(response.data)
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    getCategoryOccurrences()
    getRecentNotes()
  },[])

  return(
    <div className="flex flex-col">
      <UrlPage pages={['Home']}/>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={categoryOccurrences} margin={{top: 70, right: 20, bottom: 40, left: 40}}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id.label">
            <Label value="Categories" offset={8} position="bottom" />
          </XAxis>
          <YAxis>
            <Label value="Nombre d'occurence" offset={20} position="top"/>
          </YAxis>
          <Tooltip />
          <Bar dataKey="count" barSize={40}>
            {categoryOccurrences.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry._id.value || "#8884d8"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-10 flex flex-col max-w-full p-5 w-full">
        <span className="font-bold text-[14px]">Aperçu des Notes Récentes</span>
        {recentNotes.length === 0 && <div className=" w-full pt-8 flex justify-center">No data to show.</div>}
        <div className="scrollbar-custom w-full grid grid-cols-1 gap-4 2xl:grid  2xl:gap-5 mt-4 2xl:grid-cols-3  place-items-center">
          {
            recentNotes.map((note) =>(
              <NoteComponent key={note._id} {...note} statut={false}/>
            ))
          }
        </div>
        <div className='text-blue-600 w-full flex justify-end mt-3'>
          <NavLink to={'/notes'}  >
            Tous les notes
          </NavLink>
        </div>
      </div>
    </div>
  )
}